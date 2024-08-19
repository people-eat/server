import { type BookingRequest } from '../../core/booking-request/BookingRequest';
import { type CurrencyCode } from '../../core/shared';

export interface DBBookingRequest
    extends Omit<BookingRequest, 'location' | 'totalPriceCook' | 'totalPriceCustomer' | 'status' | 'travelExpenses'> {
    latitude: number;
    longitude: number;
    locationText: string;

    totalAmountUser: number;
    totalAmountCook: number;
    travelExpensesAmount: number;
    currencyCode: CurrencyCode;
}
