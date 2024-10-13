import { Authorization, type CookLanguage } from '../../..';
import { type DBUser } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneCookRequest } from '../CreateOneCookRequest';

export interface CreateOneCookInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneCookRequest & { cookId: NanoId };
}

// eslint-disable-next-line max-statements
export async function createOne({ runtime, context, request }: CreateOneCookInput): Promise<boolean> {
    const { dataSourceAdapter, logger, paymentAdapter } = runtime;
    const {
        cookId,
        isVisible,
        name,
        location,
        rank,
        biography,
        travelExpenses,
        maximumTravelDistance,
        minimumPrice,
        maximumPrice,
        minimumParticipants,
        maximumParticipants,
        languageIds,
    } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.insertOne({
        cookId,
        isLocked: false,
        isVisible,
        name,
        latitude: location.latitude,
        longitude: location.longitude,
        city: location.text ?? '',
        rank,
        biography: biography.trim(),
        travelExpenses,
        maximumTravelDistance,
        minimumPrice,
        maximumPrice,
        minimumParticipants,
        maximumParticipants,
        payoutMethods: [],
        createdAt: new Date(),
    });

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cookId });

    if (!user) return false;

    await runtime.emailAdapter.sendToMany(
        'PeopleEat',
        runtime.notificationEmailAddresses,
        'Neue Koch Registrierung',
        `${user.firstName} ${user.lastName} hat sich als PeopleEat Koch registriert`,
    );

    if (languageIds) {
        const languageSuccess: boolean = await dataSourceAdapter.cookLanguageRepository.insertMany(
            languageIds.map((languageId: NanoId): CookLanguage => ({ languageId, cookId })),
        );

        if (!languageSuccess) return false;
    }

    if (!user.emailAddress) return success;

    const connectedAccountResult: { accountId: string } | undefined = await paymentAdapter.STRIPE.createConnectedAccount({
        emailAddress: user.emailAddress,
        cookId,
    });

    if (!connectedAccountResult) return false;

    await dataSourceAdapter.cookRepository.updateOne(
        { cookId },
        { payoutMethods: [{ provider: 'STRIPE', stripeAccountId: connectedAccountResult.accountId, active: false }] },
    );

    const connectedAccountUrlResult: { url: string } | undefined = await paymentAdapter.STRIPE.createConnectedAccountOnboardingUrl({
        accountId: connectedAccountResult.accountId,
    });

    if (!connectedAccountUrlResult) return false;

    logger.debug(`Stripe connected account url: ${connectedAccountUrlResult.url}`);

    return success;
}
