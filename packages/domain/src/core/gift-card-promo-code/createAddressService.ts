import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type FindManyRequest, type NanoId } from '../shared';
import { type CreateOneGiftCardPromoCodeRequest } from './CreateOneGiftCardPromoCodeRequest';
import { type GiftCardPromoCode } from './GiftCardPromoCode';
import { createOne } from './useCases/createOne';
import { deleteOne } from './useCases/deleteOne';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';

export interface GiftCardPromoCodeService {
    findOne(context: Authorization.Context, request: { giftCardPromoCodeId: NanoId }): Promise<GiftCardPromoCode | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<GiftCardPromoCode[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneGiftCardPromoCodeRequest): Promise<boolean>;
    deleteOne(context: Authorization.Context, request: { giftCardPromoCodeId: NanoId }): Promise<boolean>;
}

export function createGiftCardPromoCodeService(runtime: Runtime): GiftCardPromoCodeService {
    return {
        findOne: (context: Authorization.Context, request: { giftCardPromoCodeId: NanoId }) => findOne({ runtime, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ runtime, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneGiftCardPromoCodeRequest) => createOne({ runtime, context, request }),
        deleteOne: (context: Authorization.Context, request: { giftCardPromoCodeId: NanoId }) => deleteOne({ runtime, context, request }),
    };
}
