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
    request: FindManyRequest & { cookId: NanoId };
}

export async function findManyByCookId({ runtime, context, request }: FindManyBookingRequestInput): Promise<BookingRequest[] | undefined> {
    const { dataSourceAdapter, logger } = runtime;
    const { cookId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const bookingRequests: DBBookingRequest[] | undefined = await dataSourceAdapter.bookingRequestRepository.findMany({ cookId });

    if (!bookingRequests) return;

    bookingRequests.sort((a: DBBookingRequest, b: DBBookingRequest) => b.createdAt.getTime() - a.createdAt.getTime());

    // .filter((bookingRequest: DBBookingRequest) => bookingRequest.paymentData.confirmed)
    return bookingRequests
        .map((bookingRequest: DBBookingRequest) => ({
            ...bookingRequest,
            status: toBookingRequestStatus(bookingRequest),
            price: { amount: bookingRequest.totalAmountUser, currencyCode: bookingRequest.currencyCode },
        }))
        .map(packLocation);
}
