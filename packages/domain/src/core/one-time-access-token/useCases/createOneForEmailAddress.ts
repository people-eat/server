import { type DBUser } from '../../../data-source/index';
import { type DataSource, type Email, type Logger } from '../../../index';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneOneTimeAccessTokenForEmailAddressRequest } from '../CreateOneOneTimeAccessTokenForEmailAddressRequest';

interface CreateOneOneTimeAccessTokenInput {
    dataSourceAdapter: DataSource.Adapter;
    emailAdapter: Email.Adapter;
    logger: Logger.Adapter;
    webAppUrl: string;
    request: CreateOneOneTimeAccessTokenForEmailAddressRequest;
}

export async function createOneForEmailAddress({
    dataSourceAdapter,
    emailAdapter,
    logger: _logger,
    webAppUrl,
    request: { emailAddress },
}: CreateOneOneTimeAccessTokenInput): Promise<boolean> {
    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ emailAddress });

    if (!user || !user.emailAddress) return false;

    const secret: NanoId = createNanoId();

    const persistingSuccess: boolean = await dataSourceAdapter.oneTimeAccessTokenRepository.insertOne({
        userId: user.userId,
        secret,
        createdAt: new Date(),
    });

    if (!persistingSuccess) return false;

    const emailSendigSuccess: boolean = await emailAdapter.sendToOne(
        'PeopleEat',
        emailAddress,
        'Passwort vergessen',
        `${webAppUrl}/forgot-password/${secret}`,
    );

    if (!emailSendigSuccess) return false;

    return true;
}