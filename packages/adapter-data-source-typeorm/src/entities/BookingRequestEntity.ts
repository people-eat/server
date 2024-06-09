import { Shared, type DataSource } from '@people-eat/server-domain';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { type NanoId } from '../../../domain/src/core/shared';
import { ChatMessageEntity } from './ChatMessageEntity';
import { ConfiguredMenuEntity } from './ConfiguredMenuEntity';
import { CookEntity } from './CookEntity';
import { GiftCardPromoCodeEntity } from './GiftCardPromoCodeEntity';
import { KitchenEntity } from './KitchenEntity';
import { SupportRequestEntity } from './SupportRequestEntity';
import { UserEntity } from './UserEntity';

@Entity('BookingRequests')
export class BookingRequestEntity implements DataSource.DBBookingRequest {
    @PrimaryColumn('char', { length: 20 })
    bookingRequestId!: NanoId;

    @Column('char', { length: 20 })
    userId!: NanoId;

    @Column('char', { length: 20 })
    cookId!: NanoId;

    @Column('boolean', { nullable: true })
    userAccepted?: boolean;

    @Column('boolean', { nullable: true })
    cookAccepted?: boolean;

    @Column('float', { unsigned: true })
    latitude!: number;

    @Column('float', { unsigned: true })
    longitude!: number;

    @Column('varchar')
    locationText!: string;

    @Column('datetime')
    dateTime!: Date;

    @Column('smallint', { unsigned: true })
    preparationTime!: number;

    @Column('smallint', { unsigned: true })
    duration!: number;

    @Column('smallint', { unsigned: true })
    adultParticipants!: number;

    @Column('smallint', { unsigned: true })
    children!: number;

    @Column('int', { unsigned: true })
    totalAmountUser!: number;

    @Column('int', { unsigned: true })
    totalAmountCook!: number;

    @Column('enum', {
        enum: ['EUR', 'USD'],
        enumName: 'CurrencyCode',
    })
    currencyCode!: Shared.CurrencyCode;

    @Column('smallint', { unsigned: true })
    fee!: number;

    @Column('varchar')
    occasion!: string;

    @Column('char', { length: 20, nullable: true })
    kitchenId?: string;

    @Column('char', { length: 20, nullable: true })
    globalBookingRequestId?: string;

    @Column('datetime')
    createdAt!: Date;

    @Column('json')
    paymentData!: {
        provider: Shared.PaymentProvider;
        setupIntentId: string;
        clientSecret: string;
        confirmed: boolean;
        unlocked: boolean;
    };

    @Column('char', { length: 20, nullable: true })
    giftCardPromoCodeId?: NanoId;

    @Column('json', { nullable: true })
    appliedGiftCard?: {
        giftCardId: NanoId;
        usedAmount: number;
        usedAmountCook: number;
        usedAmountPeopleEat: number;
        usedAmountStripe: number;
    };

    /* relations */

    @OneToMany(() => ChatMessageEntity, (chatMessage: ChatMessageEntity) => chatMessage.bookingRequest, { cascade: true })
    chatMessages?: ChatMessageEntity[];

    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user?: UserEntity;

    @ManyToOne(() => CookEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'cookId' })
    cook?: CookEntity;

    @ManyToOne(() => KitchenEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'kitchenId' })
    kitchen?: KitchenEntity;

    @OneToMany(() => SupportRequestEntity, (supportRequest: SupportRequestEntity) => supportRequest.user)
    supportRequests?: SupportRequestEntity[];

    @OneToOne(() => ConfiguredMenuEntity, (configuredMenu: ConfiguredMenuEntity) => configuredMenu.bookingRequest)
    configuredMenu?: ConfiguredMenuEntity;

    @ManyToOne(() => GiftCardPromoCodeEntity, (giftCardPromoCode: GiftCardPromoCodeEntity) => giftCardPromoCode.bookingRequests)
    @JoinColumn({ name: 'giftCardPromoCodeId' })
    giftCardPromoCode?: GiftCardPromoCodeEntity;
}
