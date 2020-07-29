import { ItemCategory } from './../types/index';
import { writeToLog } from '../logger';
import { options } from './../config/options';
import { fetchUrl, getMaxPage } from './../utils';
import { load } from 'cheerio';

export const scrapeEquipment = async (): Promise<void> => {
    const baseUrl = `${options.baseUrl}/equipment${options.sizeParam}`;
    const content = await fetchUrl(baseUrl);
    const maxPage = getMaxPage(content);
    const links = await retrieveLinks(maxPage, baseUrl);

    writeToLog(ItemCategory.Equipment, links);
};

export const retrieveLinks = async (maxPage: number, url: string): Promise<string[]> => {
    const links = [];

    for (let i = 1; i <= maxPage; i++) {
        const item = await fetchUrl(`${url}${options.pageParam}${i}`);
        const selector = load(item);

        selector('table[class="ak-table ak-responsivetable"] > tbody')
            .find('tr')
            .each((_index, element) => {
                links.push(load(element).root().find('a').attr('href'));
            });
    }

    return links;
};
