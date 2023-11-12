import { Authorization, type DataSource } from '../../..';
import packLocation from '../../packLocation';
import { type Runtime } from '../../Runtime';
import { type FindManyRequest } from '../../shared';
import { type GlobalBookingRequest } from '../GlobalBookingRequest';

export interface FindManyGlobalBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({
    runtime: { dataSourceAdapter, logger },
    context,
}: FindManyGlobalBookingRequestInput): Promise<GlobalBookingRequest[] | undefined> {
    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const globalBookingRequests: DataSource.DBGlobalBookingRequest[] | undefined =
        await dataSourceAdapter.globalBookingRequestRepository.findMany({});

    if (!globalBookingRequests) return;

    return globalBookingRequests.map(packLocation);
}
