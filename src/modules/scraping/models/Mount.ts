import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Mount extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    imageUrl: string;

    @Column()
    encyclopediaUrl: string;

    @Column()
    type: string;

    @Column()
    stats: string[];

    @Column()
    characteristics: string[];
}
