import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Consumable extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    imageUrl: string;

    @Column()
    encyclopediaUrl: string;

    @Column()
    level: number;

    @Column()
    type: string;

    @Column()
    stats: string[];

    @Column()
    conditions: string[];
}
