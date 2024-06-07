import { type DataSource, type Shared } from '@people-eat/server-domain';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { NanoId } from '../../../domain/src/core/shared';
import { UserEntity } from './UserEntity';

@Entity('GiftCards')
export class GiftCardEntity implements DataSource.DBGiftCard {
    @PrimaryColumn('char', { length: 20 })
    giftCardId!: NanoId;

    @Column('varchar')
    redeemCode!: string;

    @Column('char', { length: 20, nullable: true })
    userId?: NanoId;

    @Column('json', { nullable: true })
    buyer?: {
        firstName: string;
        lastName: string;
        emailAddress: string;
    };

    @Column('json')
    recipient!: {
        firstName: string;
        lastName: string;
        deliveryInformation?: {
            emailAddress: string;
            date: string;
        };
    };

    @Column('varchar')
    message!: string;

    @Column('varchar')
    occasion!: string;

    @Column('datetime')
    expiresAt!: Date;

    @Column('datetime')
    createdAt!: Date;

    @Column('json')
    paymentData!: {
        provider: Shared.PaymentProvider;
        paymentIntentId: string;
        clientSecret: string;
        confirmed: boolean;
    };

    @Column('int', { unsigned: true })
    initialBalanceAmount!: number;

    @Column('int', { unsigned: true })
    initialPeopleEatAmount!: number;

    @Column('int', { unsigned: true })
    initialCookAmount!: number;

    @Column('int', { unsigned: true })
    remainingBalanceAmount!: number;

    @Column('int', { unsigned: true })
    remainingPeopleEatAmount!: number;

    @Column('int', { unsigned: true })
    remainingCookAmount!: number;

    @Column('enum', {
        enum: ['EUR', 'USD'],
        enumName: 'CurrencyCode',
    })
    currencyCode!: Shared.CurrencyCode;

    /* relations */

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
    user?: UserEntity;

    // @OneToMany(() => BookingRequestEntity, (bookingRequest: BookingRequestEntity) => bookingRequest.giftCardPromoCode)
    // bookingRequests?: BookingRequestEntity[];
}
