/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { load } from "cheerio";

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
