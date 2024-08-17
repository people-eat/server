import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLCookGlobalBookingRequestQuery,
    type GQLCookGlobalBookingRequestQueryFindOneArgs,
    type GQLGlobalBookingRequest,
    type GQLGlobalBookingRequestPriceClass,
    type GQLGlobalBookingRequestQuery,
    type GQLGlobalBookingRequestQueryFindOneArgs,
    type GQLPublicUser,
    type GQLUser,
    type GQLUserGlobalBookingRequestMutation,
    type GQLUserGlobalBookingRequestMutationCreateOneArgs,
    type GQLUserGlobalBookingRequestQuery,
    type GQLUserGlobalBookingRequestQueryFindOneArgs,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createGlobalBookingRequestResolvers(
    service: Service,
): Resolvers<
    | 'GlobalBookingRequest'
    | 'CookGlobalBookingRequestQuery'
    | 'UserGlobalBookingRequestMutation'
    | 'UserGlobalBookingRequestQuery'
    | 'GlobalBookingRequestQuery'
> {
    return {
        GlobalBookingRequest: {
            publicUser: async ({ userId }: GQLGlobalBookingRequest, _: unknown, context: Authorization.Context): Promise<GQLPublicUser> =>
                service.publicUser.findOne(context, userId) as any,
            user: async ({ userId }: GQLGlobalBookingRequest, _: unknown, context: Authorization.Context): Promise<GQLUser> =>
                service.user.findOneByUserId(context, { userId }) as any,
            priceClass: ({ priceClassType }: GQLGlobalBookingRequest): GQLGlobalBookingRequestPriceClass => {
                switch (priceClassType) {
                    case 'SIMPLE':
                        return {
                            type: priceClassType,
                            min: 7000,
                            max: 9000,
                            currencyCode: 'EUR',
                        };
                    case 'FINE':
                        return {
                            type: priceClassType,
                            min: 9000,
                            max: 1500,
                            currencyCode: 'EUR',
                        };
                    case 'GOURMET':
                        return {
                            type: priceClassType,
                            min: 1500,
                            max: 0,
                            currencyCode: 'EUR',
                        };
                }
            },
        },
        CookGlobalBookingRequestQuery: {
            findMany: async (
                { cookId }: GQLCookGlobalBookingRequestQuery,
                _: unknown,
                context: Authorization.Context,
            ): Promise<GQLGlobalBookingRequest[] | undefined> => service.globalBookingRequest.findManyByCookId(context, { cookId }) as any,
            findOne: async (
                { cookId: _cookId }: GQLCookGlobalBookingRequestQuery,
                { globalBookingRequestId }: GQLCookGlobalBookingRequestQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLGlobalBookingRequest | undefined> =>
                service.globalBookingRequest.findOne(context, { globalBookingRequestId }) as any,
        },
        UserGlobalBookingRequestMutation: {
            createOne: async (
                { userId }: GQLUserGlobalBookingRequestMutation,
                { request }: GQLUserGlobalBookingRequestMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.globalBookingRequest.createOne(context, { userId, ...request }),
        },
        UserGlobalBookingRequestQuery: {
            findMany: async (
                { userId }: GQLUserGlobalBookingRequestQuery,
                _: unknown,
                context: Authorization.Context,
            ): Promise<GQLGlobalBookingRequest[] | undefined> => service.globalBookingRequest.findManyByUserId(context, { userId }) as any,
            findOne: async (
                { userId: _userId }: GQLUserGlobalBookingRequestQuery,
                { globalBookingRequestId }: GQLUserGlobalBookingRequestQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLGlobalBookingRequest | undefined> =>
                service.globalBookingRequest.findOne(context, { globalBookingRequestId }) as any,
        },
        GlobalBookingRequestQuery: {
            findMany: async (
                _parent: GQLGlobalBookingRequestQuery,
                _: unknown,
                context: Authorization.Context,
            ): Promise<GQLGlobalBookingRequest[] | undefined> => service.globalBookingRequest.findMany(context, {}) as any,
            findOne: async (
                _parent: GQLGlobalBookingRequestQuery,
                { globalBookingRequestId }: GQLGlobalBookingRequestQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLGlobalBookingRequest | undefined> =>
                service.globalBookingRequest.findOne(context, { globalBookingRequestId }) as any,
        },
    };
}
