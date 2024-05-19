import { type NanoId, type Price } from '../shared';

export interface GiftCardPromoCode {
    giftCardPromoCodeId: NanoId;
    adminId: NanoId;
    redeemCode: string;
    balance: Price;
    expiresAt: Date;
    createdAt: Date;
}
