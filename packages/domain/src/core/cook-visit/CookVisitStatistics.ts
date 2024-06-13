import { type CookVisit } from './CookVisit';

export interface CookVisitStatistics {
    visits: CookVisit[];
    visitCountTotal: number;
    // visitCountTotalUniqueSessions: number;
    visitCountLastWeek: number;
    // visitCountLastWeekUniqueSessions: number;
    visitCountLastMonth: number;
    // visitCountLastMonthUniqueSessions: number;
}
