import { Shared, type DataSource } from '@people-eat/server-domain';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { AdminEntity } from './AdminEntity';
import { BookingRequestEntity } from './BookingRequestEntity';

@Entity('GiftCardPromoCodes')
export class GiftCardPromoCodeEntity implements DataSource.DBGiftCardPromoCode {
    @PrimaryColumn('char', { length: 20 })
    giftCardPromoCodeId!: string;

    @Column('char', { length: 20 })
    adminId!: string;

    @Column('varchar')
    redeemCode!: string;

    @Column('int', { unsigned: true })
    amount!: number;

    @Column('enum', {
        enum: ['EUR', 'USD'],
        enumName: 'CurrencyCode',
    })
    currencyCode!: Shared.CurrencyCode;

    @Column('datetime')
    expiresAt!: Date;

    @Column('datetime')
    createdAt!: Date;

    /* relations */

    @ManyToOne(() => AdminEntity)
    @JoinColumn({ name: 'adminId' })
    admin?: AdminEntity;

    @OneToMany(() => BookingRequestEntity, (bookingRequest: BookingRequestEntity) => bookingRequest.giftCardPromoCode)
    bookingRequests?: BookingRequestEntity[];
}
