import bcrypt from 'bcryptjs';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { type Authorization } from '../../..';
import { type DBPhoneNumberUpdate, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { createOne as createOneAddress } from '../../address/useCases/createOne';
import { createOne as createOneCook } from '../../cook/useCases/createOne';
import { createOne as createOnePhoneNumberUpdate } from '../../phone-number-update/useCases/createOne';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneUserByPhoneNumberRequest } from '../CreateOneUserRequest';

export interface CreateOneUserByEmailAddressInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneUserByPhoneNumberRequest;
}

// eslint-disable-next-line max-statements
export async function createOneByPhoneNumber({ runtime, context, request }: CreateOneUserByEmailAddressInput): Promise<boolean> {
    const { dataSourceAdapter, logger, serverUrl, smsAdapter, webAppUrl } = runtime;
    const { phoneNumber, password, firstName, lastName, language, gender, birthDate, cook, addresses, profilePicture } = request;

    const existingUserByPhoneNumber: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ phoneNumber });
    const existingPhoneNumberUpdate: DBPhoneNumberUpdate | undefined = await dataSourceAdapter.phoneNumberUpdateRepository.findOne({
        phoneNumber,
    });

    if (existingUserByPhoneNumber || existingPhoneNumberUpdate) {
        logger.info(
            `Failed to create a new user because of duplicate data: ${JSON.stringify({
                existingUserByPhoneNumber,
                existingPhoneNumberUpdate,
            })}`,
        );
        return false;
    }

    // STEP - profile picture
    let profilePictureUrl: string | undefined;

    if (profilePicture) {
        // store different sizes right away
        const profilePictureId: NanoId = createNanoId();
        profilePictureUrl = serverUrl + '/profile-pictures/' + profilePictureId;
        await new Promise<boolean>((resolve: (success: boolean) => void, reject: (success: boolean) => void) =>
            profilePicture
                .pipe(createWriteStream(join(process.cwd(), `images/profile-pictures/original/${profilePictureId}.png`)))
                .on('finish', () => resolve(true))
                .on('error', () => reject(false)),
        );
    }

    // STEP - user
    const userId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.userRepository.insertOne({
        userId,
        isLocked: false,
        emailAddress: undefined,
        phoneNumber: undefined,
        password: password ? bcrypt.hashSync(password, bcrypt.genSaltSync()) : undefined,
        failedSignInAttempts: 0,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        language,
        gender,
        birthDate,
        profilePictureUrl,
        acceptedPrivacyPolicy: new Date(),
        acceptedTerms: new Date(),
        createdAt: new Date(),
    });

    if (!success) {
        logger.warn('Persisting user did fail');
        return false;
    }

    // STEP - set current request to signed in state
    // maybe only use this line to get rid of all the userCreation flags. Will be unset after request is handled
    // const { sessionId } = context;
    // await dataSourceAdapter.sessionRepository.updateOne({ sessionId }, { userId });
    context.userId = userId;

    // STEP - phone number
    const smsSuccess: boolean = await createOnePhoneNumberUpdate({
        dataSourceAdapter,
        smsAdapter,
        logger,
        webAppUrl,
        context,
        request: { userId, phoneNumber: phoneNumber.trim() },
    });

    if (!smsSuccess) {
        logger.error('Could not create phone number update');
        return false;
    }

    // STEP - addresses
    if (addresses) for (const address of addresses) await createOneAddress({ runtime, context, request: { userId, ...address } });

    // STEP - cook
    if (cook) await createOneCook({ runtime, context, request: { cookId: userId, ...cook } });

    return true;
}
