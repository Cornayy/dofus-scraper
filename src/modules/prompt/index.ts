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
} from './../scraping/index';
import { PromptOption } from './types/index';
import { Equipment } from './../equipment/models/Equipment';
import { Set } from './../set/models/Set';
import { prompt } from 'inquirer';
import { ItemType } from '../../types';

const defaultProps = [
    getName,
    getType,
    getStats,
    getConditions,
    getDescription,
    getLevel,
    getImageUrl,
];

const options: PromptOption[] = [
    {
        scrapeOption: ItemType.Equipment,
        callback: () => scrape<Equipment>(Equipment, ItemType.Equipment, [...defaultProps, getSet]),
    },
    {
        scrapeOption: ItemType.Set,
        callback: () =>
            scrape<Set>(Set, ItemType.Set, [getName, getSetBonus, getLevel, getImageUrl]),
    },
];

export const promptUser = async (): Promise<void> => {
    const { option } = await prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Which category do you want to scrape?',
            choices: Object.values(ItemType),
        },
    ]);

    const { callback } = options.find(({ scrapeOption }) => scrapeOption === option);

    if (!callback) {
        console.log('Something went wrong while selecting an option, please try again.');
        await promptUser();
    }

    await callback();
    process.exit(0);
};
