import { bookingRequestNewMessage } from '@people-eat/server-adapter-email-template';
import { Authorization, type ChatMessage, type DataSource, type Email, type Logger } from '../../..';
import { type DBBookingRequest, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type Publisher } from '../../Service';
import { type NanoId } from '../../shared';
import { type CreateOneChatMessageRequest } from '../CreateOneChatMessageRequest';

export interface CreateOneChatMessageByCookIdInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    emailAdapter: Email.Adapter;
    webAppUrl: string;
    context: Authorization.Context;
    publisher: Publisher;
    request: { cookId: NanoId; bookingRequestId: NanoId } & CreateOneChatMessageRequest;
}

export async function createOneByCookId({
    dataSourceAdapter,
    logger,
    emailAdapter,
    webAppUrl,
    context,
    publisher,
    request,
}: CreateOneChatMessageByCookIdInput): Promise<boolean> {
    const { cookId, bookingRequestId, message } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        cookId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    if (!(bookingRequest.cookAccepted === true && bookingRequest.userAccepted === true)) return false;

    const cookUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cookId });

    if (!cookUser) return false;

    const customerUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.userId });

    if (!customerUser) return false;

    const chatMessage: ChatMessage = {
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: message.trim(),
        generated: false,
        createdBy: cookId,
        createdAt: new Date(),
    };

    const success: boolean = await dataSourceAdapter.chatMessageRepository.insertOne(chatMessage);

    await publisher.publish(`booking-request-chat-message-creations-${bookingRequestId}`, {
        bookingRequestChatMessageCreations: chatMessage,
    });

    if (!customerUser.emailAddress) return true;

    emailAdapter
        .sendToOne(
            'PeopleEat',
            customerUser.emailAddress,
            `Neue Nachricht ${cookUser.firstName}`,
            bookingRequestNewMessage({
                webAppUrl,
                recipient: { firstName: customerUser.firstName },
                sender: { firstName: cookUser.firstName },
                message,
                destination: 'CUSTOMER',
                bookingRequestId,
            }),
        )
        .then((cookEmailSuccess: boolean) => {
            if (!cookEmailSuccess) logger.info('sending email failed');
        })
        .catch(() => undefined);

    return success;
}
