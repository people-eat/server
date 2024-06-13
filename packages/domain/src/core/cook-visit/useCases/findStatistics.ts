import { Authorization, type CookVisit } from '../../..';
import { type DBCookVisit } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type CookVisitStatistics } from '../CookVisitStatistics';
import { type FindCookVisitStatisticsRequest } from '../FindCookVisitStatisticsRequest';

export interface FindCookVisitStatisticsInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: FindCookVisitStatisticsRequest;
}

const SEVEN_DAYS_IN_MS: number = 7 * 24 * 60 * 60 * 1000;
const MONTH_IN_MS: number = 30 * 24 * 60 * 60 * 1000;

export async function findStatistics({
    runtime: { dataSourceAdapter, logger },
    context,
    request,
}: FindCookVisitStatisticsInput): Promise<CookVisitStatistics> {
    const { cookId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const cookVisits: DBCookVisit[] | undefined = await dataSourceAdapter.cookVisitRepository.findMany({
        cookId,
    });

    if (!cookVisits) {
        return {
            visits: [],
            visitCountTotal: 0,
            visitCountLastWeek: 0,
            visitCountLastMonth: 0,
        };
    }

    // sessionId -> createdAt
    // const cookVisitUniqueSessions: Map<NanoId, Date> = new Map();
    // cookVisits.forEach((cookVisit: CookVisit) => {
    //     if (cookVisitUniqueSessions.get())
    // })

    return {
        visits: cookVisits,
        visitCountTotal: cookVisits.length,
        visitCountLastWeek: cookVisits.filter(
            ({ createdAt }: CookVisit) => new Date().getTime() - new Date(createdAt).getTime() <= SEVEN_DAYS_IN_MS,
        ).length,
        visitCountLastMonth: cookVisits.filter(
            ({ createdAt }: CookVisit) => new Date().getTime() - new Date(createdAt).getTime() <= MONTH_IN_MS,
        ).length,
    };
}
