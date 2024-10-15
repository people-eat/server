import { type Location, type NanoId } from '../shared';

export type GlobalBookingRequestPriceClassType = 'SIMPLE' | 'FINE' | 'GOURMET';

export interface GlobalBookingRequestPriceClass {
    type: GlobalBookingRequestPriceClassType;
    min: number;
    max: number;
    currencyCode: string;
}

export interface GlobalBookingRequest {
    globalBookingRequestId: NanoId;
    userId: NanoId;
    adultParticipants: number;
    children: number;
    priceClassType: GlobalBookingRequestPriceClassType;
    dateTime: Date;
    duration: number;
    occasion: string;
    message: string;
    kitchenId?: string;
    location: Location;
    expiresAt: Date;
    // matchedAt: Date;
    createdAt: Date;
}
