import { type Authorization, type Service } from '@people-eat/server-domain';
import { type GQLAdminMetricCount, type GQLAdminMetricCountTotalSinceArgs } from '../generated';
import { type Resolvers } from '../Resolvers';

export function createMetricResolvers({ adminMetricService }: Service): Resolvers<'Admin' | 'AdminMetric' | 'AdminMetricCount'> {
    return {
        Admin: {
            metrics: () => ({} as any),
        },
        AdminMetric: {
            count: () => ({} as any),
        },
        AdminMetricCount: {
            totalSince: async (
                _parent: GQLAdminMetricCount,
                request: GQLAdminMetricCountTotalSinceArgs,
                _context: Authorization.Context,
            ): Promise<number> => adminMetricService.resolveMetricCountTotalSince(request),
            totalIn: async (
                _parent: GQLAdminMetricCount,
                request: GQLAdminMetricCountTotalSinceArgs,
                _context: Authorization.Context,
            ): Promise<number> => adminMetricService.resolveMetricCountTotalIn(request),
        },
    };
}
