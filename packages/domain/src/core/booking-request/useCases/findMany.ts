import { Authorization } from '../../..';
import { type DBBookingRequest } from '../../../data-source';
import packLocation from '../../packLocation';
import { type Runtime } from '../../Runtime';
import { type FindManyRequest } from '../../shared';
import { type BookingRequest } from '../BookingRequest';
import { toBookingRequestStatus } from './toBookingRequestStatus';

export interface FindManyBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ runtime, context }: FindManyBookingRequestInput): Promise<BookingRequest[] | undefined> {
    const { dataSourceAdapter, logger } = runtime;
    await Authorization.isAdmin({ dataSourceAdapter, logger, context });

    const bookingRequests: DBBookingRequest[] | undefined = await dataSourceAdapter.bookingRequestRepository.findMany({});

    if (!bookingRequests) return;

    bookingRequests.sort((a: DBBookingRequest, b: DBBookingRequest) => b.createdAt.getTime() - a.createdAt.getTime());

    return bookingRequests
        .map((bookingRequest: DBBookingRequest) => ({
            ...bookingRequest,
            status: toBookingRequestStatus(bookingRequest),
            price: { amount: bookingRequest.totalAmountUser, currencyCode: bookingRequest.currencyCode },
            travelExpenses: { amount: bookingRequest.travelExpensesAmount, currencyCode: bookingRequest.currencyCode },
            totalPriceCustomer: { amount: bookingRequest.totalAmountUser, currencyCode: bookingRequest.currencyCode },
            totalPriceCook: { amount: bookingRequest.totalAmountCook, currencyCode: bookingRequest.currencyCode },
        }))
        .map(packLocation);
}
// amount: bookingRequest.totalAmountUser, currencyCode: bookingRequest.currencyCode
