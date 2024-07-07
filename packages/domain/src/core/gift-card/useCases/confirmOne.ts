import moment from 'moment';
import { type Authorization } from '../../..';
import { giftCardPurchaseConfirmation, giftCardReceived } from '../../../../../adapter-email-template/src';
import { type DBGiftCard, type DBUser } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { createOneTimeTriggeredTask } from '../../time-triggered-tasks/useCases/createOne';

export interface ConfirmOneGiftCardInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { giftCardId: NanoId };
}

export async function confirmOne({ runtime, request }: ConfirmOneGiftCardInput): Promise<boolean> {
    const { dataSourceAdapter, paymentAdapter, emailAdapter, notificationEmailAddresses } = runtime;

    const { giftCardId } = request;

    const giftCard: DBGiftCard | undefined = await dataSourceAdapter.giftCardRepository.findOne({
        giftCardId,
    });

    if (!giftCard) return false;

    const paymentIntentId: string = giftCard.paymentData.paymentIntentId;

    const paymentCompleted: boolean = await paymentAdapter.STRIPE.checkPaymentIntentCompleted(paymentIntentId);

    if (!paymentCompleted) return false;

    const persistingSuccess: boolean = await dataSourceAdapter.giftCardRepository.updateOne(
        { giftCardId },
        { paymentData: { ...giftCard.paymentData, confirmed: true } },
    );

    if (!persistingSuccess) return false;

    const { redeemCode, initialBalanceAmount, occasion, message, userId, buyer, recipient, expiresAt, invoiceAddress } = giftCard;

    if (userId) {
        const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId });
        if (!user || !user.emailAddress) return false;
        await emailAdapter.sendToOne(
            'PeopleEat',
            user.emailAddress,
            'Bestellbestätigung Gutschein',
            giftCardPurchaseConfirmation({
                buyer: { firstName: user.firstName },
                occasion,
                message,
                recipient,
                balance: initialBalanceAmount,
                automatedEmailDelivery: Boolean(recipient.deliveryInformation),
            }),
        );
        await emailAdapter.sendToOne(
            'PeopleEat',
            user.emailAddress,
            'Der Gutschein wurde erfolgreich erstellt',
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
        if (recipient.deliveryInformation) {
            await createOneTimeTriggeredTask(runtime, {
                dueDate: new Date(recipient.deliveryInformation.date),
                task: { type: 'TIME_TRIGGERED_TASK_SEND_GIFT_CARD', giftCardId },
            });
        }
    }

    if (buyer) {
        await emailAdapter.sendToOne(
            'PeopleEat',
            buyer.emailAddress,
            'Bestellbestätigung Gutschein',
            giftCardPurchaseConfirmation({
                buyer: { firstName: buyer.firstName },
                occasion,
                message,
                recipient,
                balance: initialBalanceAmount,
                automatedEmailDelivery: Boolean(recipient.deliveryInformation),
            }),
        );

        await emailAdapter.sendToOne(
            'PeopleEat',
            buyer.emailAddress,
            'Der Gutschein wurde erfolgreich erstellt',
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
        if (recipient.deliveryInformation) {
            await createOneTimeTriggeredTask(runtime, {
                dueDate: new Date(recipient.deliveryInformation.date),
                task: { type: 'TIME_TRIGGERED_TASK_SEND_GIFT_CARD', giftCardId },
            });
        }
    }

    // admin notification

    emailAdapter
        .sendToMany(
            'PeopleEat Bot',
            notificationEmailAddresses,
            'Ein Gutschein wurde gekauft',
            `Es wurde ein Gutschein im Wert von ${initialBalanceAmount / 100} € gekauft.<br/>Rechnungsadresse: ${invoiceAddress.postCode} ${
                invoiceAddress.city
            }, ${invoiceAddress.street} ${invoiceAddress.houseNumber},  ${invoiceAddress.country}
            `,
        )
        .then(() => undefined)
        .catch(() => undefined);

    return true;
}
