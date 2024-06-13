import { type Authorization, type Service } from '@people-eat/server-domain';
import { type GQLCookVisitMutation, type GQLCookVisitMutationCreateOneArgs } from '../generated';
import { type Resolvers } from '../Resolvers';

export function createCookVisitResolvers(
    service: Service,
): Resolvers<'CookVisit' | 'UserCookVisitQuery' | 'CookCookVisitQuery' | 'CookVisitMutation'> {
    return {
        CookCookVisitQuery: {},
        CookVisit: {},
        UserCookVisitQuery: {},
        CookVisitMutation: {
            createOne: async (
                _parent: GQLCookVisitMutation,
                { cookId }: GQLCookVisitMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cookVisitService.createOne(context, { cookId }),
        },
    };
}
