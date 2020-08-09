/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { load } from 'cheerio';

const getStatSelector = (selector: CheerioStatic, first = true) => {
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

export const getMonsterCharacteristics = (selector: CheerioStatic) => {
    return {
        characteristics: getStatSelector(selector)
            .find('div[class="ak-title"]')
            .toArray()
            .map((element) => load(element).root().text().trim().replace('\n', '')),
    };
};

export const getMonsterResistances = (selector: CheerioStatic) => {
    return {
        resistances: getStatSelector(selector, false)
            .find('div[class="ak-title"]')
            .toArray()
            .map((element) => load(element).root().text().trim().replace('\n', '')),
    };
};

export const getMonsterFamily = (selector: CheerioStatic) => {
    return { family: selector('div[class="col-xs-8 ak-encyclo-detail-type"] > span').text() };
};

export const getMonsterLevel = (selector: CheerioStatic) => {
    return {
        level: selector('div[class="col-xs-4 text-right ak-encyclo-detail-level "]')
            .text()
            .trim()
            .replace('Level: ', '')
            .trimStart()
            .trimEnd(),
    };
};

export const getMonsterImageUrl = (selector: CheerioStatic) => {
    return { imageUrl: selector('div[class="ak-encyclo-detail-illu"] > img').attr('data-src') };
};

export const getMonsterAreas = (selector: CheerioStatic) => {
    return {
        areas: selector('div[class="ak-container ak-panel"]')
            .filter((_index, element) => {
                const ele = load(element).root();
                return ele.text().includes('Areas');
            })
            .first()
            .find('div[class="ak-panel-content"]')
            .text()
            .trim()
            .split(',')
            .map((area) => area.trim())
            .filter((area) => area),
    };
};

export const getIdolDifficulty = (selector: CheerioStatic) => {
    const difficulty = parseInt(
        selector('div[class="ak-nocontentpadding"]')
            .filter((_index, element) => {
                const ele = load(element).root();
                return ele.text().includes('Combat difficulty score');
            })
            .first()
            .text()
            .replace('Combat difficulty score: ', ''),
        10
    );

    return {
        difficultyScore: isNaN(difficulty) ? 1 : difficulty,
    };
};

export const getIdolSpells = (selector: CheerioStatic) => {
    return {
        spells: selector('div[class="ak-container ak-panel"]')
            .filter((_index, element) => {
                const ele = load(element).root();
                return ele.text().includes('Spells');
            })
            .last()
            .find('div[class="ak-panel-content"]')
            .text()
            .trim(),
    };
};

export const getIdolLevel = (selector: CheerioStatic) => {
    const value = parseInt(
        selector('div[class="ak-encyclo-detail-level col-xs-6 text-right"]')
            .text()
            .trim()
            .replace(' ', '')
            .replace('Level: ', ''),
        10
    );

    return {
        level: isNaN(value) ? 1 : value,
    };
};

export const getIdolDescription = (selector: CheerioStatic) => {
    return {
        description: selector(
            'div[class="ak-nocontentpadding"] > div[class="ak-container ak-panel"]'
        )
            .first()
            .find('div[class="ak-panel-content"]')
            .text()
            .trim(),
    };
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
