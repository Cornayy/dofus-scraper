import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Ceremonial extends BaseEntity {
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
    set: string;

    @Column()
    stats: string[];
}
