import { type Authorization } from '../../..';
import { type DBGiftCardPromoCode } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type GiftCard } from '../GiftCard';

export interface FindOneAddressInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { giftCardPromoCodeId: NanoId };
}

export async function findOne({ runtime: { dataSourceAdapter }, request }: FindOneAddressInput): Promise<GiftCard | undefined> {
    const { giftCardPromoCodeId } = request;

    const giftCardPromoCode: DBGiftCardPromoCode | undefined = await dataSourceAdapter.giftCardPromoCodeRepository.findOne({
        giftCardPromoCodeId,
    });

    if (!giftCardPromoCode) return;

    return undefined;

    // return {
    //     ...giftCardPromoCode,
    //     balance: {
    //         amount: giftCardPromoCode.amount,
    //         currencyCode: giftCardPromoCode.currencyCode,
    //     },
    // };
}
