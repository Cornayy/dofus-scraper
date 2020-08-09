/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { load } from 'cheerio';
import { getStatSelector } from './general';

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
