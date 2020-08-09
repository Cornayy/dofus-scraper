/* eslint-disable @typescript-eslint/ban-types */
import { load } from 'cheerio';
import { join } from 'path';
import { DeepPartial } from 'typeorm';
import { ScrapeCallback, ItemType, ScrapeMode } from '../../types';
import { BaseEntity, getRepository } from 'typeorm';
import { requestOptions, paths } from '../../config/options';
import { fetchUrl, retrieveLinks, fileExists, writeToDatabase, postUrl } from '../../utils';
import { getStats } from './scrape-fields';

export * from './scrape-fields';

export const scrape = async <T extends BaseEntity>(
    entity: Function,
    category: ItemType,
    required: ScrapeCallback<T>[]
): Promise<void> => {
    // Clear the collection to avoid duplicate records.
    const repository = getRepository<T>(entity);
    const count = await repository.count();
    const { MODE } = process.env;

    if (count > 0) await repository.clear();

    if (fileExists(paths.json, category, '.json') && MODE === ScrapeMode.Existing) {
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

        for (const link of links) {
            const itemUrl = `${requestOptions.dofusUrl}${link}`;
            const item = await fetchUrl(itemUrl);

            if (!item || !link) continue;

            const object = await createObject(category, required, item, itemUrl);
            await repository.create({ ...object, encyclopediaUrl: link }).save();
        }
    }

    console.log(`Done scraping items of category (${category})!`);
};

export const createObject = async <T>(
    category: ItemType,
    required: ScrapeCallback<T>[],
    item: string,
    itemUrl: string
): Promise<DeepPartial<T>> => {
    const props = await Promise.all(
        required.map(async (callback) => {
            let content = item;

            // Fetch the data of a level 100 pet when the scraping category is Pet.
            if (callback.name === getStats.name && category === ItemType.Pet) {
                const stats = await postUrl(itemUrl, requestOptions.petBody);
                if (stats) content = stats;
            }

            return getContent<T>(content, callback);
        })
    );

    return props.reduce((a, b) => ({ ...a, ...b }));
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
