/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

dotenv.config();

(async () => {
    await createConnection({
        type: process.env.DB_TYPE as any,
        host: process.env.HOST as any,
        port: process.env.PORT as any,
        database: process.env.DB_NAME as any,
    });
})();
