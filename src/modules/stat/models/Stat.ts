import { Equipment } from '../../equipment/models/Equipment';
import { StatType } from '../../../types/index';
import { Entity, ObjectID, ObjectIdColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Stat {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    stat: StatType;

    @Column()
    minValue: number;

    @Column()
    maxValue: number;

    @ManyToOne(() => Equipment, equipment => equipment.stats)
    equipment: Equipment;
}
