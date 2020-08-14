/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { promptUser } from './modules/prompt';

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

    await promptUser();

    // Example snippet of how to join equipment into sets.

    /*
    const manager = getMongoManager();
    const [result] = await manager
        .aggregate(Set, [
            {
                $lookup: {
                    from: 'equipment',
                    localField: 'encyclopediaUrl',
                    foreignField: 'set',
                    as: 'items',
                },
            },
        ])
        .toArray();
        */
})();
