import { customerPaymentAnnouncement } from '@people-eat/server-adapter-email-template';
import moment from 'moment';
import { type DBBookingRequest, type DBCook, type DBUser } from '../../../data-source';
import { type Runtime } from '../../Runtime';
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
                    date: moment(bookingRequest.dateTime).format('L'),
                    time: moment(bookingRequest.dateTime).format('LT'),
                    price: {
                        total: bookingRequest.totalAmountUser,
                        currency: bookingRequest.currencyCode,
                    },
                },
            }),
        );

        if (!emailSuccess) return;

        await dataSourceAdapter.timeTriggeredTaskRepository.deleteOne({ timeTriggeredTaskId: timeTriggeredTask.timeTriggeredTaskId });
    }
}
