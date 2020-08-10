/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { existsSync, readFileSync, mkdirSync, createWriteStream } from 'fs';
import { join } from 'path';
import { load } from 'cheerio';
import { getRepository, BaseEntity, DeepPartial } from 'typeorm';
import { ItemType } from './../types';
import { paths, requestOptions } from '../modules/scraping/config/options';
import { fetchUrl, getFileName } from '.';

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

        let counter = 1;

        do {
            const item = await fetchUrl(`${url}${requestOptions.pageParam}${counter}`);

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

            counter++;
        } while (counter <= maxPage);

        storeLinks(category, links);
    }

    return links;
};

export const storeLinks = (category: ItemType, items: string[]): void => {
    for (const path of Object.values(paths)) {
        if (!existsSync(path)) {
            mkdirSync(path);
        }
    }

    const fileName = getFileName(category, '.txt');
    const stream = createWriteStream(`${paths.links}/${fileName}`);

    stream.once('open', () => {
        for (const item of items) {
            stream.write(`${item}\n`);
        }

        stream.end();
    });
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
