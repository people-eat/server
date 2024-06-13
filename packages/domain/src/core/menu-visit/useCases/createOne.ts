import { type Authorization } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneMenuVisitRequest } from '../CreateOneMenuVisitRequest';

export interface CreateOneMenuVisitInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneMenuVisitRequest;
}

const ourUserIds: NanoId[] = [
    // Dnaiel
    'lLB69KR37kc8LsxtH55I',
    '88c0fyYn5ZIYITHKfERz',
    // Natalia
    'pEPaRG2WW09S5QDksJSp',
    // Cem
    'kOT3xMaSD19tuFH0PFm4',
];

export async function createOne({ runtime: { dataSourceAdapter }, context, request }: CreateOneMenuVisitInput): Promise<boolean> {
    const { menuId } = request;
    const { sessionId, userId } = context;

    if (ourUserIds.findIndex((ourUserId: string) => ourUserId === userId) !== -1) return true;

    const success: boolean = await dataSourceAdapter.menuVisitRepository.insertOne({
        menuVisitId: createNanoId(),
        menuId,
        sessionId,
        userId,
        platform: 'BROWSER',
        createdAt: new Date(),
    });

    return success;
}
