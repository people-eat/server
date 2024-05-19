import { type Price } from '../shared';

export interface CreateOneGiftCardPromoCodeRequest {
    redeemCode: string;
    balance: Price;
    expiresAt: Date;
}
