import { type Authorization } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneGiftCardRequest } from '../CreateOneGiftCardRequest';

export interface CreateOneGiftCardInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneGiftCardRequest;
}

export async function createOne({
    runtime: { dataSourceAdapter, paymentAdapter },
    request,
}: CreateOneGiftCardInput): Promise<{ stripeClientSecret: string; giftCardId: NanoId } | { failed: boolean }> {
    const { balance, message, occasion, userId, buyer, recipient } = request;

    if (!userId && !buyer) return { failed: true };

    const { clientSecret, paymentIntentId } = await paymentAdapter.STRIPE.createPaymentIntent({
        amount: Math.round((balance + 25) / 0.985),
    });

    const giftCardId: NanoId = createNanoId();
    const redeemCode: string = giftCardId;
    const expiresAt: Date = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 3);

    const success: boolean = await dataSourceAdapter.giftCardRepository.insertOne({
        giftCardId,
        redeemCode,

        userId,
        buyer,
        recipient,

        message,
        occasion,
        expiresAt,
        createdAt: new Date(),

        paymentData: {
            provider: 'STRIPE',
            paymentIntentId,
            clientSecret,
            confirmed: false,
        },

        initialBalanceAmount: balance,
        initialPeopleEatAmount: balance * 0.22,
        initialCookAmount: balance * 0.78,

        remainingBalanceAmount: balance,
        remainingPeopleEatAmount: balance * 0.22,
        remainingCookAmount: balance * 0.78,

        currencyCode: 'EUR',
    });

    if (!success) return { failed: true };

    return { stripeClientSecret: clientSecret, giftCardId };
}
