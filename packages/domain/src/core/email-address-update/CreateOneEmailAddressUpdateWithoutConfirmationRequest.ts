import { type NanoId } from '../shared';

export interface CreateOneEmailAddressUpdateWithoutConfirmationRequest {
    userId: NanoId;
    emailAddress: string;
    returnTo?: string;
}
