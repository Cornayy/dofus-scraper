import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Idol extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    difficultyScore: number;

    @Column()
    description: string;

    @Column()
    bonus: string[];

    @Column()
    imageUrl: string;

    @Column()
    encyclopediaUrl: string;

    @Column()
    level: number;

    @Column()
    type: string;

    @Column()
    spells: string;
}
