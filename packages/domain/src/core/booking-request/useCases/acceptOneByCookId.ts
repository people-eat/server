import { cookBookingRequestCookAcceptedNotification, customerPaymentAnnouncement } from '@people-eat/server-adapter-email-template';
import moment from 'moment';
import { Authorization, type ChatMessage } from '../../..';
import { type DBBookingRequest, type DBCook, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { createOneTimeTriggeredTask } from '../../time-triggered-tasks/useCases/createOne';

export interface AcceptOneBookingRequestByCookIdInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { cookId: NanoId; bookingRequestId: NanoId };
}

// eslint-disable-next-line max-statements
export async function acceptOneByCookId({ runtime, context, request }: AcceptOneBookingRequestByCookIdInput): Promise<boolean> {
    const { dataSourceAdapter, paymentAdapter, logger, emailAdapter, webAppUrl, publisher } = runtime;
    const { cookId, bookingRequestId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        cookId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.userId });

    if (!user) return false;

    const cookUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.cookId });

    if (!cookUser) return false;

    const cook: DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId: bookingRequest.cookId });

    if (!cook) return false;

    const [payoutMethod] = cook.payoutMethods ?? [];

    if (!payoutMethod?.active) {
        runtime.logger.error('Cook without payout methods tried to accept a booking');
        return false;
    }

    if (bookingRequest.cookAccepted === true) return false;

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { cookId, bookingRequestId },
        { cookAccepted: true },
    );

    if (!success) return false;

    // Notifications

    const chatMessage: ChatMessage = {
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: `${cookUser.firstName} hat die Buchungsanfrage akzeptiert`,
        generated: true,
        createdBy: cookId,
        createdAt: new Date(),
    };

    await dataSourceAdapter.chatMessageRepository.insertOne(chatMessage);

    await publisher.publish(`booking-request-chat-message-creations-${bookingRequestId}`, {
        bookingRequestChatMessageCreations: chatMessage,
    });

    if (user.emailAddress) {
        const customerEmailSuccess: boolean = await emailAdapter.sendToOne(
            'PeopleEat',
            user.emailAddress,
            'Bestätigung Deiner Buchungsanfrage',
            cookBookingRequestCookAcceptedNotification({
                webAppUrl,
                customer: {
                    firstName: user.firstName,
                },
                cook: {
                    firstName: cookUser.firstName,
                    profilePictureUrl: cookUser.profilePictureUrl ?? '',
                },
                bookingRequest: {
                    bookingRequestId,
                    occasion: bookingRequest.occasion,
                    children: bookingRequest.children,
                    adults: bookingRequest.adultParticipants,
                    location: bookingRequest.locationText,
                    date: moment(bookingRequest.dateTime).format('L'),
                    time: moment(bookingRequest.dateTime).format('LT'),
                    price: {
                        perPerson: bookingRequest.totalAmountUser / (bookingRequest.children + bookingRequest.adultParticipants),
                        total: bookingRequest.totalAmountUser,
                        currency: bookingRequest.currencyCode,
                    },
                },
            }),
        );

        if (!customerEmailSuccess) logger.info('sending email failed');
    }

    // pub sub

    // await runtime.publisher.publish(
    //     `booking-request-updates-by-user-id-${bookingRequestId}`,
    //     await findOneByUserId({ runtime, context, request: { bookingRequestId, userId: bookingRequest.userId } }),
    // );

    // await runtime.publisher.publish(
    //     `booking-request-updates-by-cook-id-${bookingRequestId}`,
    //     await findOneByCookId({ runtime, context, request: { bookingRequestId, cookId: bookingRequest.cookId } }),
    // );

    // end of pub sub

    if (!bookingRequest.userAccepted) return true;

    // Pay if ready

    const daysUntilEvent: number = moment(bookingRequest.dateTime).diff(moment(), 'days');

    if (daysUntilEvent === 15) {
        if (user.emailAddress) {
            await emailAdapter.sendToOne(
                'PeopleEat',
                user.emailAddress,
                'Deine Zahlung steht bevor',
                customerPaymentAnnouncement({
                    customer: {
                        firstName: user.firstName,
                        profilePictureUrl: user.profilePictureUrl ?? '',
                    },
                    bookingRequest: {
                        bookingRequestId: bookingRequest.bookingRequestId,
                        occasion: bookingRequest.occasion,
                        date: moment(bookingRequest.dateTime).format('L'),
                        time: moment(bookingRequest.dateTime).format('LT'),
                        price: {
                            total: bookingRequest.totalAmountUser,
                            currency: bookingRequest.currencyCode,
                        },
                    },
                }),
            );
        }
        await createOneTimeTriggeredTask(runtime, {
            dueDate: moment(bookingRequest.dateTime).subtract(14, 'days').toDate(),
            task: { type: 'TIME_TRIGGERED_TASK_PULL_PAYMENT', bookingRequestId },
        });

        return true;
    }

    if (daysUntilEvent > 15) {
        if (user.emailAddress) {
            await createOneTimeTriggeredTask(runtime, {
                dueDate: moment(bookingRequest.dateTime).subtract(15, 'days').toDate(),
                task: { type: 'TIME_TRIGGERED_TASK_PULL_PAYMENT_ANNOUNCEMENT', bookingRequestId },
            });
        }
        await createOneTimeTriggeredTask(runtime, {
            dueDate: moment(bookingRequest.dateTime).subtract(14, 'days').toDate(),
            task: { type: 'TIME_TRIGGERED_TASK_PULL_PAYMENT', bookingRequestId },
        });

        return true;
    }

    const paymentSuccess: boolean = await paymentAdapter.STRIPE.createPaymentIntentFromSetupIntent({
        currencyCode: bookingRequest.currencyCode,
        pullAmount: bookingRequest.totalAmountUser,
        payoutAmount: bookingRequest.totalAmountCook,
        userId: bookingRequest.userId,
        setupIntentId: bookingRequest.paymentData.setupIntentId,
        destinationAccountId: payoutMethod.stripeAccountId,
    });

    if (!paymentSuccess) return false;

    return true;
}
