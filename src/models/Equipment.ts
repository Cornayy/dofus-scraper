import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Equipment {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;
}
