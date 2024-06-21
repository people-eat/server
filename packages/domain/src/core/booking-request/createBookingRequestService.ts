import { type Authorization } from '../..';
import { type CreateOneConfiguredMenuRequest } from '../configured-menu';
import { type Runtime } from '../Runtime';
import { type FindManyRequest, type NanoId, type Price } from '../shared';
import { type BookingRequest } from './BookingRequest';
import { type CreateOneBookingRequestRequest } from './CreateOneBookingRequestRequest';
import { acceptOneByCookId } from './useCases/acceptOneByCookId';
import { acceptOneByUserId } from './useCases/acceptOneByUserId';
import { confirmPaymentSetup } from './useCases/confirmPaymentSetup';
import { createOne } from './useCases/createOne';
import { createOneByGlobalBookingRequestId } from './useCases/createOneByGlobalBookingRequestId';
import { declineOneByCookId } from './useCases/declineOneByCookId';
import { declineOneByUserId } from './useCases/declineOneByUserId';
import { findMany } from './useCases/findMany';
import { findManyByCookId } from './useCases/findManyByCookId';
import { findManyByUserId } from './useCases/findManyByUserId';
import { findOne } from './useCases/findOne';
import { findOneByCookId } from './useCases/findOneByCookId';
import { findOneByUserId } from './useCases/findOneByUserId';
import { unlockPayment } from './useCases/unlockPayment';
import { updatePriceByCookId } from './useCases/updatePriceByCookId';
import { updatePriceByUserId } from './useCases/updatePriceByUserId';

export interface BookingRequestService {
    findOne(context: Authorization.Context, request: { bookingRequestId: NanoId }): Promise<BookingRequest | undefined>;
    findOneByCookId(
        context: Authorization.Context,
        request: { cookId: NanoId; bookingRequestId: NanoId },
    ): Promise<BookingRequest | undefined>;
    findOneByUserId(
        context: Authorization.Context,
        request: { userId: NanoId; bookingRequestId: NanoId },
    ): Promise<BookingRequest | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<BookingRequest[] | undefined>;
    findManyByCookId(context: Authorization.Context, request: FindManyRequest & { cookId: NanoId }): Promise<BookingRequest[] | undefined>;
    findManyByUserId(context: Authorization.Context, request: FindManyRequest & { userId: NanoId }): Promise<BookingRequest[] | undefined>;
    createOne(
        context: Authorization.Context,
        request: CreateOneBookingRequestRequest & { userId: NanoId },
    ): Promise<{
        success: boolean;
        clientSecret: string;
        bookingRequestId: string;
    }>;
    createOneByGlobalBookingRequestId(
        context: Authorization.Context,
        request: { cookId: NanoId; globalBookingRequestId: NanoId; configuredMenu?: CreateOneConfiguredMenuRequest; price?: Price },
    ): Promise<boolean>;
    acceptOneByCookId(context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }): Promise<boolean>;
    declineOneByCookId(context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }): Promise<boolean>;
    acceptOneByUserId(context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }): Promise<boolean>;
    declineOneByUserId(context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }): Promise<boolean>;
    updatePriceByCookId(
        context: Authorization.Context,
        request: { cookId: NanoId; bookingRequestId: NanoId; price: Price },
    ): Promise<boolean>;
    updatePriceByUserId(
        context: Authorization.Context,
        request: { userId: NanoId; bookingRequestId: NanoId; price: Price },
    ): Promise<boolean>;
    confirmPaymentSetup(context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }): Promise<boolean>;
    unlockPayment(context: Authorization.Context, request: { bookingRequestId: NanoId }): Promise<boolean>;
}

export function createBookingRequestService(runtime: Runtime): BookingRequestService {
    return {
        findOne: (context: Authorization.Context, request: { bookingRequestId: NanoId }) => findOne({ runtime, context, request }),
        findOneByCookId: (context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }) =>
            findOneByCookId({ runtime, context, request }),
        findOneByUserId: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }) =>
            findOneByUserId({ runtime, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ runtime, context, request }),
        findManyByCookId: (context: Authorization.Context, request: FindManyRequest & { cookId: NanoId }) =>
            findManyByCookId({ runtime, context, request }),
        findManyByUserId: (context: Authorization.Context, request: FindManyRequest & { userId: NanoId }) =>
            findManyByUserId({ runtime, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneBookingRequestRequest & { userId: NanoId }) =>
            createOne({ runtime, context, request }),
        createOneByGlobalBookingRequestId: (
            context: Authorization.Context,
            request: {
                cookId: NanoId;
                globalBookingRequestId: NanoId;
                configuredMenu?: CreateOneConfiguredMenuRequest;
                price?: Price;
            },
        ) => createOneByGlobalBookingRequestId({ runtime, context, request }),
        acceptOneByCookId: (context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }) =>
            acceptOneByCookId({ runtime, context, request }),
        declineOneByCookId: (context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }) =>
            declineOneByCookId({ runtime, context, request }),
        acceptOneByUserId: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }) =>
            acceptOneByUserId({ runtime, context, request }),
        declineOneByUserId: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }) =>
            declineOneByUserId({ runtime, context, request }),
        updatePriceByCookId: (context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId; price: Price }) =>
            updatePriceByCookId({ runtime, context, request }),
        updatePriceByUserId: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId; price: Price }) =>
            updatePriceByUserId({ runtime, context, request }),
        confirmPaymentSetup: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }) =>
            confirmPaymentSetup({ runtime, context, request }),
        unlockPayment: (context: Authorization.Context, request: { bookingRequestId: NanoId }) =>
            unlockPayment({ runtime, context, request }),
    };
}
