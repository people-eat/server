import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type CreateOneMenuVisitRequest } from './CreateOneMenuVisitRequest';
import { type FindMenuVisitStatisticsRequest } from './FindMenuVisitStatisticsRequest';
import { type MenuVisitStatistics } from './MenuVisitStatistics';
import { createOne } from './useCases/createOne';
import { findStatistics } from './useCases/findStatistics';

export interface MenuVisitService {
    createOne(context: Authorization.Context, request: CreateOneMenuVisitRequest): Promise<boolean>;
    findStatistics(context: Authorization.Context, request: FindMenuVisitStatisticsRequest): Promise<MenuVisitStatistics>;
}

export function createMenuVisitService(runtime: Runtime): MenuVisitService {
    return {
        createOne: (context: Authorization.Context, request: CreateOneMenuVisitRequest) => createOne({ runtime, context, request }),
        findStatistics: (context: Authorization.Context, request: FindMenuVisitStatisticsRequest) =>
            findStatistics({ runtime, context, request }),
    };
}
