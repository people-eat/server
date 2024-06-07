import { type Authorization } from '../../..';
import { type DBGiftCard, type DBGiftCardPromoCode } from '../../../data-source';
import { type GiftCard } from '../../gift-card';
import { type GiftCardPromoCode } from '../../gift-card-promo-code';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface FindOneAddressInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { couponCodeId: NanoId };
}

export async function findOne({
    runtime: { dataSourceAdapter },
    request,
}: FindOneAddressInput): Promise<GiftCardPromoCode | GiftCard | undefined> {
    const { couponCodeId } = request;

    const giftCardPromoCode: DBGiftCardPromoCode | undefined = await dataSourceAdapter.giftCardPromoCodeRepository.findOne({
        giftCardPromoCodeId: couponCodeId,
    });

    if (giftCardPromoCode) {
        return {
            ...giftCardPromoCode,
            balance: {
                amount: giftCardPromoCode.amount,
                currencyCode: giftCardPromoCode.currencyCode,
            },
        };
    }

    const giftCard: DBGiftCard | undefined = await dataSourceAdapter.giftCardRepository.findOne({
        giftCardId: couponCodeId,
    });

    if (giftCard && giftCard.paymentData.confirmed) {
        return {
            ...giftCard,
            balance: {
                amount: giftCard.remainingBalanceAmount,
                currencyCode: giftCard.currencyCode,
            },
        };
    }

    return undefined;
}
