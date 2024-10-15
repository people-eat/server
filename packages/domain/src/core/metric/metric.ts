import { type Runtime } from '../Runtime';

export type TimeUnit = 'MONTHS' | 'WEEKS' | 'DAYS' | 'HOURS';

export type UserMetricCountType =
    | 'USER'
    | 'CUSTOMER'
    | 'COOK'
    | 'ADMIN'
    | 'SESSIONS'
    | 'USER_SESSIONS'
    | 'SEARCH_REQUESTS'
    | 'HOME_SEARCH_REQUESTS'
    | 'COOK_SEARCH_REQUESTS'
    | 'MENU_SEARCH_REQUESTS'
    | 'GLOBAL_BOOKING_REQUESTS'
    | 'BOOKING_REQUESTS';

const baseQuery: Record<UserMetricCountType, string> = {
    USER: 'SELECT COUNT(*) AS count FROM Users WHERE TRUE',
    CUSTOMER: 'SELECT COUNT(*) AS count FROM Users LEFT JOIN Cooks ON Users.userId = Cooks.cookId WHERE Cooks.cookId IS NULL',
    COOK: 'SELECT COUNT(*) AS count FROM Users RIGHT JOIN Cooks ON Users.userId = Cooks.cookId WHERE TRUE',
    ADMIN: 'SELECT COUNT(*) AS count FROM Users RIGHT JOIN Admins ON Users.userId = Admins.adminId WHERE TRUE',
    SESSIONS: 'SELECT COUNT(*) AS count FROM Sessions WHERE TRUE',
    USER_SESSIONS: 'SELECT COUNT(*) AS count FROM Sessions WHERE userId IS NOT NULL',
    SEARCH_REQUESTS: 'SELECT COUNT(*) AS count FROM SearchRequests WHERE TRUE',
    HOME_SEARCH_REQUESTS: "SELECT COUNT(*) AS count FROM SearchRequests WHERE origin = 'HOME'",
    COOK_SEARCH_REQUESTS: "SELECT COUNT(*) AS count FROM SearchRequests WHERE origin = 'PUBLIC_COOKS'",
    MENU_SEARCH_REQUESTS: "SELECT COUNT(*) AS count FROM SearchRequests WHERE origin = 'PUBLIC_MENUS'",
    GLOBAL_BOOKING_REQUESTS: 'SELECT COUNT(*) AS count FROM GlobalBookingRequests WHERE TRUE',
    BOOKING_REQUESTS: 'SELECT COUNT(*) AS count FROM BookingRequests WHERE TRUE',
};

const toMySqlTimeUnit: Record<TimeUnit, string> = {
    MONTHS: 'MONTH',
    WEEKS: 'WEEK',
    DAYS: 'DAY',
    HOURS: 'HOUR',
};

const toMySqlTableWithRelevantCreatedAt: Record<UserMetricCountType, string> = {
    USER: 'Users',
    CUSTOMER: 'Users',
    COOK: 'Cooks',
    ADMIN: 'Admins',
    SESSIONS: 'Sessions',
    USER_SESSIONS: 'Sessions',
    SEARCH_REQUESTS: 'SearchRequests',
    HOME_SEARCH_REQUESTS: 'SearchRequests',
    COOK_SEARCH_REQUESTS: 'SearchRequests',
    MENU_SEARCH_REQUESTS: 'SearchRequests',
    GLOBAL_BOOKING_REQUESTS: 'GlobalBookingRequests',
    BOOKING_REQUESTS: 'BookingRequests',
};

export interface ResolveMetricCountTotalSinceRequest {
    timeUnit: TimeUnit;
    value: number;
    type: UserMetricCountType;
}

export interface ResolveMetricCountTotalSinceOptions {
    runtime: Runtime;
    request: ResolveMetricCountTotalSinceRequest;
}

export async function resolveMetricCountTotalSince({
    runtime: { dataSourceAdapter },
    request: { timeUnit, value, type },
}: ResolveMetricCountTotalSinceOptions): Promise<number> {
    const query: string = baseQuery[type];
    if (!value) {
        const { count }: { count: number } = await dataSourceAdapter.query(query);
        return count;
    }

    const tableName: string = toMySqlTableWithRelevantCreatedAt[type];
    const mySqlTimeUnit: string = toMySqlTimeUnit[timeUnit];

    const timeIntervalCondition: string = `AND
        ${tableName}.createdAt >= DATE_SUB(NOW(), INTERVAL ${value} ${mySqlTimeUnit})
    `;

    const { count }: { count: number } = await dataSourceAdapter.query(query + ' ' + timeIntervalCondition);

    return count;
}

export async function resolveMetricCountTotalIn({
    runtime: { dataSourceAdapter },
    request: { timeUnit, value, type },
}: ResolveMetricCountTotalSinceOptions): Promise<number> {
    const query: string = baseQuery[type];
    if (!value) {
        const [{ count }]: [{ count: number }] = await dataSourceAdapter.query(query);
        return count;
    }

    const tableName: string = toMySqlTableWithRelevantCreatedAt[type];
    const mySqlTimeUnit: string = toMySqlTimeUnit[timeUnit];

    const timeIntervalCondition: string = `AND
        ${tableName}.createdAt >= DATE_SUB(NOW(), INTERVAL ${value} ${mySqlTimeUnit}) AND
        ${tableName}.createdAt < DATE_SUB(NOW(), INTERVAL ${value - 1} ${mySqlTimeUnit})
    `;

    const [{ count }]: [{ count: number }] = await dataSourceAdapter.query(query + ' ' + timeIntervalCondition);

    return count;
}

export interface MetricService {
    resolveMetricCountTotalSince: (request: ResolveMetricCountTotalSinceRequest) => Promise<number>;
    resolveMetricCountTotalIn: (request: ResolveMetricCountTotalSinceRequest) => Promise<number>;
}

export function createMetricService(runtime: Runtime): MetricService {
    return {
        resolveMetricCountTotalSince: (request: ResolveMetricCountTotalSinceRequest) => resolveMetricCountTotalSince({ runtime, request }),
        resolveMetricCountTotalIn: (request: ResolveMetricCountTotalSinceRequest) => resolveMetricCountTotalIn({ runtime, request }),
    };
}
