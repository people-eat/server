import { type Authorization } from '../../..';
import { type DBEmailAddressUpdate } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

interface CreateOneEmailAddressUpdateInput {
    runtime: Runtime;
    context: Authorization.Context & { userCreation?: boolean };
    request: { secret: NanoId };
}

export async function confirmOne({
    runtime: { dataSourceAdapter, logger },
    context,
    request: { secret },
}: CreateOneEmailAddressUpdateInput): Promise<{ success: boolean }> {
    const emailAddressUpdate: DBEmailAddressUpdate | undefined = await dataSourceAdapter.emailAddressUpdateRepository.findOne({ secret });

    if (!emailAddressUpdate) return { success: false };

    const { userId, emailAddress } = emailAddressUpdate;

    const userUpdateSuccess: boolean = await dataSourceAdapter.userRepository.updateOne({ userId }, { emailAddress });

    if (!userUpdateSuccess) return { success: false };

    const deletionSuccess: boolean = await dataSourceAdapter.emailAddressUpdateRepository.deleteOne({ secret });

    if (!deletionSuccess) logger.error(`Could not delete email address update with secret ${secret} for user ${userId}`);

    const { sessionId } = context;

    // required for further resolving of fields like the user in the success result
    context.userId = userId;

    await dataSourceAdapter.sessionRepository.updateOne({ sessionId }, { userId });

    return { success: true };
}
