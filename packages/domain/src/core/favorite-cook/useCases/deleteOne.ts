import { Authorization, Database, Logger } from '../../../index.js';

interface CreateOneFavoriteCookInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: string; cookId: string };
}

export async function deleteOne({
    databaseAdapter,
    logger,
    context,
    request: { userId, cookId },
}: CreateOneFavoriteCookInput): Promise<boolean> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId });
    const success: boolean = await databaseAdapter.favoriteCookRepository.deleteOne({ userId, cookId });
    return success;
}
