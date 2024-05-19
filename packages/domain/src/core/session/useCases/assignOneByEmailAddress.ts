import bcrypt from 'bcryptjs';
import { type Authorization, type DataSource } from '../../..';
import { type Runtime } from '../../Runtime';
import { type Platform } from '../../shared';

export interface AssignOneSessionByEmailAddressInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: AssignOneSessionByEmailAddressRequest;
}

export interface AssignOneSessionByEmailAddressRequest {
    emailAddress: string;
    password: string;
    title: string;
    platform: Platform;
}

export async function assignOneByEmailAddress({
    runtime: { dataSourceAdapter },
    context,
    request,
}: AssignOneSessionByEmailAddressInput): Promise<boolean> {
    const user: DataSource.DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ emailAddress: request.emailAddress });

    // maybe lookup in email address updates

    if (!user) return false;

    if (!user.password) return false;

    if (!bcrypt.compareSync(request.password, user.password)) return false;

    if (user.isLocked) return false;

    if (user.failedSignInAttempts > 4) return false;

    const success: boolean = await dataSourceAdapter.sessionRepository.updateOne(
        { sessionId: context.sessionId },
        { userId: user.userId, title: request.title, platform: request.platform },
    );

    if (!success) return false;

    return true;
}
