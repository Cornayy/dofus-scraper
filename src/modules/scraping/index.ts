/* eslint-disable @typescript-eslint/ban-types */
import { writeToDatabase } from './../../utils/data';
import { paths } from '../../config/options';
import { fileExists } from '../../utils';
import { sleep } from '../../utils/index';
import { DeepPartial } from 'typeorm';
import { BaseEntity, getRepository } from 'typeorm';
import { ItemType } from '../../types/index';
import { ScrapeCallback } from '../../types/index';
import { load } from 'cheerio';
import { requestOptions } from '../../config/options';
import { fetchUrl, retrieveLinks } from '../../utils';
import { join } from 'path';

export * from './scrape-fields';

export const scrape = async <T extends BaseEntity>(
    entity: Function,
    category: ItemType,
    required: ScrapeCallback<T>[]
): Promise<void> => {
    if (fileExists(paths.json, category, '.json')) {
        console.log(
            `A JSON file for the category (${category}) has been found, saving to database...`
        );
        await writeToDatabase(entity, join(paths.json, `${category}.json`));
    } else {
        const baseUrl = `${requestOptions.baseUrl}/${category}${requestOptions.sizeParam}`;
        const content = await fetchUrl(baseUrl);

        if (!content) return;

        const maxPage = getMaxPage(content);
        const links = await retrieveLinks(maxPage, baseUrl, category);
        const repository = getRepository<T>(entity);

        for (const link of links) {
            const item = await fetchUrl(`${requestOptions.dofusUrl}${link}`);

            if (!item) continue;

            const object = required
                .map((callback) => getContent<T>(item, callback))
                .reduce((a, b) => ({ ...a, ...b }));

            await repository.create({ ...object, encyclopediaUrl: link }).save();

            // Wait a bit before next scraping due to rate-limiting.
            await sleep(500);
        }
    }

    console.log(`Done scraping items of category (${category})!`);
};

export const getMaxPage = (content: string): number => {
    const selector = load(content);

    return Math.max(
        ...selector('ul[class="ak-pagination pagination ak-ajaxloader"]')
            .find('li > a[href]')
            .text()
            .trim()
            .replace(/‹|›|»|«|/g, '')
            .split(/\n| /)
            .filter((element) => element !== '...' && element !== '')
            .map((pagination) => {
                const page = pagination.replace('... ', '').trim();
                return Number(page);
            })
    );
};

export const getContent = <T>(content: string, callback: ScrapeCallback<T>): DeepPartial<T> => {
    const selector = load(content);
    return callback(selector);
};
