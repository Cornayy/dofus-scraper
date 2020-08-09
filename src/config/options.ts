/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
    scrape,
    getName,
    getType,
    getStats,
    getConditions,
    getDescription,
    getLevel,
    getImageUrl,
    getSet,
    getSetBonus,
    getCharacteristics,
} from '../modules/scraping/index';
import { Equipment } from '../modules/scraping/models/Equipment';
import { ItemType, PromptOption } from '../types';
import { Mount } from './../modules/scraping/models/Mount';
import { Consumable } from './../modules/scraping/models/Consumable';
import { Ceremonial } from './../modules/scraping/models/Ceremonial';
import { Weapon } from '../modules/scraping/models/Weapon';
import { Pet } from '../modules/scraping/models/Pet';
import { Set } from '../modules/scraping/models/Set';
import { Resource } from '../modules/scraping/models/Resource';

export const requestOptions = {
    dofusUrl: 'https://www.dofus.com',
    baseUrl: 'https://www.dofus.com/en/mmorpg/encyclopedia',
    sizeParam: '?size=96',
    pageParam: '&page=',
    petBody: 'level=100&_pjax=.ak-item-details-container',
};

export const paths = {
    data: 'src/data',
    links: 'src/data/links',
    json: 'src/data/json',
};

const defaultProps = [
    getName,
    getType,
    getStats,
    getConditions,
    getDescription,
    getLevel,
    getImageUrl,
];

export const scrapeOptions: PromptOption[] = [
    {
        scrapeOption: ItemType.Equipment,
        callback: () => scrape<Equipment>(Equipment, ItemType.Equipment, [...defaultProps, getSet]),
    },
    {
        scrapeOption: ItemType.Set,
        callback: () =>
            scrape<Set>(Set, ItemType.Set, [getName, getSetBonus, getLevel, getImageUrl]),
    },
    {
        scrapeOption: ItemType.Weapon,
        callback: () => scrape<Weapon>(Weapon, ItemType.Weapon, defaultProps),
    },
    {
        scrapeOption: ItemType.Resource,
        callback: () =>
            scrape<Resource>(Resource, ItemType.Resource, [
                getName,
                getType,
                getLevel,
                getDescription,
                getImageUrl,
            ]),
    },
    {
        scrapeOption: ItemType.Pet,
        callback: () => scrape<Pet>(Pet, ItemType.Pet, defaultProps),
    },
    {
        scrapeOption: ItemType.Ceremonial,
        callback: () =>
            scrape<Ceremonial>(Ceremonial, ItemType.Ceremonial, [
                getName,
                getImageUrl,
                getType,
                getSet,
                getStats,
                getLevel,
                getDescription,
            ]),
    },
    {
        scrapeOption: ItemType.Mount,
        callback: () =>
            scrape<Mount>(Mount, ItemType.Mount, [
                getName,
                getImageUrl,
                getType,
                getStats,
                getCharacteristics,
            ]),
    },
    {
        scrapeOption: ItemType.Consumable,
        callback: () =>
            scrape<Consumable>(Consumable, ItemType.Consumable, [
                getName,
                getImageUrl,
                getType,
                getStats,
                getDescription,
                getConditions,
            ]),
    },
];
