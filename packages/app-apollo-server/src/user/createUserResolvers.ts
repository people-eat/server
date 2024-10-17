import { type Address, type Admin, type Authorization, type Cook, type Service } from '@people-eat/server-domain';
import {
    type GQLCreateOneUserResult,
    type GQLFollowing,
    type GQLUser,
    type GQLUserMutation,
    type GQLUserMutationAddressesArgs,
    type GQLUserMutationBookingRequestsArgs,
    type GQLUserMutationCreateOneArgs,
    type GQLUserMutationCreateOneByEmailAddressArgs,
    type GQLUserMutationCreateOneByIdentityProviderArgs,
    type GQLUserMutationCreateOneByPhoneNumberArgs,
    type GQLUserMutationEmailAddressUpdateArgs,
    type GQLUserMutationGlobalBookingRequestsArgs,
    type GQLUserMutationPhoneNumberUpdateArgs,
    type GQLUserMutationSessionsArgs,
    type GQLUserMutationSupportRequestsArgs,
    type GQLUserMutationUpdateGenderArgs,
    type GQLUserMutationUpdatePasswordArgs,
    type GQLUserMutationUpdateProfilePictureArgs,
    type GQLUserQuery,
    type GQLUserQueryBookingRequestsArgs,
    type GQLUserQueryEmailAddressUpdateArgs,
    type GQLUserQueryFindManyArgs,
    type GQLUserQueryFindOneArgs,
    type GQLUserQueryGlobalBookingRequestsArgs,
    type GQLUserQueryPhoneNumberUpdateArgs,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createUserResolvers(service: Service): Resolvers<'User' | 'UserMutation' | 'UserQuery'> {
    return {
        User: {
            admin: ({ userId }: GQLUser, _input: unknown, context: Authorization.Context) =>
                service.admin.findOne(context, { adminId: userId }) as any,
            isAdmin: async ({ userId }: GQLUser, _input: unknown, context: Authorization.Context): Promise<boolean> => {
                const admin: Admin | undefined = await service.admin.findOne(context, { adminId: userId });
                return Boolean(admin);
            },
            cook: ({ userId }: GQLUser, _input: unknown, context: Authorization.Context) => service.cook.findOne(context, userId) as any,
            isCook: async ({ userId }: GQLUser, _input: unknown, context: Authorization.Context): Promise<boolean> => {
                const cook: Cook | undefined = await service.cook.findOne(context, userId);
                return Boolean(cook);
            },
            addresses: ({ userId }: GQLUser, _input: unknown, context: Authorization.Context) =>
                service.address.findMany(context, { userId }) as any,
            addressCount: async ({ userId }: GQLUser, _input: unknown, context: Authorization.Context): Promise<number> => {
                const addresses: Address[] | undefined = await service.address.findMany(context, { userId });
                return addresses?.length ?? 0;
            },
            emailAddressUpdate: ({ userId }: GQLUser, _input: unknown, context: Authorization.Context) =>
                service.emailAddressUpdate.findOneByUserId(context, { userId }),
            phoneNumberUpdate: ({ userId }: GQLUser, _input: unknown, context: Authorization.Context) =>
                service.phoneNumberUpdate.findOneByUserId(context, { userId }),

            followings: ({ userId }: GQLUser, _input: unknown, context: Authorization.Context) =>
                service.favoriteCook.findManyByUserId(context, { userId }) as unknown as GQLFollowing[],
        },
        UserMutation: {
            createOneByEmailAddress: async (
                _parent: GQLUserMutation,
                { request, profilePicture }: GQLUserMutationCreateOneByEmailAddressArgs,
                context: Authorization.Context,
            ): Promise<boolean> =>
                service.user.createOneByEmailAddress(context, {
                    ...request,
                    profilePicture: profilePicture && (await profilePicture).createReadStream(),
                }),

            createOne: async (
                _parent: GQLUserMutation,
                { request, profilePicture }: GQLUserMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<GQLCreateOneUserResult> =>
                service.user.createOne(context, {
                    ...request,
                    profilePicture: profilePicture && (await profilePicture).createReadStream(),
                }),

            createOneByPhoneNumber: async (
                _parent: GQLUserMutation,
                { request }: GQLUserMutationCreateOneByPhoneNumberArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.user.createOneByPhoneNumber(context, request),

            createOneByIdentityProvider: async (
                _parent: GQLUserMutation,
                { request }: GQLUserMutationCreateOneByIdentityProviderArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.user.createOneByIdentityProvider(context, request),

            updatePassword: async (
                _parent: GQLUserMutation,
                request: GQLUserMutationUpdatePasswordArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.user.updatePassword(context, request),

            updateGender: async (
                _parent: GQLUserMutation,
                request: GQLUserMutationUpdateGenderArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.user.updateGender(context, request),

            updateProfilePicture: async (
                _parent: GQLUserMutation,
                { userId, profilePicture }: GQLUserMutationUpdateProfilePictureArgs,
                context: Authorization.Context,
            ): Promise<boolean> =>
                service.user.updateProfilePicture(context, {
                    userId,
                    profilePicture: profilePicture && (await profilePicture).createReadStream(),
                }),

            sessions: (_parent: GQLUserMutation, { userId }: GQLUserMutationSessionsArgs) => ({ userId } as any),
            phoneNumberUpdate: (_parent: GQLUserMutation, { userId }: GQLUserMutationPhoneNumberUpdateArgs) => ({ userId } as any),
            emailAddressUpdate: (_parent: GQLUserMutation, { userId }: GQLUserMutationEmailAddressUpdateArgs) => ({ userId } as any),
            addresses: (_parent: GQLUserMutation, { userId }: GQLUserMutationAddressesArgs) => ({ userId } as any),
            globalBookingRequests: (_parent: GQLUserMutation, { userId }: GQLUserMutationGlobalBookingRequestsArgs) => ({ userId } as any),
            bookingRequests: (_parent: GQLUserMutation, { userId }: GQLUserMutationBookingRequestsArgs) => ({ userId } as any),
            followings: (_parent: GQLUserMutation, { userId }: GQLUserMutationBookingRequestsArgs) => ({ userId } as any),
            oneTimeAccessToken: () => ({} as any),
            supportRequests: (_parent: GQLUserMutation, { userId }: GQLUserMutationSupportRequestsArgs) => ({ userId } as any),
        },
        UserQuery: {
            findMany: async (
                _parent: GQLUserQuery,
                { request }: GQLUserQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLUser[] | undefined> => service.user.findMany(context, request) as any,

            findOne: async (
                _parent: GQLUserQuery,
                { userId }: GQLUserQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLUser | undefined> => service.user.findOneByUserId(context, { userId }) as any,

            // me: async (_parent: GQLUserQuery, _input: unknown, context: Authorization.Context): Promise<GQLUser | undefined> => {
            //     const { userId } = context;

            //     if (!userId) return undefined;

            //     return service.user.findOneByUserId(context, { userId }) as any;
            // },

            phoneNumberUpdate: (_parent: GQLUserQuery, { userId }: GQLUserQueryPhoneNumberUpdateArgs) => ({ userId } as any),
            emailAddressUpdate: (_parent: GQLUserQuery, { userId }: GQLUserQueryEmailAddressUpdateArgs) => ({ userId } as any),
            addresses: () => ({} as any),
            globalBookingRequests: (_parent: GQLUserQuery, { userId }: GQLUserQueryGlobalBookingRequestsArgs) => ({ userId } as any),
            bookingRequests: (_parent: GQLUserQuery, { userId }: GQLUserQueryBookingRequestsArgs) => ({ userId } as any),
            followings: (_parent: GQLUserQuery, { userId }: GQLUserQueryBookingRequestsArgs) => ({ userId } as any),
        },
    };
}
