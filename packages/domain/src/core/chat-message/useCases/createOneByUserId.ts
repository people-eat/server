import { bookingRequestNewMessage } from '@people-eat/server-adapter-email-template';
import { Authorization, type ChatMessage, type DataSource, type Email, type Logger } from '../../..';
import { type DBBookingRequest, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type Publisher } from '../../Service';
import { type NanoId } from '../../shared';
import { type CreateOneChatMessageRequest } from '../CreateOneChatMessageRequest';

export interface CreateOneChatMessageByUserIdInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    emailAdapter: Email.Adapter;
    webAppUrl: string;
    context: Authorization.Context;
    publisher: Publisher;
    request: { userId: NanoId; bookingRequestId: NanoId } & CreateOneChatMessageRequest;
}

export async function createOneByUserId({
    dataSourceAdapter,
    logger,
    emailAdapter,
    webAppUrl,
    context,
    publisher,
    request,
}: CreateOneChatMessageByUserIdInput): Promise<boolean> {
    const { userId, bookingRequestId, message } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        userId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    if (!(bookingRequest.cookAccepted === true && bookingRequest.userAccepted === true)) return false;

    const customerUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId });

    if (!customerUser) return false;

    const cookUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.cookId });

    if (!cookUser) return false;

    const chatMessage: ChatMessage = {
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: message.trim(),
        generated: false,
        createdBy: userId,
        createdAt: new Date(),
    };

    const success: boolean = await dataSourceAdapter.chatMessageRepository.insertOne(chatMessage);

    await publisher.publish(`booking-request-chat-message-creations-${bookingRequestId}`, {
        bookingRequestChatMessageCreations: chatMessage,
    });

    if (!cookUser.emailAddress) return true;

    emailAdapter
        .sendToOne(
            'PeopleEat',
            cookUser.emailAddress,
            ` Neue Nachricht ${customerUser.firstName}`,
            bookingRequestNewMessage({
                webAppUrl,
                recipient: { firstName: cookUser.firstName },
                sender: { firstName: customerUser.firstName },
                message,
                destination: 'COOK',
                bookingRequestId,
            }),
        )
        .then((cookEmailSuccess: boolean) => {
            if (!cookEmailSuccess) logger.info('sending email failed');
        })
        .catch(() => undefined);

    return success;
}
