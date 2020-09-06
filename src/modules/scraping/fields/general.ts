/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { RecipeIngredient } from './../../../types/index';
import { load } from 'cheerio';

export const getStatSelector = (selector: CheerioStatic, first = true) => {
    const sel = selector('div[class="ak-container ak-content-list ak-displaymode-col"]');
    if (first) return sel.first();

    return sel.last();
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
            .text()
            .trim(),
    };
};

export const getImageUrl = (selector: CheerioStatic) => {
    return { imageUrl: selector('div[class="ak-encyclo-detail-illu"] > img').attr('src') };
};

export const getSetImageUrl = (selector: CheerioStatic) => {
    return { imageUrl: selector('div[class="ak-entitylook-container"] > img').attr('src') };
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
        characteristics: getStatSelector(selector, false)
            .find('div[class="ak-title"]')
            .text()
            .trim()
            .replace(/Characteristics/g, '')
            .split('\n')
            .filter((char) => char),
    };
};

export const getRecipeSelector = (selector: CheerioStatic, base: string, divSize: string) => {
    const recipe: RecipeIngredient[] = [];

    selector(base)
        .find(`div[class="ak-column ak-container col-xs-12 ${divSize}"]`)
        .each((_index, ele) => {
            const element = load(ele).root();
            const amount = parseInt(
                element.find('div[class="ak-front"]').text().replace(' x', ''),
                10
            );

            recipe.push({
                name: element.find('div[class="ak-title"]').text().trim(),
                imageUrl:
                    element.find('div[class="ak-image"] > img').attr('src') ||
                    element.find('div[class="ak-image"] > a > span > img').attr('src'),
                amount: isNaN(amount) ? 1 : amount,
            });
        });

    return { recipe };
};

export const getRecipe = (selector: CheerioStatic) => {
    return getRecipeSelector(selector, 'div[class="ak-container ak-panel ak-crafts"]', 'col-sm-6');
};

export const getSetRecipe = (selector: CheerioStatic) => {
    return getRecipeSelector(
        selector,
        'div[class="ak-container ak-content-list ak-encyclo-item-crafts clearfix ak-displaymode-image-col"]',
        'col-md-6'
    );
};

// Named function used to compare callbacks.
export function getStats(selector: CheerioStatic) {
    return {
        stats: getStatSelector(selector)
            .first()
            .find('div[class="ak-title"]')
            .text()
            .trim()
            .replace(/Effects|Subscribers only/g, '')
            .split('\n')
            .map((stat) => stat.trim())
            .filter((stat) => stat),
    };
}
