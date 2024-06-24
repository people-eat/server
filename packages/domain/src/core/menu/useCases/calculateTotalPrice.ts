import { geoDistance } from '../../../utils/geoDistance';
import { calculateMenuPrice } from '../../calculateMenuPrice';
import { type CurrencyCode, type Location, type Price } from '../../shared';

export interface CalculateTotalMenuPriceInput {
    // runtime: Runtime;
    // context: Authorization.Context;
    request: {
        eventLocation?: Location;
        cookLocation: Location;
        cookTravelExpenses: number;

        adults: number;
        children: number;

        basePrice: number;
        basePriceCustomers: number;
        pricePerAdult: number;
        pricePerChild?: number;
        currencyCode: CurrencyCode;
    };
}

export async function calculateTotalPrice({ request }: CalculateTotalMenuPriceInput): Promise<Price> {
    const {
        eventLocation,
        cookLocation,
        cookTravelExpenses,
        adults,
        children,
        basePrice,
        basePriceCustomers,
        pricePerAdult,
        pricePerChild,
        currencyCode,
    } = request;

    const distance: number | undefined = eventLocation && geoDistance({ location1: eventLocation, location2: cookLocation });

    const travelExpenses: number | undefined = distance && distance * cookTravelExpenses * 2;

    const menuPrice: number = calculateMenuPrice(adults, children, basePrice, basePriceCustomers, pricePerAdult, pricePerChild);

    const customerFee: number = menuPrice * 0.04;
    const stripeTransactionPrice: number = menuPrice + (travelExpenses ?? 0) + customerFee;
    const amount: number = (stripeTransactionPrice + 25) / (1 - 0.015);

    return {
        currencyCode,
        amount,
    };
}
