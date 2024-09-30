import { type Klaviyo, type Logger, type User } from '@people-eat/server-domain';
import { randomUUID } from 'crypto';
import { ApiKeySession, EventsApi, ProfilesApi } from 'klaviyo-api';

export interface CreateEmailAdapterInput {
    logger: Logger.Adapter;
    apiKey: string;
}

export function createKlaviyoEmailAdapter({ logger, apiKey }: CreateEmailAdapterInput): Klaviyo.Adapter {
    const session: ApiKeySession = new ApiKeySession(apiKey);
    const profiles: ProfilesApi = new ProfilesApi(session);
    const events: EventsApi = new EventsApi(session);

    const getKlaviyoUserId = async (
        user: Pick<User, 'userId' | 'firstName' | 'lastName' | 'emailAddress' | 'phoneNumber'>,
    ): Promise<string> => {
        const { body: getResponseBody } = await profiles.getProfiles({ filter: `equals(external_id,"${user.userId}")` });
        const [existingProfile] = getResponseBody.data;

        logger.info(
            `Requested Klaviyo user for PeopleEat user with id '${user.userId}' and did receive one:\n${JSON.stringify(existingProfile)}`,
        );

        if (!existingProfile) {
            const { body: createResponseBody } = await profiles.createProfile({
                data: {
                    type: 'profile',
                    attributes: {
                        externalId: user.userId,
                        email: user.emailAddress,
                        phoneNumber: user.phoneNumber,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                },
            });

            logger.info(`Created Klaviyo user for PeopleEat user with id '${user.userId}'\n${JSON.stringify(createResponseBody.data)}`);

            return createResponseBody.data.id ?? '';
        }

        return existingProfile.id ?? '';
    };

    const send = async ({ recipient, metricId, data }: Klaviyo.KlaviyoAdapterSendRequest): Promise<boolean> => {
        const klaviyoUserId: string = await getKlaviyoUserId(recipient);

        await events.createEvent({
            data: {
                type: 'event',
                attributes: {
                    uniqueId: randomUUID(),
                    properties: data,
                    profile: { data: { type: 'profile', id: klaviyoUserId, attributes: {} } },
                    metric: { data: { type: 'metric', attributes: { name: metricId } } },
                },
            },
        });

        return true;
    };

    return {
        send,
        sendBookingRequestMail: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendGlobalBookingRequestWithEmailConfirmationRequest): Promise<void> => {
            await send({ recipient, metricId: '', data });
        },
    };
}
