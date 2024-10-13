import { Authorization, type DataSource } from '../../..';
import { type DBUser } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CookPayoutMethod } from '../CookPayoutMethod';

export interface GetStripeOnboardingUrlInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { cookId: NanoId; returnBookingId?: NanoId };
}

export async function getStripeOnboardingUrl({ runtime, context, request }: GetStripeOnboardingUrlInput): Promise<string | undefined> {
    const { dataSourceAdapter, paymentAdapter, logger } = runtime;
    const { cookId, returnBookingId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const cook: DataSource.DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId });

    if (!cook) return;

    let [payoutMethod] = cook.payoutMethods;

    if (!payoutMethod) {
        const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cookId });

        if (!user || !user.emailAddress) return;

        const connectedAccountResult: { accountId: string } | undefined = await paymentAdapter.STRIPE.createConnectedAccount({
            emailAddress: user.emailAddress,
            cookId,
        });

        if (!connectedAccountResult) return;

        const newPayoutMethod: CookPayoutMethod = { provider: 'STRIPE', stripeAccountId: connectedAccountResult.accountId, active: false };

        const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { payoutMethods: [newPayoutMethod] });

        if (!success) return;

        payoutMethod = newPayoutMethod;
    }

    const { stripeAccountId } = payoutMethod;

    const onboardingUrlResult: { url: string } | undefined = await paymentAdapter.STRIPE.createConnectedAccountOnboardingUrl({
        accountId: stripeAccountId,
        returnBookingId,
    });

    if (!onboardingUrlResult) return;

    const { url } = onboardingUrlResult;

    return url;
}
