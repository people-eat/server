import { type GiftCard } from '../../core/gift-card';
import { type CurrencyCode } from '../../core/shared';

export interface DBGiftCard extends Omit<GiftCard, 'balance'> {
    initialBalanceAmount: number;
    remainingBalanceAmount: number;
    currencyCode: CurrencyCode;
}
