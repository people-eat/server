import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLSession,
    type GQLSessionMutation,
    type GQLSessionMutationAssignOneArgs,
    type GQLSessionMutationAssignOneByEmailAddressArgs,
    type GQLSessionMutationAssignOneByIdentityProviderArgs,
    type GQLSessionMutationAssignOneByPhoneNumberArgs,
    type GQLSessionMutationUpdateCookieSettingsArgs,
    type GQLSessionQuery,
    type GQLUser,
    type GQLUserSessionMutation,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createSessionResolvers(
    service: Service,
): Resolvers<'Session' | 'SessionQuery' | 'SessionMutation' | 'UserSessionQuery' | 'UserSessionMutation'> {
    return {
        Session: {
            user: async ({ userId }: GQLSession, _input: unknown, context: Authorization.Context): Promise<GQLUser> =>
                userId ? (service.user.findOneByUserId(context, { userId }) as any) : undefined,
        },
        SessionQuery: {
            current: async (_parent: GQLSessionQuery, _input: unknown, context: Authorization.Context): Promise<GQLSession> =>
                service.session.findCurrent(context),
        },
        SessionMutation: {
            assignOneByEmailAddress: async (
                _parent: GQLSessionMutation,
                { request }: GQLSessionMutationAssignOneByEmailAddressArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.session.assignOneByEmailAddress(context, request),

            assignOneByPhoneNumber: async (
                _parent: GQLSessionMutation,
                { request }: GQLSessionMutationAssignOneByPhoneNumberArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.session.assignOneByPhoneNumber(context, request),

            assignOneByIdentityProvider: async (
                _parent: GQLSessionMutation,
                { request }: GQLSessionMutationAssignOneByIdentityProviderArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.session.assignOneByIdentityProvider(context, request),

            assignOne: async (
                _parent: GQLSessionMutation,
                { userId }: GQLSessionMutationAssignOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.session.assignOne(context, { userId }),

            updateCookieSettings: async (
                _parent: GQLSessionMutation,
                { request }: GQLSessionMutationUpdateCookieSettingsArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.session.updateCookieSettings(context, request),
        },
        UserSessionMutation: {
            expireCurrent: async ({ userId }: GQLUserSessionMutation, _: unknown, context: Authorization.Context): Promise<boolean> =>
                service.session.expireOne(context, { sessionId: context.sessionId, userId }),
        },
        UserSessionQuery: {},
    };
}
