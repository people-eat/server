import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { createOne } from './useCases/createOne';

export interface NewsletterSubscriptionService {
    createOne(context: Authorization.Context, request: { emailAddress: string }): Promise<boolean>;
}

export function createNewsletterSubscriptionService(runtime: Runtime): NewsletterSubscriptionService {
    return {
        createOne: (context: Authorization.Context, request: { emailAddress: string }) => createOne({ runtime, context, request }),
    };
}
