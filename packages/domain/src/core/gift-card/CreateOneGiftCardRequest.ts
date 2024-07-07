import { type NanoId } from '../shared';

export interface CreateOneGiftCardRequest {
    balance: number;
    message: string;
    occasion: string;
    userId?: NanoId;
    buyer?: {
        firstName: string;
        lastName: string;
        emailAddress: string;
    };
    recipient: {
        firstName: string;
        lastName: string;
        deliveryInformation?: {
            date: string;
            emailAddress: string;
        };
    };
    invoiceAddress: {
        country: string;
        city: string;
        postCode: string;
        street: string;
        houseNumber: string;
    };
}
