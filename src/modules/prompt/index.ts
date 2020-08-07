import { prompt } from 'inquirer';
import { ItemType } from '../../types';
import { scrapeOptions } from '../../config/options';

export const promptUser = async (): Promise<void> => {
    const { option } = await prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Which category do you want to scrape?',
            choices: Object.values(ItemType),
        },
    ]);

    const { callback } = scrapeOptions.find(({ scrapeOption }) => scrapeOption === option);

    if (!callback) {
        console.log('Something went wrong while selecting an option, please try again.');
        await promptUser();
    }

    await callback();
    process.exit(0);
};
