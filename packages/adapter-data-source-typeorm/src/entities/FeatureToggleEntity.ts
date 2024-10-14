import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AdminEntity } from './AdminEntity';

@Entity('FeatureToggles')
export class FeatureToggleEntity implements DataSource.DBFeatureToggle {
    @PrimaryColumn('char', { length: 20 })
    featureToggleId!: string;

    @Column('varchar')
    key!: string;

    @Column('tinyint')
    activityLevel!: number;

    @Column('char', { length: 20 })
    adminId!: string;

    @Column('datetime')
    createdAt!: Date;

    /* relations */

    @ManyToOne(() => AdminEntity)
    @JoinColumn({ name: 'adminId' })
    admin?: AdminEntity;
}
