import { cookBookingRequestCustomerConfirmation, globalBookingRequestCookConfirmation } from '@people-eat/server-adapter-email-template';
import moment from 'moment';
import { Authorization } from '../../..';
import { type DBGlobalBookingRequest, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface CreateOneBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { cookId: NanoId; globalBookingRequestId: NanoId };
}

// eslint-disable-next-line max-statements
export async function createOneByGlobalBookingRequestId({ runtime, context, request }: CreateOneBookingRequestInput): Promise<boolean> {
    const { dataSourceAdapter, emailAdapter, webAppUrl, logger } = runtime;
    const { cookId, globalBookingRequestId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const globalBookingRequest: DBGlobalBookingRequest | undefined = await dataSourceAdapter.globalBookingRequestRepository.findOne({
        globalBookingRequestId,
    });

    if (!globalBookingRequest) return false;

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: globalBookingRequest.userId });

    if (!user) return false;

    const cookUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cookId });

    if (!cookUser) return false;

    const {
        userId,
        adultParticipants,
        children,
        // priceClassType,
        dateTime,
        duration,
        occasion,
        message,
        kitchenId,
        latitude,
        longitude,
        locationText,
        // expiresAt,
        // createdAt,
    } = globalBookingRequest;

    const bookingRequestId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.insertOne({
        bookingRequestId,
        cookId,
        userId,
        cookAccepted: true,
        userAccepted: undefined,
        latitude,
        longitude,
        locationText,
        dateTime,
        preparationTime: 120,
        duration,
        adultParticipants,
        children,
        // todo
        totalAmountUser: 0,
        totalAmountCook: 0,
        currencyCode: 'EUR',
        fee: 18,
        occasion,
        kitchenId,
        globalBookingRequestId,
        createdAt: new Date(),
        paymentData: {
            provider: 'STRIPE',
            setupIntentId: '',
            clientSecret: '',
            confirmed: false,
            unlocked: false,
        },
    });

    if (!success) return false;

    const messageSuccess: boolean = await dataSourceAdapter.chatMessageRepository.insertOne({
        chatMessageId: createNanoId(),
        bookingRequestId,
        message,
        generated: false,
        createdBy: userId,
        createdAt: new Date(),
    });

    if (!messageSuccess) logger.info('persisting message for booking request failed');

    if (user.emailAddress) {
        const customerEmailSuccess: boolean = await emailAdapter.sendToOne(
            'PeopleEat',
            user.emailAddress,
            `${cookUser.firstName} hat Deine Anfrage akzeptiert`,
            cookBookingRequestCustomerConfirmation({
                webAppUrl,
                customer: {
                    firstName: user.firstName,
                },
                cook: {
                    firstName: cookUser.firstName,
                    profilePictureUrl: cookUser.profilePictureUrl ?? '',
                },
                bookingRequest: {
                    occasion,
                    children,
                    adults: adultParticipants,
                    location: locationText,
                    date: dateTime.toDateString(),
                    time: moment(dateTime).format('LT'),
                    price: {
                        perPerson: 0,
                        // amount / (children + adultParticipants),
                        total: 0,
                        // amount,
                        currency: 'EUR',
                        // currencyCode,
                    },
                },
                chatMessage: message.trim(),
            }),
        );

        if (!customerEmailSuccess) logger.info('sending email failed');
    }

    if (cookUser.emailAddress) {
        const customerEmailSuccess: boolean = await emailAdapter.sendToOne(
            user.firstName,
            cookUser.emailAddress,
            'Du hast eine Buchungsanfrage akzeptiert',
            globalBookingRequestCookConfirmation({
                webAppUrl,
                customer: {
                    firstName: user.firstName,
                },
                globalBookingRequest: {
                    occasion,
                    adults: adultParticipants,
                    children,
                    location: locationText,
                    date: dateTime.toDateString(),
                    time: moment(dateTime).format('LT'),
                    price: {
                        perPerson: 0,
                        // amount / (children + adultParticipants),
                        total: 0,
                        // amount,
                        currency: 'EUR',
                        // currencyCode,
                    },
                },
                chatMessage: message,
            }),
        );

        if (!customerEmailSuccess) logger.info('sending email failed');
    }

    return true;
}
