import { paths } from './config/options';
import { getFileName } from './utils';
import { ItemType } from './types';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

export const storeLinks = (category: ItemType, items: string[]): void => {
    for (const path of Object.values(paths)) {
        if (!existsSync(path)) {
            mkdirSync(path);
        }
    }

    const fileName = getFileName(category, '.txt');
    const stream = createWriteStream(`${paths.links}/${fileName}`);

    stream.once('open', () => {
        for (const item of items) {
            stream.write(`${item}\n`);
        }

        stream.end();
    });
};
