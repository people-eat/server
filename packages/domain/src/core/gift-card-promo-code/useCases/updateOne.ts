import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type UpdateOneGiftCardPromoCodeRequest } from '../UpdateOneGiftCardPromoCodeRequest';

export interface UpdateOneGiftCardPromoCodeInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: UpdateOneGiftCardPromoCodeRequest;
}

export async function updateOne({
    runtime: { dataSourceAdapter, logger },
    context,
    request,
}: UpdateOneGiftCardPromoCodeInput): Promise<boolean> {
    const { giftCardPromoCodeId, redeemCode, balance, expiresAt } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    // consider adding last updated by
    const success: boolean = await dataSourceAdapter.giftCardPromoCodeRepository.updateOne(
        { giftCardPromoCodeId },
        {
            redeemCode: redeemCode.trim(),
            amount: balance.amount,
            currencyCode: balance.currencyCode,
            expiresAt,
        },
    );

    return success;
}
