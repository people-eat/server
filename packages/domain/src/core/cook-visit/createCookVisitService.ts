import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type CookVisitStatistics } from './CookVisitStatistics';
import { type CreateOneCookVisitRequest } from './CreateOneCookVisitRequest';
import { type FindCookVisitStatisticsRequest } from './FindCookVisitStatisticsRequest';
import { createOne } from './useCases/createOne';
import { findStatistics } from './useCases/findStatistics';

export interface CookVisitService {
    createOne(context: Authorization.Context, request: CreateOneCookVisitRequest): Promise<boolean>;
    findStatistics(context: Authorization.Context, request: FindCookVisitStatisticsRequest): Promise<CookVisitStatistics>;
}

export function createCookVisitService(runtime: Runtime): CookVisitService {
    return {
        createOne: (context: Authorization.Context, request: CreateOneCookVisitRequest) => createOne({ runtime, context, request }),
        findStatistics: (context: Authorization.Context, request: FindCookVisitStatisticsRequest) =>
            findStatistics({ runtime, context, request }),
    };
}
