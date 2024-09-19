import { type User } from '../../core/user/User';

export interface DBUser extends Omit<User, 'hasPasswordSetUp'> {
    isLocked: boolean;
    password?: string;
    failedSignInAttempts: number;
}
