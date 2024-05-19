import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';

export interface ExpireOneSessionInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: ExpireOneSessionRequest;
}

export interface ExpireOneSessionRequest {
    userId: string;
    sessionId: string;
}

export async function expireOne({
    runtime: { dataSourceAdapter, logger },
    context,
    request: { userId, sessionId },
}: ExpireOneSessionInput): Promise<boolean> {
    await Authorization.canMutateUserData({ dataSourceAdapter, logger, context, userId });

    const success: boolean = await dataSourceAdapter.sessionRepository.updateOne({ sessionId, userId }, { expired: true });

    return success;
}
