import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLAdminFeatureToggleMutation,
    type GQLAdminFeatureToggleMutationCreateOneArgs,
    type GQLAdminFeatureToggleMutationUpdateOneArgs,
    type GQLAdminFeatureToggleQuery,
    type GQLAdminFeatureToggleQueryFindManyArgs,
    type GQLFeatureToggle,
} from '../generated';
import { type Resolvers } from '../Resolvers';

// type FeatureToggleR = Omit<GQLFeatureToggle, 'admin'>; @resolved for on graph

export function createFeatureToggleResolvers(
    service: Service,
): Resolvers<'FeatureToggle' | 'AdminFeatureToggleQuery' | 'AdminFeatureToggleMutation'> {
    return {
        FeatureToggle: {
            // admin:
        },
        AdminFeatureToggleMutation: {
            createOne: async (
                _parent: GQLAdminFeatureToggleMutation,
                { request }: GQLAdminFeatureToggleMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.featureToggle.createOne(context, request),
            updateOne: async (
                _parent: GQLAdminFeatureToggleMutation,
                request: GQLAdminFeatureToggleMutationUpdateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.featureToggle.updateOne(context, request),
        },
        AdminFeatureToggleQuery: {
            findMany: async (
                _parent: GQLAdminFeatureToggleQuery,
                { keys }: GQLAdminFeatureToggleQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLFeatureToggle[]> => ((await service.featureToggle.findMany(context, { keys })) as any) ?? [],
        },
    };
}
