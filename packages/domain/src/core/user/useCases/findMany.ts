import { Authorization, type DataSource } from '../../..';
import { type Runtime } from '../../Runtime';
import { type FindManyRequest } from '../../shared';
import { type User } from '../User';

export interface FindManyUsersInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ runtime: { dataSourceAdapter, logger }, context }: FindManyUsersInput): Promise<User[] | undefined> {
    await Authorization.isAdmin({ dataSourceAdapter, logger, context });

    const users: DataSource.DBUser[] | undefined = await dataSourceAdapter.userRepository.findMany({});

    if (!users) return;

    return users.map((user: DataSource.DBUser) => ({
        ...user,
        hasPasswordSetUp: Boolean(user.password),
    }));
}
