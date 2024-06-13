import { Authorization, type MenuVisit } from '../../..';
import { type DBMenu, type DBMenuVisit } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type FindMenuVisitStatisticsRequest } from '../FindMenuVisitStatisticsRequest';
import { type MenuVisitStatistics } from '../MenuVisitStatistics';

export interface FindMenuVisitStatisticsInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: FindMenuVisitStatisticsRequest;
}

const SEVEN_DAYS_IN_MS: number = 7 * 24 * 60 * 60 * 1000;
const MONTH_IN_MS: number = 30 * 24 * 60 * 60 * 1000;

export async function findStatistics({
    runtime: { dataSourceAdapter, logger },
    context,
    request,
}: FindMenuVisitStatisticsInput): Promise<MenuVisitStatistics> {
    const { menuId } = request;

    const menu: DBMenu | undefined = await dataSourceAdapter.menuRepository.findOne({ menuId });

    if (!menu) {
        return {
            visits: [],
            visitCountTotal: 0,
            visitCountLastWeek: 0,
            visitCountLastMonth: 0,
        };
    }

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: menu.cookId });

    const menuVisits: DBMenuVisit[] | undefined = await dataSourceAdapter.menuVisitRepository.findMany({
        menuId,
    });

    if (!menuVisits) {
        return {
            visits: [],
            visitCountTotal: 0,
            visitCountLastWeek: 0,
            visitCountLastMonth: 0,
        };
    }

    return {
        visits: menuVisits,
        visitCountTotal: menuVisits.length,
        visitCountLastWeek: menuVisits.filter(
            ({ createdAt }: MenuVisit) => new Date().getTime() - new Date(createdAt).getTime() <= SEVEN_DAYS_IN_MS,
        ).length,
        visitCountLastMonth: menuVisits.filter(
            ({ createdAt }: MenuVisit) => new Date().getTime() - new Date(createdAt).getTime() <= MONTH_IN_MS,
        ).length,
    };
}
