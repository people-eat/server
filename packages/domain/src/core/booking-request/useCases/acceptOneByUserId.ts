import moment from 'moment';
import { Authorization, type ChatMessage } from '../../..';
import { type DBBookingRequest, type DBCook } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { createOneTimeTriggeredTask } from '../../time-triggered-tasks/useCases/createOne';

export interface AcceptOneBookingRequestByUserIdInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { userId: NanoId; bookingRequestId: NanoId };
}

// eslint-disable-next-line max-statements
export async function acceptOneByUserId({ runtime, context, request }: AcceptOneBookingRequestByUserIdInput): Promise<boolean> {
    const { dataSourceAdapter, logger, publisher, paymentAdapter } = runtime;
    const { userId, bookingRequestId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        userId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    const cook: DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({
        cookId: bookingRequest.cookId,
    });

    if (!cook) return false;

    const [payoutMethod] = cook.payoutMethods ?? [];

    if (!payoutMethod?.active) {
        runtime.logger.error('Cook without payout methods tried to accept a booking - in user accepted');
        return false;
    }

    if (bookingRequest.userAccepted === true) return false;

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { userId, bookingRequestId },
        { userAccepted: true },
    );

    if (!success) return false;

    // Notifications
    const chatMessage: ChatMessage = {
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: `Kunde hat die Buchungsanfrage akzeptiert`,
        generated: true,
        createdBy: userId,
        createdAt: new Date(),
    };

    await dataSourceAdapter.chatMessageRepository.insertOne(chatMessage);

    await publisher.publish(`booking-request-chat-message-creations-${bookingRequestId}`, {
        bookingRequestChatMessageCreations: chatMessage,
    });

    if (!bookingRequest.cookAccepted) return true;

    // Pay if ready

    const daysUntilEvent: number = moment(bookingRequest.dateTime).diff(moment(), 'days');

    if (daysUntilEvent === 15) {
        // send email
        await createOneTimeTriggeredTask(runtime, {
            dueDate: moment(bookingRequest.dateTime).subtract(14, 'days').toDate(),
            task: { type: 'TIME_TRIGGERED_TASK_PULL_PAYMENT', bookingRequestId },
        });

        return true;
    }

    if (daysUntilEvent > 15) {
        await createOneTimeTriggeredTask(runtime, {
            dueDate: moment(bookingRequest.dateTime).subtract(15, 'days').toDate(),
            task: { type: 'TIME_TRIGGERED_TASK_PULL_PAYMENT_ANNOUNCEMENT', bookingRequestId },
        });
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
