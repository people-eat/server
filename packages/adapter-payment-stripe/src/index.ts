import { type Logger, type PaymentProvider } from '@people-eat/server-domain';
import { Stripe } from 'stripe';

export interface CreatePaymentAdapterInput {
    logger: Logger.Adapter;
    stripeSecretKey: string;
    stripeConnectedAccountOnboarding: {
        refreshUrl: string;
        returnUrl: string;
    };
}

export function createPaymentAdapter({
    logger,
    stripeSecretKey,
    stripeConnectedAccountOnboarding,
}: CreatePaymentAdapterInput): PaymentProvider.Adapter {
    const client: Stripe = new Stripe(stripeSecretKey, { apiVersion: '2022-11-15' });

    return {
        STRIPE: {
            createSetupIntent: async (): Promise<{ setupIntentId: string; clientSecret: string } | undefined> => {
                try {
                    const setupIntent: Stripe.SetupIntent = await client.setupIntents.create({
                        usage: 'off_session',
                        automatic_payment_methods: { enabled: true },
                    });

                    if (!setupIntent.client_secret) return undefined;

                    return {
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
            }: PaymentProvider.CreatePaymentIntentInputFromSetupIntentInput): Promise<boolean> => {
                try {
                    const setupIntent: Stripe.SetupIntent = await client.setupIntents.retrieve(setupIntentId);

                    const paymentMethodId: string | null | Stripe.PaymentMethod = setupIntent.payment_method;

                    if (typeof paymentMethodId !== 'string') return false;

                    const customer: Stripe.Customer = await client.customers.create({});

                    await client.paymentMethods.attach(paymentMethodId, { customer: customer.id });

                    const paymentIntent: Stripe.PaymentIntent = await client.paymentIntents.create({
                        customer: customer.id,
                        payment_method: paymentMethodId,
                        amount: pullAmount,
                        currency: 'eur',
                        confirm: true,
                        // consider using the value from the db
                        application_fee_amount: pullAmount - payoutAmount,
                        transfer_data: {
                            destination: destinationAccountId,
                        },
                    });

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
                cookId,
                accountId,
            }: PaymentProvider.CreateConnectedAccountOnboardingUrlInput): Promise<{ url: string } | undefined> => {
                try {
                    const accountLink: Stripe.AccountLink = await client.accountLinks.create({
                        account: accountId,
                        refresh_url: stripeConnectedAccountOnboarding.refreshUrl + '/' + cookId,
                        return_url: stripeConnectedAccountOnboarding.returnUrl + '/' + cookId,
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
