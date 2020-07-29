import { paths } from './config/options';
import { getFileName } from './utils';
import { ItemCategory } from './types/index';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

export const writeToLog = (category: ItemCategory, items: string[]): void => {
    if (!existsSync(paths.logPath)) {
        mkdirSync(paths.logPath);
    }

    const fileName = getFileName(category.toString(), '.txt');
    const stream = createWriteStream(`${paths.logPath}/${fileName}`);

    stream.once('open', () => {
        for (const item of items) {
            stream.write(`${item}\n`);
        }

        stream.end();
    });
};
