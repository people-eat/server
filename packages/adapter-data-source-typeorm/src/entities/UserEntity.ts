import { Shared, type DataSource } from '@people-eat/server-domain';
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { AddressEntity } from './AddressEntity';
import { AdminEntity } from './AdminEntity';
import { CookEntity } from './CookEntity';
import { EmailAddressUpdateEntity } from './EmailAddressUpdateEntity';
import { type NotificationConfigurationEntity } from './NotificationConfigurationEntity';
import { OneTimeAccessTokenEntity } from './OneTimeAccessTokenEntity';
import { PhoneNumberUpdateEntity } from './PhoneNumberUpdateEntity';
import { SessionEntity } from './SessionEntity';
import { SupportRequestEntity } from './SupportRequestEntity';

@Entity('Users')
export class UserEntity implements DataSource.DBUser {
    @PrimaryColumn('char', { length: 20 })
    userId!: string;

    @Column('bool')
    isLocked!: boolean;

    @Column('varchar', { nullable: true, unique: true })
    emailAddress?: string;

    // unique: true
    @Column('varchar', { nullable: true })
    phoneNumber?: string;

    @Column('varchar', { nullable: true })
    password?: string;

    @Column('tinyint')
    failedSignInAttempts!: number;

    @Column('varchar')
    firstName!: string;

    @Column('varchar')
    lastName!: string;

    @Column('enum', {
        enum: ['GERMAN', 'ENGLISH'],
        enumName: 'UserLanguage',
    })
    language!: Shared.UserLanguage;

    @Column('enum', {
        enum: ['MALE', 'FEMALE', 'DIVERSE', 'NO_INFORMATION'],
        enumName: 'Gender',
    })
    gender!: Shared.Gender;

    @Column('date', { nullable: true })
    birthDate?: string;

    @Column('varchar', { nullable: true })
    profilePictureUrl?: string;

    @Column('datetime')
    acceptedPrivacyPolicy!: Date;

    @Column('datetime')
    acceptedTerms!: Date;

    @Column('datetime')
    createdAt!: Date;

    /* relations */

    @OneToOne(() => AdminEntity, (admin: AdminEntity) => admin.user, { cascade: true })
    admin?: AdminEntity;

    @OneToOne(() => CookEntity, (cook: CookEntity) => cook.user, { cascade: true })
    cook?: CookEntity;

    @OneToOne(() => EmailAddressUpdateEntity, (emailAddressUpdate: EmailAddressUpdateEntity) => emailAddressUpdate.user, { cascade: true })
    emailAddressUpdate?: EmailAddressUpdateEntity;

    @OneToOne(() => PhoneNumberUpdateEntity, (phoneNumberUpdate: PhoneNumberUpdateEntity) => phoneNumberUpdate.user, { cascade: true })
    phoneNumberUpdate?: PhoneNumberUpdateEntity;

    @OneToOne(() => OneTimeAccessTokenEntity, (oneTimeAccessToken: OneTimeAccessTokenEntity) => oneTimeAccessToken.user, { cascade: true })
    oneTimeAccessToken?: OneTimeAccessTokenEntity;

    @OneToMany(() => SessionEntity, (session: SessionEntity) => session.user)
    sessions?: SessionEntity[];

    @OneToMany(() => AddressEntity, (address: AddressEntity) => address.user, { cascade: true })
    addresses?: AddressEntity[];

    // @OneToOne(
    //     () => NotificationConfigurationEntity,
    //     (notificationConfiguration: NotificationConfigurationEntity) => notificationConfiguration.user,
    //     { cascade: true },
    // )
    notificationConfiguration?: NotificationConfigurationEntity;

    @OneToMany(() => SupportRequestEntity, (supportRequest: SupportRequestEntity) => supportRequest.user)
    supportRequests?: SupportRequestEntity[];
}
