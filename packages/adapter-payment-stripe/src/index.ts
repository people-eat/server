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
            createPaymentIntent: async ({ setupIntentId, amount }: PaymentProvider.CreatePaymentIntentInput): Promise<boolean> => {
                try {
                    const setupIntent: Stripe.SetupIntent = await client.setupIntents.retrieve(setupIntentId);

                    const paymentMethodId: string | null | Stripe.PaymentMethod = setupIntent.payment_method;

                    if (typeof paymentMethodId !== 'string') return false;

                    const customer: Stripe.Customer = await client.customers.create({});

                    await client.paymentMethods.attach(paymentMethodId, { customer: customer.id });

                    const paymentIntent: Stripe.PaymentIntent = await client.paymentIntents.create({
                        customer: customer.id,
                        payment_method: paymentMethodId,
                        amount,
                        currency: 'eur',
                        confirm: true,
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
            }: PaymentProvider.CreateConnectedAccountOnboardingUrlInput): Promise<{ url: string } | undefined> => {
                try {
                    const accountLink: Stripe.AccountLink = await client.accountLinks.create({
                        account: accountId,
                        refresh_url: stripeConnectedAccountOnboarding.refreshUrl,
                        return_url: stripeConnectedAccountOnboarding.returnUrl,
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
                    await client.transfers.create({
                        amount: price.amount,
                        currency: 'eur',
                        destination: accountId,
                    });

                    return true;
                } catch (error) {
                    logger.error(error);
                    return false;
                }
            },
        },
    };
}
