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
} from '../modules/scraping/index';
import { Equipment } from './../modules/equipment/models/Equipment';
import { ItemType, PromptOption } from '../types';
import { Weapon } from '../modules/weapon/models/Weapon';
import { Set } from './../modules/set/models/Set';
import { Resource } from './../modules/resource//models/Resource';

export const requestOptions = {
    dofusUrl: 'https://www.dofus.com',
    baseUrl: 'https://www.dofus.com/en/mmorpg/encyclopedia',
    sizeParam: '?size=96',
    pageParam: '&page=',
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
];
