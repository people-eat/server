import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLEmailAddressUpdate,
    type GQLUserEmailAddressUpdateMutation,
    type GQLUserEmailAddressUpdateMutationConfirmArgs,
    type GQLUserEmailAddressUpdateMutationConfirmationResult,
    type GQLUserEmailAddressUpdateMutationConfirmationSuccessResult,
    type GQLUserEmailAddressUpdateMutationCreateOneArgs,
    type GQLUserEmailAddressUpdateQuery,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createEmailAddressUpdateResolvers(
    service: Service,
): Resolvers<
    | 'EmailAddressUpdate'
    | 'UserEmailAddressUpdateMutation'
    | 'UserEmailAddressUpdateQuery'
    | 'UserEmailAddressUpdateMutationConfirmationResult'
    | 'UserEmailAddressUpdateMutationConfirmationSuccessResult'
> {
    return {
        EmailAddressUpdate: {},
        UserEmailAddressUpdateMutation: {
            createOne: async (
                { userId }: GQLUserEmailAddressUpdateMutation,
                { emailAddress }: GQLUserEmailAddressUpdateMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.emailAddressUpdate.createOne(context, { userId, emailAddress }),
            confirm: async (
                _parent: GQLUserEmailAddressUpdateMutation,
                { secret }: GQLUserEmailAddressUpdateMutationConfirmArgs,
                context: Authorization.Context,
            ): Promise<GQLUserEmailAddressUpdateMutationConfirmationResult> => service.emailAddressUpdate.confirmOne(context, { secret }),
        },
        UserEmailAddressUpdateQuery: {
            findOne: async (
                { userId }: GQLUserEmailAddressUpdateQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLEmailAddressUpdate | undefined> => service.emailAddressUpdate.findOneByUserId(context, { userId }),
        },
        UserEmailAddressUpdateMutationConfirmationResult: {
            __resolveType: (
                obj: GQLUserEmailAddressUpdateMutationConfirmationResult,
            ): 'UserEmailAddressUpdateMutationConfirmationSuccessResult' | 'UserEmailAddressUpdateMutationConfirmationFailedResult' => {
                return obj.success
                    ? 'UserEmailAddressUpdateMutationConfirmationSuccessResult'
                    : 'UserEmailAddressUpdateMutationConfirmationFailedResult';
            },
        },
        UserEmailAddressUpdateMutationConfirmationSuccessResult: {
            user: (_parent: GQLUserEmailAddressUpdateMutationConfirmationSuccessResult, _input: unknown, context: Authorization.Context) =>
                context.userId && (service.user.findOneByUserId(context, { userId: context.userId }) as any),
        },
    };
}
