import { type Session } from '../../core';
import { type NanoId } from '../../core/shared';

export interface DBSession extends Omit<Session, 'isAssignedToUser'> {
    userId: NanoId | undefined;
}
