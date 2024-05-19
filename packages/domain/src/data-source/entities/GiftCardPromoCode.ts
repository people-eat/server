import { type GiftCardPromoCode } from '../../core/gift-card-promo-code';
import { type CurrencyCode } from '../../core/shared';

export interface DBGiftCardPromoCode extends Omit<GiftCardPromoCode, 'balance'> {
    amount: number;
    currencyCode: CurrencyCode;
}
