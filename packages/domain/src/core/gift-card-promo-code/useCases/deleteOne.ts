import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface DeleteOneGiftCardPromoCodeInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { giftCardPromoCodeId: NanoId };
}

export async function deleteOne({
    runtime: { dataSourceAdapter, logger },
    context,
    request,
}: DeleteOneGiftCardPromoCodeInput): Promise<boolean> {
    const { giftCardPromoCodeId } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const success: boolean = await dataSourceAdapter.giftCardPromoCodeRepository.deleteOne({ giftCardPromoCodeId });

    return success;
}
