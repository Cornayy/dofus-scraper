import { EquipmentType } from '../../equipment/types/index';
import { Entity, ObjectID, ObjectIdColumn, Column, OneToMany } from 'typeorm';
import { Stat } from '../../stat/models/Stat';

@Entity()
export class Equipment {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    conditions: string;

    @Column()
    imageUrl: string;

    @Column()
    encyclopediaUrl: string;

    @Column()
    level: number;

    @Column()
    type: EquipmentType;

    @OneToMany(() => Stat, (stat) => stat.equipment)
    stats: Stat[];
}
