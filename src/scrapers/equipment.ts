import { ItemType } from './../types/index';
import { writeToLog } from '../logger';
import { requestOptions } from './../config/options';
import { getMaxPage } from './';
import { load } from 'cheerio';
import { fetchUrl } from '../utils';

export const scrapeEquipment = async (): Promise<void> => {
    const baseUrl = `${requestOptions.baseUrl}/equipment${requestOptions.sizeParam}`;
    const content = await fetchUrl(baseUrl);
    const maxPage = getMaxPage(content);
    const links = await retrieveLinks(maxPage, baseUrl);

    // TODO: create objects based on the scraped information and save to db. 

    // for (const link of links) {
    //     const equipmentContent = await fetchUrl(`${requestOptions.dofusUrl}${link}`);
    //     console.log(getContent(equipmentContent, getConditions));
    // }

    writeToLog(ItemType.Equipment, links);
};

export const retrieveLinks = async (maxPage: number, url: string): Promise<string[]> => {
    const links = [];

    for (let i = 1; i <= maxPage; i++) {
        const item = await fetchUrl(`${url}${requestOptions.pageParam}${i}`);
        const selector = load(item);

        selector('table[class="ak-table ak-responsivetable"] > tbody')
            .find('tr')
            .each((_index, element) => {
                links.push(load(element).root().find('a').attr('href'));
            });
    }

    return links;
};
