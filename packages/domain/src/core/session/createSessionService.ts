import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type NanoId } from '../shared';
import { type Session } from './Session';
import { assignOne } from './useCases/assignOne';
import { assignOneByEmailAddress, type AssignOneSessionByEmailAddressRequest } from './useCases/assignOneByEmailAddress';
import { assignOneByIdentityProvider, type AssignOneSessionByIdentityProviderRequest } from './useCases/assignOneByIdentityProvider';
import { assignOneByPhoneNumber, type AssignOneSessionByPhoneNumberRequest } from './useCases/assignOneByPhoneNumber';
import { expireOne, type ExpireOneSessionRequest } from './useCases/expireOne';
import { findCurrent } from './useCases/findCurrent';
import { findMany, type FindManySessionsRequest } from './useCases/findMany';
import { updateCookieSettings, type UpdateCookieSettingsRequest } from './useCases/updateCookieSettings';

export interface SessionService {
    assignOneByEmailAddress(context: Authorization.Context, request: AssignOneSessionByEmailAddressRequest): Promise<boolean>;
    assignOneByIdentityProvider(context: Authorization.Context, request: AssignOneSessionByIdentityProviderRequest): Promise<boolean>;
    assignOneByPhoneNumber(context: Authorization.Context, request: AssignOneSessionByPhoneNumberRequest): Promise<boolean>;
    assignOne(context: Authorization.Context, request: { userId: NanoId }): Promise<boolean>;
    updateCookieSettings(context: Authorization.Context, request: UpdateCookieSettingsRequest): Promise<boolean>;
    expireOne(context: Authorization.Context, request: ExpireOneSessionRequest): Promise<boolean>;
    findMany(context: Authorization.Context, request: FindManySessionsRequest): Promise<Session[] | undefined>;
    findCurrent(context: Authorization.Context): Promise<Session>;
}

export function createSessionService(runtime: Runtime): SessionService {
    return {
        assignOneByEmailAddress: (context: Authorization.Context, request: AssignOneSessionByEmailAddressRequest) =>
            assignOneByEmailAddress({ runtime, context, request }),
        assignOneByIdentityProvider: (context: Authorization.Context, request: AssignOneSessionByIdentityProviderRequest) =>
            assignOneByIdentityProvider({ runtime, context, request }),
        assignOneByPhoneNumber: (context: Authorization.Context, request: AssignOneSessionByPhoneNumberRequest) =>
            assignOneByPhoneNumber({ runtime, context, request }),
        assignOne: (context: Authorization.Context, request: { userId: NanoId }) => assignOne({ runtime, context, request }),
        expireOne: (context: Authorization.Context, request: ExpireOneSessionRequest) => expireOne({ runtime, context, request }),
        updateCookieSettings: (context: Authorization.Context, request: UpdateCookieSettingsRequest) =>
            updateCookieSettings({ runtime, context, request: { cookieSettings: request } }),
        findMany: (context: Authorization.Context, request: FindManySessionsRequest) => findMany({ runtime, context, request }),
        findCurrent: (context: Authorization.Context) => findCurrent({ runtime, context }),
    };
}
