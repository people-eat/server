import { type NanoId, type Price } from '../shared';

export interface UpdateOneGiftCardPromoCodeRequest {
    giftCardPromoCodeId: NanoId;
    redeemCode: string;
    balance: Price;
    expiresAt: Date;
}
