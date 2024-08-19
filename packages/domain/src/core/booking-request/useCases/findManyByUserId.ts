import { Authorization } from '../../..';
import { type DBBookingRequest } from '../../../data-source';
import packLocation from '../../packLocation';
import { type Runtime } from '../../Runtime';
import { type FindManyRequest, type NanoId } from '../../shared';
import { type BookingRequest } from '../BookingRequest';
import { toBookingRequestStatus } from './toBookingRequestStatus';

export interface FindManyBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: FindManyRequest & { userId: NanoId };
}

export async function findManyByUserId({ runtime, context, request }: FindManyBookingRequestInput): Promise<BookingRequest[] | undefined> {
    const { dataSourceAdapter, logger } = runtime;
    const { userId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequests: DBBookingRequest[] | undefined = await dataSourceAdapter.bookingRequestRepository.findMany({
        userId,
    });

    if (!bookingRequests) return;

    bookingRequests.sort((a: DBBookingRequest, b: DBBookingRequest) => b.createdAt.getTime() - a.createdAt.getTime());

    return (
        bookingRequests
            .map((bookingRequest: DBBookingRequest) => ({
                ...bookingRequest,
                status: toBookingRequestStatus(bookingRequest),
                travelExpenses: { amount: bookingRequest.travelExpensesAmount, currencyCode: bookingRequest.currencyCode },
                totalPriceCustomer: { amount: bookingRequest.totalAmountUser, currencyCode: bookingRequest.currencyCode },
                totalPriceCook: { amount: bookingRequest.totalAmountCook, currencyCode: bookingRequest.currencyCode },
            }))
            // context: global booking requests matched in the administration don't have a setupIntentId, yet we want them to be displayed to
            // the customers in their bookings, so it is okay that confirmed is not true yet
            .filter((bookingRequest: any) => bookingRequest.paymentData.confirmed || bookingRequest.paymentData.setupIntentId === '')
            .map(packLocation)
    );
}
