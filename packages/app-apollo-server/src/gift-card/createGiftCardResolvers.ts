import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLCreateOneGiftCardResponse,
    type GQLGiftCardMutation,
    type GQLGiftCardMutationConfirmOneArgs,
    type GQLGiftCardMutationCreateOneArgs,
} from '../generated';
import { type Resolvers } from '../Resolvers';

// 'GiftCardQuery'

export function createGiftCardResolvers(service: Service): Resolvers<'GiftCardMutation' | 'CreateOneGiftCardResponse'> {
    return {
        GiftCardMutation: {
            createOne: async (
                _parent: GQLGiftCardMutation,
                { request }: GQLGiftCardMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<GQLCreateOneGiftCardResponse> => service.giftCard.createOne(context, request),
            confirmOne: async (
                _parent: GQLGiftCardMutation,
                { giftCardId }: GQLGiftCardMutationConfirmOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.giftCard.confirmOne(context, { giftCardId }),
        },
        // GiftCardQuery: {
        //     findAll: async (
        //         _parent: GQLGiftCardQuery,
        //         _options: unknown,
        //         context: Authorization.Context,
        //     ): Promise<GQLGiftCardPromoCode[]> => service.giftCard.findMany(context, {}) as any,
        //     findOne: async (
        //         _parent: GQLGiftCardQuery,
        //         { redeemCode }: GQLGiftCardQueryFindOneArgs,
        //         context: Authorization.Context,
        //     ): Promise<GQLGiftCardPromoCode | undefined> => service.giftCard.findOne(context, { giftCardPromoCodeId }) as any,
        // },
        CreateOneGiftCardResponse: {
            __resolveType: (obj: GQLCreateOneGiftCardResponse): 'CreateOneGiftCardSuccessResponse' | 'CreateOneGiftCardFailedResponse' => {
                if ('stripeClientSecret' in obj) return 'CreateOneGiftCardSuccessResponse';
                return 'CreateOneGiftCardFailedResponse';
            },
        },
    };
}
