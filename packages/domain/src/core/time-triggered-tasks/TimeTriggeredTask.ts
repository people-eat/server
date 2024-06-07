import { type NanoId } from '../shared';

export interface TimeTriggeredTaskPullPayment {
    type: 'TIME_TRIGGERED_TASK_PULL_PAYMENT';
    bookingRequestId: NanoId;
}

export interface TimeTriggeredTaskPullPaymentAnnouncement {
    type: 'TIME_TRIGGERED_TASK_PULL_PAYMENT_ANNOUNCEMENT';
    bookingRequestId: NanoId;
}

export interface TimeTriggeredTaskSendGiftCard {
    type: 'TIME_TRIGGERED_TASK_SEND_GIFT_CARD';
    giftCardId: NanoId;
}

export type TimeTriggeredTaskVariation =
    | TimeTriggeredTaskPullPayment
    | TimeTriggeredTaskPullPaymentAnnouncement
    | TimeTriggeredTaskSendGiftCard;

export interface TimeTriggeredTask {
    timeTriggeredTaskId: NanoId;
    dueDate: Date;
    task: TimeTriggeredTaskVariation;
    createdAt: Date;
}
