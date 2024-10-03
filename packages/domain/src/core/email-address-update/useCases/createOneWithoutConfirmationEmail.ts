import { Authorization } from '../../..';
import { type DBEmailAddressUpdate } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneEmailAddressUpdateWithoutConfirmationRequest } from '../CreateOneEmailAddressUpdateWithoutConfirmationRequest';

interface CreateOneEmailAddressUpdateInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneEmailAddressUpdateWithoutConfirmationRequest;
}

export async function createOneWithoutConfirmationEmail({
    runtime: { dataSourceAdapter, logger, webAppUrl },
    context,
    request: { userId, emailAddress, returnTo },
}: CreateOneEmailAddressUpdateInput): Promise<{ confirmEmailAddressUrl: string } | undefined> {
    await Authorization.canMutateUserData({ dataSourceAdapter, logger, context, userId });

    const existingEmailAddressUpdate: DBEmailAddressUpdate | undefined = await dataSourceAdapter.emailAddressUpdateRepository.findOne({
        emailAddress,
    });

    if (existingEmailAddressUpdate) {
        logger.error(`When trying to create an email address update found an unconfirmed one: ${emailAddress}`);
        return undefined;
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
        return undefined;
    }

    let confirmEmailAddressUrl: string = webAppUrl + '/email-address-updates/confirm/' + secret;

    if (returnTo) confirmEmailAddressUrl += `?returnTo=${returnTo}`;

    return { confirmEmailAddressUrl };
}
