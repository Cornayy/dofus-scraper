import { paths } from './config/options';
import { getFileName } from './utils';
import { ItemType } from './types';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

export const storeLinks = (category: ItemType, items: string[]): void => {
    if (!existsSync(paths.data)) {
        mkdirSync(paths.data);
    }

    if (!existsSync(paths.links)) {
        mkdirSync(paths.links);
    }

    const fileName = getFileName(category.toString(), '.txt');
    const stream = createWriteStream(`${paths.links}/${fileName}`);

    stream.once('open', () => {
        for (const item of items) {
            stream.write(`${item}\n`);
        }

        stream.end();
    });
};
