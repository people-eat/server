import { type GlobalBookingRequestPriceClassType, type User } from '../core';

type Recipient = Pick<User, 'userId' | 'firstName' | 'lastName' | 'emailAddress' | 'phoneNumber'>;

export interface KlaviyoAdapterSendRequest {
    recipient: Recipient;
    metricId: string;
    data: object;
}

export interface KlaviyoAdapterSendGlobalBookingRequestWithEmailConfirmationRequest {
    recipient: Recipient;
    data: {
        adultParticipants: number;
        children: number;
        priceClassType: GlobalBookingRequestPriceClassType;
        dateTime: Date;
        duration: number;
        occasion: string;
        message: string;
        location: Location;
        createdAt: Date;
    };
}

export interface Adapter {
    send(request: KlaviyoAdapterSendRequest): Promise<boolean>;
    sendBookingRequestMail(request: KlaviyoAdapterSendGlobalBookingRequestWithEmailConfirmationRequest): Promise<void>;
}
