import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';

export interface AssignOneSessionByPhoneNumberInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { userId: string };
}

export async function assignOne({
    runtime: { dataSourceAdapter, logger },
    context,
    request: { userId },
}: AssignOneSessionByPhoneNumberInput): Promise<boolean> {
    await Authorization.isAdmin({ dataSourceAdapter, logger, context });

    const success: boolean = await dataSourceAdapter.sessionRepository.updateOne({ sessionId: context.sessionId }, { userId });

    if (!success) return false;

    return true;
}
