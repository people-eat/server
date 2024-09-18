import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLAdminGiftCardPromoCodeMutation,
    type GQLAdminGiftCardPromoCodeMutationCreateOneArgs,
    type GQLAdminGiftCardPromoCodeMutationDeleteOneArgs,
    type GQLAdminGiftCardPromoCodeMutationUpdateOneArgs,
    type GQLAdminGiftCardPromoCodeQuery,
    type GQLCouponCode,
    type GQLCouponCodeQueryFindOneArgs,
    type GQLGiftCardPromoCode,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createGiftCardPromoCodeResolvers(
    service: Service,
): Resolvers<'CouponCodeQuery' | 'AdminGiftCardPromoCodeMutation' | 'AdminGiftCardPromoCodeQuery' | 'CouponCode'> {
    return {
        AdminGiftCardPromoCodeMutation: {
            createOne: async (
                _parent: GQLAdminGiftCardPromoCodeMutation,
                { giftCardPromoCode }: GQLAdminGiftCardPromoCodeMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.giftCardPromoCode.createOne(context, { ...giftCardPromoCode }),
            deleteOne: async (
                _parent: GQLAdminGiftCardPromoCodeMutation,
                { giftCardPromoCodeId }: GQLAdminGiftCardPromoCodeMutationDeleteOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.giftCardPromoCode.deleteOne(context, { giftCardPromoCodeId }),
            updateOne: async (
                _parent: GQLAdminGiftCardPromoCodeMutation,
                { giftCardPromoCodeId, giftCardPromoCode }: GQLAdminGiftCardPromoCodeMutationUpdateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.giftCardPromoCode.updateOne(context, { giftCardPromoCodeId, ...giftCardPromoCode }),
        },
        AdminGiftCardPromoCodeQuery: {
            findMany: async (
                _parent: GQLAdminGiftCardPromoCodeQuery,
                _options: unknown,
                context: Authorization.Context,
            ): Promise<GQLGiftCardPromoCode[]> => service.giftCardPromoCode.findMany(context, {}) as any,
        },
        CouponCodeQuery: {
            findOne: async (
                _parent: any,
                { couponCodeId }: GQLCouponCodeQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLCouponCode | undefined> => service.couponCode.findOne(context, { couponCodeId }) as any,
        },
        CouponCode: {
            __resolveType: (obj: GQLCouponCode): 'GiftCardPromoCode' | 'GiftCard' => {
                console.log(obj);
                if ('giftCardPromoCodeId' in obj) return 'GiftCardPromoCode';
                return 'GiftCard';
            },
        },
    };
}
