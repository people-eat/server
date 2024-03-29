import bcrypt from 'bcryptjs';
import { type Authorization } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { createOne as createOneAddress } from '../../address/useCases/createOne';
import { createOne as createOnePhoneNumberUpdate } from '../../phone-number-update/useCases/createOne';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneUserByPhoneNumberRequest } from '../CreateOneUserRequest';

export interface CreateOneUserByPhoneNumberInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneUserByPhoneNumberRequest;
}

export async function createOneByPhoneNumber({ runtime, context, request }: CreateOneUserByPhoneNumberInput): Promise<boolean> {
    const { dataSourceAdapter, smsAdapter, logger, webAppUrl } = runtime;
    const { phoneNumber, password, firstName, lastName, language, gender, birthDate, addresses } = request;

    // cook

    const userId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.userRepository.insertOne({
        userId,
        isLocked: false,
        emailAddress: undefined,
        phoneNumber: phoneNumber,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
        failedSignInAttempts: 0,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        language,
        gender,
        birthDate,
        profilePictureUrl: undefined,
        acceptedPrivacyPolicy: new Date(),
        acceptedTerms: new Date(),
        createdAt: new Date(),
    });

    if (!success) return false;

    const smsSuccess: boolean = await createOnePhoneNumberUpdate({
        dataSourceAdapter,
        smsAdapter,
        logger,
        webAppUrl,
        context,
        request: { userId, phoneNumber: phoneNumber.trim() },
    });

    if (!smsSuccess) return false;

    if (addresses) for (const address of addresses) await createOneAddress({ runtime, context, request: { userId, ...address } });

    // if (cook) await createOneCook({ dataSourceAdapter, logger, emailAdapter, context, request: { cookId: userId, ...cook } });

    return true;
}
