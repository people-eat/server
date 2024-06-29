import { customerPaymentAnnouncement, giftCardReceived } from '@people-eat/server-adapter-email-template';
import moment, { type Moment } from 'moment';
import { type DBBookingRequest, type DBCook, type DBGiftCard, type DBUser } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type TimeTriggeredTask } from '../TimeTriggeredTask';

// eslint-disable-next-line max-statements
export async function handleTimeTriggeredTask(runtime: Runtime, timeTriggeredTask: TimeTriggeredTask): Promise<void> {
    const { dataSourceAdapter, paymentAdapter, emailAdapter } = runtime;

    if (timeTriggeredTask.task.type === 'TIME_TRIGGERED_TASK_PULL_PAYMENT') {
        runtime.logger.debug('Pull payment trigger was called');
        const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
            bookingRequestId: timeTriggeredTask.task.bookingRequestId,
        });

        if (!bookingRequest) return;

        const cook: DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({
            cookId: bookingRequest.cookId,
        });

        if (!cook) return;

        const [payoutMethod] = cook.payoutMethods ?? [];

        if (!payoutMethod?.active) {
            runtime.logger.error('Time triggered pull payment task failed because cook had no payout methods');
            return;
        }

        const paymentSuccess: boolean = await paymentAdapter.STRIPE.createPaymentIntentFromSetupIntent({
            currencyCode: bookingRequest.currencyCode,
            pullAmount: bookingRequest.totalAmountUser,
            payoutAmount: bookingRequest.totalAmountCook,
            userId: bookingRequest.userId,
            setupIntentId: bookingRequest.paymentData.setupIntentId,
            destinationAccountId: payoutMethod.stripeAccountId,
        });

        if (!paymentSuccess) return;

        await dataSourceAdapter.timeTriggeredTaskRepository.deleteOne({ timeTriggeredTaskId: timeTriggeredTask.timeTriggeredTaskId });
    }

    if (timeTriggeredTask.task.type === 'TIME_TRIGGERED_TASK_PULL_PAYMENT_ANNOUNCEMENT') {
        runtime.logger.debug('Announce pull payment was called');
        const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
            bookingRequestId: timeTriggeredTask.task.bookingRequestId,
        });

        if (!bookingRequest) return;

        const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.userId });

        if (!user || !user.emailAddress) return;

        const pullPaymentDate: Moment = moment(bookingRequest.dateTime).subtract(14, 'days');

        const emailSuccess: boolean = await emailAdapter.sendToOne(
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
                    // todo: also pass the pull date
                    date: moment(bookingRequest.dateTime).format('L'),
                    time: moment(bookingRequest.dateTime).format('LT'),
                    price: {
                        total: bookingRequest.totalAmountUser,
                        currency: bookingRequest.currencyCode,
                    },
                },
                pullPaymentDate: pullPaymentDate.format('L'),
            }),
        );

        if (!emailSuccess) return;

        await dataSourceAdapter.timeTriggeredTaskRepository.deleteOne({ timeTriggeredTaskId: timeTriggeredTask.timeTriggeredTaskId });
    }

    if (timeTriggeredTask.task.type === 'TIME_TRIGGERED_TASK_SEND_GIFT_CARD') {
        const giftCardId: NanoId = timeTriggeredTask.task.giftCardId;
        const giftCard: DBGiftCard | undefined = await dataSourceAdapter.giftCardRepository.findOne({ giftCardId });
        if (!giftCard) return;

        const { redeemCode, userId, buyer, occasion, recipient, message, initialBalanceAmount, expiresAt } = giftCard;

        if (userId && recipient.deliveryInformation) {
            const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId });
            if (!user || !user.emailAddress) return;

            await emailAdapter.sendToOne(
                'PeopleEat',
                recipient.deliveryInformation.emailAddress,
                `${user.firstName} hat dir ein Geschenk geschickt`,
                giftCardReceived({
                    buyer: { firstName: user.firstName, lastName: user.lastName },
                    occasion,
                    message,
                    recipient,
                    balance: initialBalanceAmount,
                    redeemCode,
                    formattedExpirationDate: moment(expiresAt).format('L'),
                }),
            );
        }

        if (buyer && recipient.deliveryInformation) {
            await emailAdapter.sendToOne(
                'PeopleEat',
                recipient.deliveryInformation.emailAddress,
                `${buyer.firstName} hat dir ein Geschenk geschickt`,
                giftCardReceived({
                    buyer,
                    occasion,
                    message,
                    recipient,
                    balance: initialBalanceAmount,
                    redeemCode,
                    formattedExpirationDate: moment(expiresAt).format('L'),
                }),
            );
        }

        await dataSourceAdapter.timeTriggeredTaskRepository.deleteOne({ timeTriggeredTaskId: timeTriggeredTask.timeTriggeredTaskId });
    }
}
