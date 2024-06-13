import { type MenuVisit } from './MenuVisit';

export interface MenuVisitStatistics {
    visits: MenuVisit[];
    visitCountTotal: number;
    visitCountLastWeek: number;
    visitCountLastMonth: number;
}
