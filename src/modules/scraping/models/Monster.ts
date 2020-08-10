import { MonsterDrop } from './../../../types/index';
import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Monster extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    family: string;

    @Column()
    imageUrl: string;

    @Column()
    encyclopediaUrl: string;

    @Column()
    level: string;

    @Column()
    characteristics: string[];

    @Column()
    resistances: string[];

    @Column()
    areas: string[];

    @Column()
    drops: MonsterDrop[];
}
