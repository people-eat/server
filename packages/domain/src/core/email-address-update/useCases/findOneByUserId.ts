import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type EmailAddressUpdate } from '../EmailAddressUpdate';

export interface FindManyEmailAddressUpdatesInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { userId: NanoId };
}

export async function findOneByUserId({
    runtime: { dataSourceAdapter, logger },
    context,
    request,
}: FindManyEmailAddressUpdatesInput): Promise<EmailAddressUpdate | undefined> {
    const { userId } = request;

    await Authorization.canQueryUserData({ dataSourceAdapter, logger, context, userId });

    const emailAddressUpdate: EmailAddressUpdate | undefined = await dataSourceAdapter.emailAddressUpdateRepository.findOne({ userId });

    if (!emailAddressUpdate) return;

    return emailAddressUpdate;
}
