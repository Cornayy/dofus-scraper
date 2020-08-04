/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { DeepPartial } from 'typeorm';
import { BaseEntity, getRepository } from 'typeorm';
import { ItemType } from './../types/index';
import { ScrapeCallback } from '../types/index';
import { load } from 'cheerio';
import { requestOptions } from '../config/options';
import { fetchUrl, retrieveLinks } from '../utils';

export const scrape = async <T extends BaseEntity>(
    entity: Function,
    category: ItemType,
    required: ScrapeCallback<T>[]
): Promise<void> => {
    const baseUrl = `${requestOptions.baseUrl}/${category.toString()}${requestOptions.sizeParam}`;
    const content = await fetchUrl(baseUrl);

    if (!content) return;

    const maxPage = getMaxPage(content);
    const links = await retrieveLinks(maxPage, baseUrl, category);
    const repository = getRepository<T>(entity);

    for (const link of links) {
        const item = await fetchUrl(`${requestOptions.dofusUrl}${link}`);

        if (!item) continue;

        const object = required
            .map((callback) => {
                return getContent<T>(item, callback);
            })
            .reduce((a, b) => ({ ...a, ...b }));

        await repository.create({ ...object, encyclopediaUrl: link }).save();
    }

    console.log(`Done scraping ${links.length} item(s) of category (${category.toString()})`);
};

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

export const getContent = <T>(content: string, callback: ScrapeCallback<T>): DeepPartial<T> => {
    const selector = load(content);
    return callback(selector);
};

export const getName = (selector: CheerioStatic) => {
    return { name: selector('h1[class="ak-return-link"]').text().trim() };
};

export const getType = (selector: CheerioStatic) => {
    return { type: selector('div[class="ak-encyclo-detail-type col-xs-6"] > span').text() };
};

export const getDescription = (selector: CheerioStatic) => {
    return {
        description: selector(
            'div[class="ak-encyclo-detail-right ak-nocontentpadding"] > div[class="ak-container ak-panel"]'
        )
            .first()
            .find('div[class="ak-panel-content"]')
            .text(),
    };
};

export const getImageUrl = (selector: CheerioStatic) => {
    return { imageUrl: selector('div[class="ak-encyclo-detail-illu"] > img').attr('src') };
};

export const getStats = (selector: CheerioStatic) => {
    return {
        stats: selector(
            'div[class="ak-encyclo-detail-right ak-nocontentpadding"] > div[class="ak-container ak-panel"] > div[class="ak-panel-content"]'
        )
            .last()
            .text()
            .trim()
            .replace(/Effects/g, '')
            .split('\n')
            .filter((stat) => stat),
    };
};

export const getLevel = (selector: CheerioStatic) => {
    return {
        level: parseInt(
            selector('div[class="ak-encyclo-detail-level col-xs-6 text-right"]')
                .text()
                .replace('Level: ', ''),
            10
        ),
    };
};

export const getConditions = (selector: CheerioStatic) => {
    return {
        conditions: selector('div[class="ak-container ak-panel no-padding"]')
            .find('div[class="ak-container ak-content-list ak-displaymode-col"]')
            .text()
            .trim()
            .split('\n')
            .filter((condition) => condition),
    };
};
