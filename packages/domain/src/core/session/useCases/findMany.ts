import { Authorization, type DataSource } from '../../..';
import { type Runtime } from '../../Runtime';
import { type FindManyRequest } from '../../shared';
import { type Session } from '../Session';

export interface FindManySessionsInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: FindManySessionsRequest;
}

export type FindManySessionsRequest = { userId: string } & FindManyRequest;

export async function findMany({
    runtime: { dataSourceAdapter, logger },
    context,
    request: { userId },
}: FindManySessionsInput): Promise<Session[] | undefined> {
    await Authorization.canQueryUserData({ dataSourceAdapter, logger, context, userId });

    const sessions: DataSource.DBSession[] | undefined = await dataSourceAdapter.sessionRepository.findMany({ userId });

    if (!sessions) return;

    return sessions;
}
