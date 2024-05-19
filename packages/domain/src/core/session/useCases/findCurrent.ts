import { type Authorization, type DataSource } from '../../..';
import { type Runtime } from '../../Runtime';
import { type Session } from '../Session';

export interface FindCurrentSessionInput {
    runtime: Runtime;
    context: Authorization.Context;
}

export async function findCurrent({ runtime: { dataSourceAdapter }, context }: FindCurrentSessionInput): Promise<Session | undefined> {
    const session: DataSource.DBSession | undefined = await dataSourceAdapter.sessionRepository.findOne({ sessionId: context.sessionId });

    if (!session) return;

    return session;
}
