import { type CurrencyCode, type NanoId, type PaymentProvider } from '../shared';

export interface GiftCard {
    giftCardId: NanoId;
    redeemCode: string;

    userId?: NanoId;
    buyer?: {
        firstName: string;
        lastName: string;
        emailAddress: string;
    };

    invoiceAddress: {
        country: string;
        city: string;
        postCode: string;
        street: string;
        houseNumber: string;
    };

    recipient: {
        firstName: string;
        lastName: string;
        deliveryInformation?: {
            emailAddress: string;
            date: string;
        };
    };

    message: string;
    occasion: string;
    expiresAt: Date;
    createdAt: Date;

    paymentData: {
        provider: PaymentProvider;
        paymentIntentId: string;
        clientSecret: string;
        confirmed: boolean;
    };

    initialBalanceAmount: number;
    initialPeopleEatAmount: number;
    initialCookAmount: number;

    remainingBalanceAmount: number;
    remainingPeopleEatAmount: number;
    remainingCookAmount: number;

    currencyCode: CurrencyCode;
}
