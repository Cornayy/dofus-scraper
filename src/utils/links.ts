import { ItemType } from './../types/index';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { paths, requestOptions } from '../config/options';
import { storeLinks } from '../logger';
import { fetchUrl } from '.';
import { load } from 'cheerio';

export const getLinkPath = (category: ItemType): string => {
    return join(paths.links, `${category.toString()}.txt`);
};

export const linksExist = (category: ItemType): boolean => {
    const path = getLinkPath(category);
    return existsSync(path);
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
    const fileExists = linksExist(category);

    if (fileExists) {
        const existingLinks = readLinks(category);
        links.push(...existingLinks);
    } else {
        for (let i = 1; i <= maxPage; i++) {
            const item = await fetchUrl(`${url}${requestOptions.pageParam}${i}`);
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
