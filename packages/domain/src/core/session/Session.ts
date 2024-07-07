import { type NanoId, type Platform } from '../shared';

export interface Session {
    sessionId: NanoId;
    userId: NanoId | undefined;
    title: string | undefined;
    platform: Platform;
    expired: boolean;
    lastExtendedAt: Date;
    createdAt: Date;

    cookieSettings?: {
        sessionCookie?: boolean;
        googleAnalytics?: boolean;
        clarity?: boolean;
    };
}
