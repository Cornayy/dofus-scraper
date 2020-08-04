/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import { Equipment } from './modules/equipment/models/Equipment';
import { getDescription, getImageUrl, getLevel, getName, getType } from './scraping/index';
import { getConditions, getStats } from './scraping/index';
import { ItemType } from './types/index';
import { scrape } from './scraping';
import { createConnection } from 'typeorm';

dotenv.config();

(async () => {
    await createConnection({
        type: process.env.DB_TYPE as any,
        host: process.env.HOST as any,
        port: process.env.PORT as any,
        database: process.env.DB_NAME as any,
        useUnifiedTopology: true,
        entities: ['./src/modules/**/models/*.ts'],
    });

    scrape<Equipment>(Equipment, ItemType.Equipment, [
        getName,
        getType,
        getStats,
        getConditions,
        getDescription,
        getLevel,
        getImageUrl,
    ]);
})();
