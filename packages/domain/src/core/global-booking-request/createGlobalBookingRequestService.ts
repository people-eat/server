import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type FindManyRequest, type NanoId } from '../shared';
import { type CreateOneGlobalBookingRequestRequest } from './CreateOneGlobalBookingRequestRequest';
import { type GlobalBookingRequest } from './GlobalBookingRequest';
import { createOne } from './useCases/createOne';
import { deleteOne } from './useCases/deleteOne';
import { findMany } from './useCases/findMany';
import { findManyByCookId } from './useCases/findManyByCookId';
import { findManyByUserId } from './useCases/findManyByUserId';
import { findOne } from './useCases/findOne';

export interface GlobalBookingRequestService {
    findOne(context: Authorization.Context, request: { globalBookingRequestId: NanoId }): Promise<GlobalBookingRequest | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<GlobalBookingRequest[] | undefined>;
    findManyByCookId(
        context: Authorization.Context,
        request: FindManyRequest & { cookId: NanoId },
    ): Promise<GlobalBookingRequest[] | undefined>;
    findManyByUserId(
        context: Authorization.Context,
        request: FindManyRequest & { userId: NanoId },
    ): Promise<GlobalBookingRequest[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneGlobalBookingRequestRequest & { userId: NanoId }): Promise<boolean>;
    deleteOne(context: Authorization.Context, request: { userId: NanoId; globalBookingRequestId: NanoId }): Promise<boolean>;
}

export function createGlobalBookingRequestService(runtime: Runtime): GlobalBookingRequestService {
    return {
        findOne: (context: Authorization.Context, request: { globalBookingRequestId: NanoId }) => findOne({ runtime, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ runtime, context, request }),
        findManyByCookId: (context: Authorization.Context, request: FindManyRequest & { cookId: NanoId }) =>
            findManyByCookId({ runtime, context, request }),
        findManyByUserId: (context: Authorization.Context, request: FindManyRequest & { userId: NanoId }) =>
            findManyByUserId({ runtime, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneGlobalBookingRequestRequest & { userId: NanoId }) =>
            createOne({ runtime, context, request }),
        deleteOne: (context: Authorization.Context, request: { userId: NanoId; globalBookingRequestId: NanoId }) =>
            deleteOne({ runtime, context, request }),
    };
}
