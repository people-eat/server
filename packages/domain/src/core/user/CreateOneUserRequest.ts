import { type ReadStream } from 'fs';
import { type CreateOneAddressRequest } from '../address';
import { type CreateOneCookRequest } from '../cook/CreateOneCookRequest';
import { type CreateOneGlobalBookingRequestRequest } from '../global-booking-request';
import { type IdentityProvider } from '../shared';
import { type User } from './User';

export interface CreateOneUserBaseRequest
    extends Pick<User, 'firstName' | 'lastName' | 'language' | 'gender' | 'birthDate' | 'profilePictureUrl'> {
    cook?: CreateOneCookRequest;
    addresses?: CreateOneAddressRequest[];
    globalBookingRequest?: CreateOneGlobalBookingRequestRequest;
    profilePicture?: ReadStream;
}

export type CreateOneUserByEmailAddressRequest = CreateOneUserBaseRequest & {
    emailAddress: string;
    password?: string;
};

export type CreateOneUserByPhoneNumberRequest = CreateOneUserBaseRequest & { phoneNumber: string; password: string };

export type CreateOneUserByIdentityProviderRequest = CreateOneUserBaseRequest & { identityProvider: IdentityProvider; idToken: string };

export type CreateOneUserRequest = CreateOneUserBaseRequest & {
    emailAddress: string;
    phoneNumber: string;
    password?: string;
};
