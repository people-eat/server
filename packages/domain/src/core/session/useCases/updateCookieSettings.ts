import { type Authorization } from '../../..';
import { type Runtime } from '../../Runtime';

export interface UpdateCookieSettingsInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { cookieSettings: UpdateCookieSettingsRequest };
}

export interface UpdateCookieSettingsRequest {
    sessionCookie?: boolean;
    googleAnalytics?: boolean;
    clarity?: boolean;
}

export async function updateCookieSettings({
    runtime: { dataSourceAdapter },
    context,
    request,
}: UpdateCookieSettingsInput): Promise<boolean> {
    const { cookieSettings } = request;

    const success: boolean = await dataSourceAdapter.sessionRepository.updateOne({ sessionId: context.sessionId }, { cookieSettings });

    if (!success) return false;

    return true;
}
