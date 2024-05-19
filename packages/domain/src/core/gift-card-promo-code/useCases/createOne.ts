import { Authorization } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneGiftCardPromoCodeRequest } from '../CreateOneGiftCardPromoCodeRequest';

export interface CreateOneAddressInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneGiftCardPromoCodeRequest;
}

export async function createOne({ runtime: { dataSourceAdapter, logger }, context, request }: CreateOneAddressInput): Promise<boolean> {
    const { redeemCode, balance, expiresAt } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const giftCardPromoCodeId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.giftCardPromoCodeRepository.insertOne({
        giftCardPromoCodeId,
        adminId: context.userId ?? '',
        redeemCode: redeemCode.trim(),
        amount: balance.amount,
        currencyCode: balance.currencyCode,
        expiresAt,
        createdAt: new Date(),
    });

    return success;
}
