import axios from 'axios';
import { load } from 'cheerio';

export const fetchUrl = async (url: string): Promise<string> => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const getFileName = (category: string, ext: string): string =>
    `${category}-${Date.now().toFixed()}${ext}`;

export const getMaxPage = (content: string): number => {
    const selector = load(content);

    return Math.max(
        ...selector('ul[class="ak-pagination pagination ak-ajaxloader"]')
            .find('li > a[href]')
            .text()
            .replace(/‹|›|»|«|/g, '')
            .split('\n')
            .filter((element) => element != '...' && element != '')
            .map((pagination) => {
                const page = pagination.replace('... ', '');
                return Number(page);
            })
    );
};
