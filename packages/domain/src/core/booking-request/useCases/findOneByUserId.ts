import { Authorization, type DataSource } from '../../..';
import packLocation from '../../packLocation';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type BookingRequest } from '../BookingRequest';
import { toBookingRequestStatus } from './toBookingRequestStatus';

export interface FindOneBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { userId: NanoId; bookingRequestId: NanoId };
}

export async function findOneByUserId({ runtime, context, request }: FindOneBookingRequestInput): Promise<BookingRequest | undefined> {
    const { dataSourceAdapter, logger } = runtime;
    const { bookingRequestId, userId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequest: DataSource.DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        bookingRequestId,
        userId,
    });

    if (!bookingRequest) return;

    return {
        ...packLocation(bookingRequest),
        status: toBookingRequestStatus(bookingRequest),
        travelExpenses: { amount: bookingRequest.travelExpensesAmount, currencyCode: bookingRequest.currencyCode },
        totalPriceCustomer: { amount: bookingRequest.totalAmountUser, currencyCode: bookingRequest.currencyCode },
        totalPriceCook: { amount: bookingRequest.totalAmountCook, currencyCode: bookingRequest.currencyCode },
    };
}
