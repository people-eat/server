import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type FindManyRequest, type NanoId } from '../shared';
import { type CreateOneGiftCardRequest } from './CreateOneGiftCardRequest';
import { type GiftCard } from './GiftCard';
import { confirmOne } from './useCases/confirmOne';
import { createOne } from './useCases/createOne';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';

export interface GiftCardService {
    findOne(context: Authorization.Context, request: { giftCardPromoCodeId: NanoId }): Promise<GiftCard | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<GiftCard[] | undefined>;
    createOne(
        context: Authorization.Context,
        request: CreateOneGiftCardRequest,
    ): Promise<{ stripeClientSecret: string; giftCardId: NanoId } | { failed: boolean }>;
    confirmOne(context: Authorization.Context, request: { giftCardId: NanoId }): Promise<boolean>;
}

export function createGiftCardService(runtime: Runtime): GiftCardService {
    return {
        findOne: (context: Authorization.Context, request: { giftCardPromoCodeId: NanoId }) => findOne({ runtime, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ runtime, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneGiftCardRequest) => createOne({ runtime, context, request }),
        confirmOne: (context: Authorization.Context, request: { giftCardId: NanoId }) => confirmOne({ runtime, context, request }),
    };
}
