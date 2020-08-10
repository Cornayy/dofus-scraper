import { RecipeIngredient } from './../../../types/index';
import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Weapon extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    type: string;

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
    stats: string[];

    @Column()
    conditions: string[];

    @Column()
    recipe: RecipeIngredient[];
}
