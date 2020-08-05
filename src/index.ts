/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import { Equipment } from './modules/equipment/models/Equipment';
import { ItemType } from './types/index';
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
} from './scraping';
import { createConnection } from 'typeorm';

dotenv.config();

(async () => {
    const defaultProps = [
        getName,
        getType,
        getStats,
        getConditions,
        getDescription,
        getLevel,
        getImageUrl,
    ];

    await createConnection({
        type: process.env.DB_TYPE as any,
        host: process.env.HOST as any,
        port: process.env.PORT as any,
        database: process.env.DB_NAME as any,
        useUnifiedTopology: true,
        entities: ['./src/modules/**/models/*.ts'],
    });

    scrape<Equipment>(Equipment, ItemType.Equipment, [...defaultProps, getSet]);
})();
