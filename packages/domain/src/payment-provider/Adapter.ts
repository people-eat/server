import { type CurrencyCode, type NanoId, type PaymentProvider, type Price } from '../core/shared';

export interface CreatePaymentIntentInputFromSetupIntentInput {
    currencyCode: CurrencyCode;
    pullAmount: number;
    payoutAmount: number;
    userId: NanoId;
    setupIntentId: string;
    destinationAccountId: string;
}

export interface CreateConnectedAccountInput {
    emailAddress: string;
}

export interface CreateConnectedAccountOnboardingUrlInput {
    accountId: string;
    returnBookingId?: NanoId;
}

export interface IsConnectedAccountEnabledInput {
    accountId: string;
}

export interface CreateConnectedAccountDashboardUrlInput {
    accountId: string;
}

export interface TransferPaymentToCookAccountInput {
    accountId: string;
    price: Price;
}

export interface CreatePaymentIntentInput {
    amount: number;
}

export type Adapter = Record<
    PaymentProvider,
    {
        createSetupIntent: () => Promise<{ setupIntentId: string; clientSecret: string } | undefined>;
        createPaymentIntentFromSetupIntent: (input: CreatePaymentIntentInputFromSetupIntentInput) => Promise<boolean>;
        createConnectedAccount(input: CreateConnectedAccountInput): Promise<{ accountId: string } | undefined>;
        createConnectedAccountOnboardingUrl(input: CreateConnectedAccountOnboardingUrlInput): Promise<{ url: string } | undefined>;
        isConnectedAccountEnabled(input: IsConnectedAccountEnabledInput): Promise<boolean>;
        createConnectedAccountDashboardUrl(input: CreateConnectedAccountDashboardUrlInput): Promise<{ url: string } | undefined>;
        transferPaymentToCookAccount(input: TransferPaymentToCookAccountInput): Promise<boolean>;
        createPaymentIntent(input: CreatePaymentIntentInput): Promise<{ paymentIntentId: string; clientSecret: string }>;
        checkPaymentIntentCompleted(paymentIntentId: string): Promise<boolean>;
    }
>;
