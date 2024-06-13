import { type Authorization } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneCookVisitRequest } from '../CreateOneCookVisitRequest';

export interface CreateOneCookVisitInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneCookVisitRequest;
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

export async function createOne({ runtime: { dataSourceAdapter }, context, request }: CreateOneCookVisitInput): Promise<boolean> {
    const { cookId } = request;
    const { sessionId, userId } = context;

    if (ourUserIds.findIndex((ourUserId: string) => ourUserId === userId) !== -1) return true;

    const success: boolean = await dataSourceAdapter.cookVisitRepository.insertOne({
        cookVisitId: createNanoId(),
        cookId,
        sessionId,
        userId,
        platform: 'BROWSER',
        createdAt: new Date(),
    });

    return success;
}
