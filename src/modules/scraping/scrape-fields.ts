/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { load } from 'cheerio';

const getStatSelector = (selector: CheerioStatic) =>
    selector(
        'div[class="ak-container ak-content-list ak-displaymode-col"] > div[class="ak-title"]'
    );

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
            .text()
            .trim(),
    };
};

export const getImageUrl = (selector: CheerioStatic) => {
    return { imageUrl: selector('div[class="ak-encyclo-detail-illu"] > img').attr('src') };
};

export const getLevel = (selector: CheerioStatic) => {
    const level = parseInt(
        selector('div[class="ak-encyclo-detail-level col-xs-6 text-right"]')
            .text()
            .replace('Level: ', ''),
        10
    );

    return {
        level: isNaN(level) ? 1 : level,
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

export const getSet = (selector: CheerioStatic) => {
    return {
        set: selector('div[class="ak-panel-title"]')
            .filter((_index, element) => {
                const ele = load(element).root();
                return ele.text().trim().includes('is part of the');
            })
            .first()
            .find('a[href]')
            .attr('href'),
    };
};

export const getSetBonus = (selector: CheerioStatic) => {
    return {
        bonus: selector('div[class="ak-container ak-content-list ak-displaymode-col"]')
            .last()
            .find('div[class="ak-title"]')
            .text()
            .trim()
            .split('\n')
            .map((stat) => stat.trim())
            .filter((stat) => stat),
    };
};

export const getCharacteristics = (selector: CheerioStatic) => {
    return {
        characteristics: getStatSelector(selector)
            .last()
            .text()
            .trim()
            .replace(/Characteristics/g, '')
            .split('\n')
            .map((char) => char.trim())
            .filter((char) => char),
    };
};

// Named function used to compare callbacks.
export function getStats(selector: CheerioStatic) {
    return {
        stats: getStatSelector(selector)
            .first()
            .text()
            .trim()
            .replace(/Effects|Subscribers only/g, '')
            .split('\n')
            .map((stat) => stat.trim())
            .filter((stat) => stat),
    };
}
