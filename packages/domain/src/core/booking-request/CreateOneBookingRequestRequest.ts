import { type CreateOneConfiguredMenuRequest } from '../configured-menu';
import { type Location, type NanoId, type Price } from '../shared';

export interface CreateOneBookingRequestBaseRequest {
    cookId: NanoId;
    location: Location;
    dateTime: Date;
    preparationTime: number;
    duration: number;
    adultParticipants: number;
    children: number;
    occasion: string;
    message: string;
    travelExpensesAmount: number;
}

export interface CreateOneCookBookingRequestRequest extends CreateOneBookingRequestBaseRequest {
    kitchenId?: NanoId;
    price: Price;
}

export function isCreateOneCookBookingRequestRequest(
    request: CreateOneBookingRequestRequest,
): request is CreateOneCookBookingRequestRequest {
    return Object.prototype.hasOwnProperty.call(request, 'price');
}

export interface CreateOneMenuBookingRequestRequest extends CreateOneBookingRequestBaseRequest {
    configuredMenu: CreateOneConfiguredMenuRequest;
    giftCardPromoCodeId?: string;
}

export function isCreateOneMenuBookingRequestRequest(
    request: CreateOneBookingRequestRequest,
): request is CreateOneMenuBookingRequestRequest {
    return Object.prototype.hasOwnProperty.call(request, 'configuredMenu');
}

export type CreateOneBookingRequestRequest = CreateOneCookBookingRequestRequest | CreateOneMenuBookingRequestRequest;
