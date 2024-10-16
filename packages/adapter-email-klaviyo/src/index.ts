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

        if (!existingProfile) {
            logger.info(`Requested Klaviyo user for PeopleEat user with id '${user.userId}' and did not receive one.`);

            try {
                const { body: createResponseBody } = await profiles.createProfile({
                    data: {
                        type: 'profile',
                        attributes: {
                            externalId: user.userId,
                            email: user.emailAddress,
                            // phoneNumber: user.phoneNumber,
                            firstName: user.firstName,
                            lastName: user.lastName,
                        },
                    },
                });

                logger.info(`Created Klaviyo user for PeopleEat user with id '${user.userId}'\n${JSON.stringify(createResponseBody.data)}`);

                return createResponseBody.data.id ?? '';
            } catch (error) {
                logger.error(error);
                logger.error(`Could not create Klaviyo profile for user data \n${JSON.stringify(user)}`);
                return '';
            }
        }

        logger.info(
            `Requested Klaviyo user for PeopleEat user with id '${user.userId}' and did receive one:\n${JSON.stringify(existingProfile)}`,
        );

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
        sendGlobalBookingRequestWithEmailConfirmation: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendGlobalBookingRequestWithEmailConfirmationRequest): Promise<void> => {
            await send({ recipient, metricId: 'global-booking-request-with-sign-up', data });
        },
        sendBookingRequestWithMenuCreatedToCustomer: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendBookingRequestWithMenuCreatedToCustomerRequest): Promise<void> => {
            await send({ recipient, metricId: 'booking-request-with-menu-created', data });
        },
        sendGiftCardPurchaseConfirmation: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendGiftCardPurchaseConfirmationRequest): Promise<void> => {
            await send({ recipient, metricId: 'gift-card-purchase', data });
        },
    };
}
