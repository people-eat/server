import { type Authorization, type EmailAddressUpdate } from '../..';
import { type Runtime } from '../Runtime';
import { type NanoId } from '../shared';
import { type CreateOneEmailAddressUpdateRequest } from './CreateOneEmailAddressUpdateRequest';
import { confirmOne } from './useCases/confirmOne';
import { createOne } from './useCases/createOne';
import { findOneByUserId } from './useCases/findOneByUserId';

export interface EmailAddressUpdateService {
    createOne(context: Authorization.Context, request: CreateOneEmailAddressUpdateRequest): Promise<boolean>;
    confirmOne(context: Authorization.Context, request: { secret: NanoId }): Promise<{ success: boolean }>;
    findOneByUserId(context: Authorization.Context, request: { userId: NanoId }): Promise<EmailAddressUpdate | undefined>;
}

export function createEmailAddressUpdateService(runtime: Runtime): EmailAddressUpdateService {
    return {
        createOne: (context: Authorization.Context, request: CreateOneEmailAddressUpdateRequest) =>
            createOne({ runtime, context, request }),
        confirmOne: (context: Authorization.Context, request: { secret: NanoId }) => confirmOne({ runtime, context, request }),
        findOneByUserId: (context: Authorization.Context, request: { userId: NanoId }) => findOneByUserId({ runtime, context, request }),
    };
}
