import { type Authorization, type DataSource, type Logger } from '../../..';
import { type DBUser } from '../../../data-source';
import packLocation from '../../packLocation';
import { type NanoId } from '../../shared';
import { type PublicCook } from '../PublicCook';

export interface FindOnePublicCookInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; checkPublic: boolean };
}

export async function findOne({ dataSourceAdapter, request }: FindOnePublicCookInput): Promise<PublicCook | undefined> {
    const { cookId, checkPublic } = request;

    const cook: DataSource.DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId });

    if (!cook || (checkPublic && (cook.isLocked || !cook.isVisible))) return;

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cook.cookId });

    if (!user) return;

    const publicCook: PublicCook = packLocation({ ...cook, user });

    return publicCook;
}
