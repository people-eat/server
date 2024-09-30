import { type User } from '../core';

export interface Adapter {
    sendToOne(
        sender: string,
        recipient: string | Pick<User, 'userId' | 'firstName' | 'lastName' | 'emailAddress' | 'phoneNumber'>,
        subject: string,
        message: string | { klaviyoListId: string; data: Record<string, string> },
    ): Promise<boolean>;
    sendToMany(
        sender: string,
        recipient: string[] | Pick<User, 'userId' | 'firstName' | 'lastName' | 'emailAddress' | 'phoneNumber'>[],
        subject: string,
        message: string | { klaviyoListId: string; data: Record<string, string> },
    ): Promise<boolean>;
}
