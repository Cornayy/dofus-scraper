import { ScrapeCallback } from '../types/index';
import { load } from 'cheerio';

export const getMaxPage = (content: string): number => {
    const selector = load(content);

    return Math.max(
        ...selector('ul[class="ak-pagination pagination ak-ajaxloader"]')
            .find('li > a[href]')
            .text()
            .replace(/‹|›|»|«|/g, '')
            .split('\n')
            .filter((element) => element !== '...' && element !== '')
            .map((pagination) => {
                const page = pagination.replace('... ', '');
                return Number(page);
            })
    );
};

export const getContent = (
    content: string,
    callback: ScrapeCallback
): string | string[] | number => {
    const selector = load(content);
    return callback(selector);
};

export const getType = (selector: CheerioStatic): string => {
    return selector('div[class="ak-encyclo-detail-type col-xs-6"] > span').text();
};

export const getDescription = (selector: CheerioStatic): string => {
    return selector(
        'div[class="ak-encyclo-detail-right ak-nocontentpadding"] > div[class="ak-container ak-panel"]'
    )
        .first()
        .find('div[class="ak-panel-content"]')
        .text();
};

export const getImageUrl = (selector: CheerioStatic): string => {
    return selector('div[class="ak-encyclo-detail-illu"] > img').attr('src');
};

export const getStats = (selector: CheerioStatic): string[] => {
    return selector(
        'div[class="ak-encyclo-detail-right ak-nocontentpadding"] > div[class="ak-container ak-panel"] > div[class="ak-panel-content"]'
    )
        .last()
        .text()
        .trim()
        .replace(/Effects/g, '')
        .split('\n')
        .filter((stat) => stat);
};

export const getLevel = (selector: CheerioStatic): number => {
    return parseInt(
        selector('div[class="ak-encyclo-detail-level col-xs-6 text-right"]')
            .text()
            .replace('Level: ', ''),
        10
    );
};

export const getConditions = (selector: CheerioStatic): string[] => {
    return selector('div[class="ak-container ak-panel no-padding"]')
        .find('div[class="ak-container ak-content-list ak-displaymode-col"]')
        .text()
        .trim()
        .split('\n')
        .filter((condition) => condition);
};
