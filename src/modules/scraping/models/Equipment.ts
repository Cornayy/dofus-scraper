import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from 'typeorm';
import { RecipeIngredient } from '../../../types';

@Entity()
export class Equipment extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    conditions: string[];

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

    @Column()
    recipe: RecipeIngredient[]
}
