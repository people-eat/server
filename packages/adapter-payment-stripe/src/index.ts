import { type Logger, type PaymentProvider, type User } from '@people-eat/server-domain';
import { Stripe } from 'stripe';

export interface CreatePaymentAdapterInput {
    logger: Logger.Adapter;
    stripeSecretKey: string;
    stripeConnectedAccountOnboarding: {
        refreshUrl: string;
        returnToProfileUrl: string;
        returnToBookingUrl: string;
    };
}

export function createPaymentAdapter({
    logger,
    stripeSecretKey,
    stripeConnectedAccountOnboarding,
}: CreatePaymentAdapterInput): PaymentProvider.Adapter {
    const client: Stripe = new Stripe(stripeSecretKey, { apiVersion: '2022-11-15' });

    async function getStripeCustomerId({ userId, firstName, lastName }: Pick<User, 'userId' | 'firstName' | 'lastName'>): Promise<string> {
        const {
            data: [existingCustomer],
        } = await client.customers.search({
            query: `metadata['userId']:'${userId}'`,
        });

        if (!existingCustomer) {
            logger.info(`Requested Stripe user for PeopleEat user with id '${userId}' and did not receive one.`);

            const createdCustomer: Stripe.Customer = await client.customers.create({
                name: `${firstName} ${lastName}`,
                metadata: { userId },
            });

            logger.info(`Created Stripe customer for PeopleEat user with id '${userId}'\n${JSON.stringify(createdCustomer)}`);

            return createdCustomer.id;
        }

        return existingCustomer.id;
    }

    return {
        STRIPE: {
            createSetupIntent: async ({
                user,
            }: PaymentProvider.CreateSetupIntentInput): Promise<
                { customerId: string; setupIntentId: string; clientSecret: string } | undefined
            > => {
                try {
                    const customerId: string = await getStripeCustomerId(user);

                    const setupIntent: Stripe.SetupIntent = await client.setupIntents.create({
                        usage: 'off_session',
                        automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
                        customer: customerId,
                    });

                    if (!setupIntent.client_secret) {
                        logger.error(`Created setup intent without client_secret property: ${setupIntent}`);
                        return undefined;
                    }

                    return {
                        customerId,
                        setupIntentId: setupIntent.id,
                        clientSecret: setupIntent.client_secret,
                    };
                } catch (error) {
                    logger.error(error);
                    return undefined;
                }
            },
            createPaymentIntentFromSetupIntent: async ({
                setupIntentId,
                pullAmount,
                payoutAmount,
                destinationAccountId,
                bookingRequestId,
                user,
            }: PaymentProvider.CreatePaymentIntentInputFromSetupIntentInput): Promise<boolean> => {
                try {
                    const setupIntent: Stripe.SetupIntent = await client.setupIntents.retrieve(setupIntentId);

                    const paymentMethodId: string | null | Stripe.PaymentMethod = setupIntent.payment_method;

                    if (typeof paymentMethodId !== 'string') return false;

                    const customerId: string = await getStripeCustomerId(user);

                    const paymentIntent: Stripe.PaymentIntent = await client.paymentIntents.create({
                        customer: customerId,
                        payment_method: paymentMethodId,
                        amount: pullAmount,
                        currency: 'eur',
                        confirm: true,
                        // consider using the value from the db
                        application_fee_amount: pullAmount - payoutAmount,
                        transfer_data: {
                            destination: destinationAccountId,
                        },
                        automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
                        // payment_method_options: { card: { request_three_d_secure: 'any' } },
                        setup_future_usage: 'off_session',
                        metadata: { bookingRequestId },
                    });

                    // check payment intent status
                    // paymentIntent.amount

                    await client.transfers.create({
                        amount: payoutAmount,
                        currency: 'eur',
                        destination: destinationAccountId,
                    });

                    return paymentIntent.status === 'succeeded';
                } catch (error) {
                    logger.error(error);
                    return false;
                }
            },
            createConnectedAccount: async ({
                emailAddress,
                cookId,
            }: PaymentProvider.CreateConnectedAccountInput): Promise<{ accountId: string } | undefined> => {
                try {
                    const account: Stripe.Account = await client.accounts.create({
                        type: 'express',
                        email: emailAddress,
                        settings: {
                            payouts: {
                                schedule: {
                                    interval: 'manual',
                                },
                            },
                        },
                        metadata: { cookId },
                    });

                    return { accountId: account.id };
                } catch (error) {
                    logger.error(error);
                    return undefined;
                }
            },
            isConnectedAccountEnabled: async ({ accountId }: PaymentProvider.IsConnectedAccountEnabledInput): Promise<boolean> => {
                try {
                    const account: Stripe.Account = await client.accounts.retrieve(accountId);

                    const actionItems: string[] | null | undefined = account.requirements?.currently_due;

                    if (!actionItems || actionItems.length < 1) return true;

                    return false;
                } catch (error) {
                    logger.error(error);
                    return false;
                }
            },
            createConnectedAccountOnboardingUrl: async ({
                accountId,
                returnBookingId,
            }: PaymentProvider.CreateConnectedAccountOnboardingUrlInput): Promise<{ url: string } | undefined> => {
                try {
                    const accountLink: Stripe.AccountLink = await client.accountLinks.create({
                        account: accountId,
                        refresh_url: stripeConnectedAccountOnboarding.refreshUrl,
                        return_url: returnBookingId
                            ? stripeConnectedAccountOnboarding.returnToBookingUrl.replace(':bookingRequestId', returnBookingId)
                            : stripeConnectedAccountOnboarding.returnToProfileUrl,
                        type: 'account_onboarding',
                    });

                    return { url: accountLink.url };
                } catch (error) {
                    logger.error(error);
                    return undefined;
                }
            },
            createConnectedAccountDashboardUrl: async ({
                accountId,
            }: PaymentProvider.CreateConnectedAccountOnboardingUrlInput): Promise<{ url: string } | undefined> => {
                try {
                    const loginLink: Stripe.LoginLink = await client.accounts.createLoginLink(accountId);

                    return { url: loginLink.url };
                } catch (error) {
                    logger.error(error);
                    return undefined;
                }
            },
            transferPaymentToCookAccount: async ({
                accountId,
                price,
            }: PaymentProvider.TransferPaymentToCookAccountInput): Promise<boolean> => {
                try {
                    const result: Stripe.Payout = await client.payouts.create(
                        {
                            amount: price.amount,
                            currency: 'eur',
                        },
                        { stripeAccount: accountId },
                    );

                    return result.status !== 'failed';
                } catch (error) {
                    logger.error(error);
                    return false;
                }
            },
            createPaymentIntent: async ({
                amount,
            }: PaymentProvider.CreatePaymentIntentInput): Promise<{ paymentIntentId: string; clientSecret: string }> => {
                try {
                    const paymentIntent: Stripe.PaymentIntent = await client.paymentIntents.create({
                        amount,
                        currency: 'eur',
                    });

                    if (!paymentIntent.client_secret) throw new Error();

                    return {
                        paymentIntentId: paymentIntent.id,
                        clientSecret: paymentIntent.client_secret,
                    };
                } catch (error) {
                    console.log(error);
                    throw new Error();
                }
            },
            checkPaymentIntentCompleted: async (paymentIntentId: string): Promise<boolean> => {
                try {
                    const res: Stripe.PaymentIntent = await client.paymentIntents.retrieve(paymentIntentId);
                    return res.status === 'succeeded';
                } catch (error) {
                    return false;
                }
            },
        },
    };
}
