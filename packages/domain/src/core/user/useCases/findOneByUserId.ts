import { Authorization, type DataSource } from '../../..';
import { type Runtime } from '../../Runtime';
import { type User } from '../User';

export interface FindOneUserByUserIdInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: FindOneUserByUserIdRequest;
}

export interface FindOneUserByUserIdRequest {
    userId: string;
}

export async function findOneByUserId({
    runtime: { dataSourceAdapter, logger },
    context,
    request: { userId },
}: FindOneUserByUserIdInput): Promise<User | undefined> {
    await Authorization.canQueryUserData({ dataSourceAdapter, logger, context, userId });

    const user: DataSource.DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId });

    if (!user) return undefined;

    return {
        ...user,
        hasPasswordSetUp: Boolean(user.password),
    };
}
