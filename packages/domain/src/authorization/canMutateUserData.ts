import { type DataSource, type Logger } from '..';
import { type DBAdmin } from '../data-source';
import { type Context } from './Context';

interface CanMutateUserDataInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Context;
    userId: string;
}

export async function canMutateUserData({ context, userId, dataSourceAdapter }: CanMutateUserDataInput): Promise<void> {
    if (!context.userId) throw new Error('Unauthorized');

    if (context.userId === userId) return;

    const admin: DBAdmin | undefined = await dataSourceAdapter.adminRepository.findOne({ adminId: context.userId });

    if (admin) return;

    throw new Error('Unauthorized');
}
