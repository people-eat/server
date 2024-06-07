import { type Authorization } from '../..';
import { type GiftCard } from '../gift-card';
import { type GiftCardPromoCode } from '../gift-card-promo-code';
import { type Runtime } from '../Runtime';
import { type NanoId } from '../shared';
import { findOne } from './useCases/findOne';

export interface CouponCodeService {
    findOne(context: Authorization.Context, request: { couponCodeId: NanoId }): Promise<GiftCardPromoCode | GiftCard | undefined>;
}

export function createCouponCodeService(runtime: Runtime): CouponCodeService {
    return {
        findOne: (context: Authorization.Context, request: { couponCodeId: NanoId }) => findOne({ runtime, context, request }),
    };
}
