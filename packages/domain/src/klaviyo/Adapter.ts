import { type User } from '../core';
import { type NanoId } from '../core/shared';

type Recipient = Pick<User, 'userId' | 'firstName' | 'lastName' | 'emailAddress' | 'phoneNumber'>;

export interface KlaviyoAdapterSendRequest {
    recipient: Recipient;
    metricId: string;
    data: object;
}

export interface KlaviyoAdapterSendGlobalBookingRequestWithEmailConfirmationRequest {
    recipient: Recipient;
    data: {
        globalBookingRequestId: NanoId;
        totalParticipants: number;
        adults: number;
        children: number;
        priceClassTypeLabel: string;
        timeLabel: string;
        dateLabel: string;
        locationText: string;
        occasion: string;
        message: string;
        confirmEmailAddressUrl: string;
    };
}

export interface KlaviyoAdapterSendBookingRequestWithMenuCreatedRequest {
    recipient: Recipient;
    data: {
        bookingRequestId: NanoId;
        user: {
            firstName: string;
            lastName: string;
            formattedPrice: string;
            url: string;
        };
        cook: {
            user: {
                firstName: string;
                lastName: string;
            };
            formattedPrice: string;
            url: string;
        };
        configuredMenu: {
            title: string;
        };

        totalParticipants: number;
        adults: number;
        children: number;

        timeLabel: string;
        dateLabel: string;
        locationText: string;
        occasion: string;

        message: string;
    };
}

export interface KlaviyoAdapterSendGiftCardPurchaseConfirmationRequest {
    recipient: Recipient;
    data: {
        occasion: string;
        recipient: {
            firstName: string;
        };
        formattedPrice: string;
        automaticDeliveryEnabledLabel: string;
    };
}

export interface Adapter {
    send(request: KlaviyoAdapterSendRequest): Promise<boolean>;
    sendGlobalBookingRequestWithEmailConfirmation(
        request: KlaviyoAdapterSendGlobalBookingRequestWithEmailConfirmationRequest,
    ): Promise<void>;
    sendBookingRequestWithMenuCreatedToCustomer(request: KlaviyoAdapterSendBookingRequestWithMenuCreatedRequest): Promise<void>;
    sendGiftCardPurchaseConfirmation(request: KlaviyoAdapterSendGiftCardPurchaseConfirmationRequest): Promise<void>;
}
