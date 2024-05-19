import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLAdminGiftCardPromoCodeMutation,
    type GQLAdminGiftCardPromoCodeMutationCreateOneArgs,
    type GQLAdminGiftCardPromoCodeMutationDeleteOneArgs,
    type GQLAdminGiftCardPromoCodeQuery,
    type GQLGiftCardPromoCode,
    type GQLGiftCardPromoCodeQuery,
    type GQLGiftCardPromoCodeQueryFindOneArgs,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createGiftCardPromoCodeResolvers(
    service: Service,
): Resolvers<'GiftCardPromoCodeQuery' | 'AdminGiftCardPromoCodeMutation' | 'AdminGiftCardPromoCodeQuery'> {
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
        },
        AdminGiftCardPromoCodeQuery: {
            findMany: async (
                _parent: GQLAdminGiftCardPromoCodeQuery,
                _options: unknown,
                context: Authorization.Context,
            ): Promise<GQLGiftCardPromoCode[]> => service.giftCardPromoCode.findMany(context, {}) as any,
        },
        GiftCardPromoCodeQuery: {
            findOne: async (
                _parent: GQLGiftCardPromoCodeQuery,
                { giftCardPromoCodeId }: GQLGiftCardPromoCodeQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLGiftCardPromoCode | undefined> => service.giftCardPromoCode.findOne(context, { giftCardPromoCodeId }) as any,
        },
    };
}
