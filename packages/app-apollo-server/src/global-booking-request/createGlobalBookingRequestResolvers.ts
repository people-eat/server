import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLCookGlobalBookingRequestQuery,
    type GQLGlobalBookingRequest,
    type GQLGlobalBookingRequestQuery,
    type GQLGlobalBookingRequestQueryFindOneArgs,
    type GQLPublicUser,
    type GQLUserGlobalBookingRequestMutation,
    type GQLUserGlobalBookingRequestMutationCreateOneArgs,
    type GQLUserGlobalBookingRequestQuery,
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
            user: async ({ userId }: GQLGlobalBookingRequest, _: unknown, context: Authorization.Context): Promise<GQLPublicUser> =>
                service.user.findOneByUserId(context, { userId }) as any,
        },
        CookGlobalBookingRequestQuery: {
            findMany: async (
                { cookId }: GQLCookGlobalBookingRequestQuery,
                _: unknown,
                context: Authorization.Context,
            ): Promise<GQLGlobalBookingRequest[] | undefined> => service.globalBookingRequest.findManyByCookId(context, { cookId }) as any,
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
