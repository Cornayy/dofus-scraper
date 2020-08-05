import { ItemType } from './../types/index';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { paths, requestOptions } from '../config/options';
import { storeLinks } from '../logger';
import { fetchUrl } from '.';
import { load } from 'cheerio';

export const fileExists = (path: string, category: ItemType, ext: string): boolean => {
    return existsSync(join(path, `${category.toString()}${ext}`));
};

export const readLinks = (category: ItemType): string[] => {
    return readFileSync(join(paths.links, `${category.toString()}.txt`))
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
        console.log(`Links for category (${category.toString()}) not found, creating link file.`);

        for (let i = 1; i <= maxPage; i++) {
            const item = await fetchUrl(`${url}${requestOptions.pageParam}${i}`);

            if (!item) continue;

            const selector = load(item);

            selector('table[class="ak-table ak-responsivetable"] > tbody')
                .find('tr')
                .each((_index, element) => {
                    links.push(load(element).root().find('a').attr('href'));
                });
        }

        storeLinks(ItemType.Equipment, links);
    }

    return links;
};
