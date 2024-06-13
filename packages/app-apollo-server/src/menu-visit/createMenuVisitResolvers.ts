import { type Authorization, type Service } from '@people-eat/server-domain';
import { type GQLMenuVisitMutation, type GQLMenuVisitMutationCreateOneArgs } from '../generated';
import { type Resolvers } from '../Resolvers';

export function createMenuVisitResolvers(
    service: Service,
): Resolvers<'CookVisit' | 'UserCookVisitQuery' | 'CookCookVisitQuery' | 'MenuVisitMutation'> {
    return {
        CookCookVisitQuery: {},
        CookVisit: {},
        UserCookVisitQuery: {},
        MenuVisitMutation: {
            createOne: async (
                _parent: GQLMenuVisitMutation,
                { menuId }: GQLMenuVisitMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.menuVisitService.createOne(context, { menuId }),
        },
    };
}
