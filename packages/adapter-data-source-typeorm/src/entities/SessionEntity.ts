import { Shared, type DataSource } from '@people-eat/server-domain';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity('Sessions')
export class SessionEntity implements DataSource.DBSession {
    @PrimaryColumn('char', { length: 20 })
    sessionId!: string;

    @Column('char', { length: 20, nullable: true })
    userId: string | undefined;

    @Column('varchar', { nullable: true })
    title: string | undefined;

    @Column('enum', {
        enum: ['IOS', 'ANDROID', 'BROWSER', 'NO_INFORMATION'],
        enumName: 'Platform',
    })
    platform!: Shared.Platform;

    @Column('boolean', { default: false })
    expired!: boolean;

    @Column('datetime')
    lastExtendedAt!: Date;

    @Column('datetime')
    createdAt!: Date;

    @Column('json', { nullable: true })
    cookieSettings?: {
        sessionCookie?: boolean;
        googleAnalytics?: boolean;
        clarity?: boolean;
    };

    /* relations */

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.sessions, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user?: UserEntity;
}
