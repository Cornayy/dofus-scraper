/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { load } from 'cheerio';
import { getRepository, BaseEntity, DeepPartial } from 'typeorm';
import { ItemType } from './../types';
import { paths, requestOptions } from '../config/options';
import { storeLinks } from '../logger';
import { fetchUrl } from '.';

export const fileExists = (path: string, category: ItemType, ext: string): boolean => {
    return existsSync(join(path, `${category}${ext}`));
};

export const readLinks = (category: ItemType): string[] => {
    return readFileSync(join(paths.links, `${category}.txt`))
        .toString()
        .split('\n');
};

export const retrieveLinks = async (
    maxPage: number,
    url: string,
    category: ItemType
): Promise<string[]> => {
    const links = [];
    const exists = fileExists(paths.links, category, '.txt');

    if (exists) {
        const existingLinks = readLinks(category);
        links.push(...existingLinks);
    } else {
        console.log(`Links for category (${category}) not found, creating link file.`);

        for (let i = 1; i <= maxPage; i++) {
            const item = await fetchUrl(`${url}${requestOptions.pageParam}${i}`);

            if (!item) continue;

            const selector = load(item);

            selector('table[class="ak-table ak-responsivetable"] > tbody')
                .find('tr')
                .each((_index, element) => {
                    const link = load(element).root().find('a').attr('href');

                    if (link) {
                        links.push(link);
                    }
                });
        }

        storeLinks(category, links);
    }

    return links;
};

export const writeToDatabase = async <T extends BaseEntity>(
    entity: Function,
    path: string
): Promise<void> => {
    try {
        const items: DeepPartial<T>[] = JSON.parse(readFileSync(path, 'utf-8'));
        const repository = getRepository<T>(entity);

        for (const item of items) {
            await repository.create(item).save();
        }
    } catch (err) {
        console.error(`Failed to write JSON file of path ${path} to database: ${err}`);
    }
};
