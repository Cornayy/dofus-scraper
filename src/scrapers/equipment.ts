import { retrieveLinks } from './../utils/index';
import { ItemType } from './../types/index';
import { requestOptions } from './../config/options';
import { getMaxPage } from './';
import { fetchUrl } from '../utils';

export const scrapeEquipment = async (): Promise<void> => {
    const baseUrl = `${requestOptions.baseUrl}/equipment${requestOptions.sizeParam}`;
    const content = await fetchUrl(baseUrl);
    const maxPage = getMaxPage(content);
    await retrieveLinks(maxPage, baseUrl, ItemType.Equipment);

    // TODO: create objects based on the scraped information and save to db.

    // for (const link of links) {
    //     const equipmentContent = await fetchUrl(`${requestOptions.dofusUrl}${link}`);
    //     console.log(getContent(equipmentContent, getConditions));
    // }
};
