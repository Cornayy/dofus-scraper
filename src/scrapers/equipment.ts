import { options } from './../config/options';
import { fetchUrl, getMaxPage } from './../utils';

export const scrapeEquipment = async (): Promise<void> => {
    const content = await fetchUrl(
        `${options.baseUrl}/monsters${options.sizeParam}${options.pageParam}1`
    );

    const maxPage = getMaxPage(content);
    console.log(maxPage);
};
