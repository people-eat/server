import { confirmEmailAddress } from '@people-eat/server-adapter-email-template';
import { Authorization } from '../../..';
import { type DBEmailAddressUpdate } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneEmailAddressUpdateRequest } from '../CreateOneEmailAddressUpdateRequest';

interface CreateOneEmailAddressUpdateInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneEmailAddressUpdateRequest;
}

export async function createOne({
    runtime: { dataSourceAdapter, emailAdapter, logger, webAppUrl },
    context,
    request: { userId, emailAddress },
}: CreateOneEmailAddressUpdateInput): Promise<boolean> {
    await Authorization.canMutateUserData({ dataSourceAdapter, logger, context, userId });

    const existingEmailAddressUpdate: DBEmailAddressUpdate | undefined = await dataSourceAdapter.emailAddressUpdateRepository.findOne({
        emailAddress,
    });

    if (existingEmailAddressUpdate) {
        logger.error(`When trying to create an email address update found an unconfirmed one: ${emailAddress}`);
        return false;
    }

    const secret: NanoId = createNanoId();

    const emailAddressUpdate: DBEmailAddressUpdate = {
        userId,
        emailAddress,
        secret,
        createdAt: new Date(),
    };

    const persistingSuccess: boolean = await dataSourceAdapter.emailAddressUpdateRepository.insertOne(emailAddressUpdate);

    if (!persistingSuccess) {
        logger.error(`When trying to create an email address update failed to persist: ${emailAddressUpdate}`);
        return false;
    }

    const emailSendingSuccess: boolean = await emailAdapter.sendToOne(
        'PeopleEat',
        emailAddress,
        'Email Adresse bestätigen',
        confirmEmailAddress({ webAppUrl, secret }),
    );

    if (!emailSendingSuccess) {
        logger.error(`Unable to send confirmation email for creation of email address update: ${emailAddress}`);
        return false;
    }

    return true;
}
