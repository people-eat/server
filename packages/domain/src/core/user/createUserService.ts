import { type ReadStream } from 'fs';
import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type FindManyRequest, type Gender, type NanoId } from '../shared';
import {
    type CreateOneUserByEmailAddressRequest,
    type CreateOneUserByIdentityProviderRequest,
    type CreateOneUserByPhoneNumberRequest,
    type CreateOneUserRequest,
} from './CreateOneUserRequest';
import { createOne, type CreateOneUserResult } from './useCases/createOne';
import { createOneByEmailAddress } from './useCases/createOneByEmailAddress';
import { createOneByIdentityProvider } from './useCases/createOneByIdentityProvider';
import { createOneByPhoneNumber } from './useCases/createOneByPhoneNumber';
import { findMany } from './useCases/findMany';
import { findOneByUserId, type FindOneUserByUserIdRequest } from './useCases/findOneByUserId';
import { updateGender } from './useCases/updateGender';
import { updatePassword } from './useCases/updatePassword';
import { updateProfilePicture } from './useCases/updateProfilePicture';
import { type User } from './User';

export interface UserService {
    findOneByUserId(context: Authorization.Context, request: FindOneUserByUserIdRequest): Promise<User | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<User[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneUserRequest): Promise<CreateOneUserResult>;
    createOneByEmailAddress(context: Authorization.Context, request: CreateOneUserByEmailAddressRequest): Promise<boolean>;
    createOneByPhoneNumber(context: Authorization.Context, request: CreateOneUserByPhoneNumberRequest): Promise<boolean>;
    createOneByIdentityProvider(context: Authorization.Context, request: CreateOneUserByIdentityProviderRequest): Promise<boolean>;
    updatePassword(context: Authorization.Context, request: { userId: NanoId; password: string }): Promise<boolean>;
    updateGender(context: Authorization.Context, request: { userId: NanoId; gender: Gender }): Promise<boolean>;
    updateProfilePicture(context: Authorization.Context, request: { userId: NanoId; profilePicture?: ReadStream }): Promise<boolean>;
}

export function createUserService(runtime: Runtime): UserService {
    return {
        findOneByUserId: (context: Authorization.Context, request: FindOneUserByUserIdRequest) =>
            findOneByUserId({ runtime, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ runtime, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneUserRequest) => createOne({ runtime, context, request }),
        createOneByEmailAddress: (context: Authorization.Context, request: CreateOneUserByEmailAddressRequest) =>
            createOneByEmailAddress({ runtime, context, request }),
        createOneByPhoneNumber: (context: Authorization.Context, request: CreateOneUserByPhoneNumberRequest) =>
            createOneByPhoneNumber({ runtime, context, request }),
        createOneByIdentityProvider: (context: Authorization.Context, request: CreateOneUserByIdentityProviderRequest) =>
            createOneByIdentityProvider({ runtime, context, request }),
        updatePassword: (context: Authorization.Context, request: { userId: NanoId; password: string }) =>
            updatePassword({ runtime, context, request }),
        updateGender: (context: Authorization.Context, request: { userId: NanoId; gender: Gender }) =>
            updateGender({ runtime, context, request }),
        updateProfilePicture: (context: Authorization.Context, request: { userId: NanoId; profilePicture?: ReadStream }) =>
            updateProfilePicture({ runtime, context, request }),
    };
}
