import { type Authorization, type Service } from '@people-eat/server-domain';
import { type GQLNewsletterSubscriptionMutationCreateOneArgs } from '../generated';
import { type Resolvers } from '../Resolvers';

export function createNewsletterSubscriptionResolvers(service: Service): Resolvers<'NewsletterSubscriptionMutation'> {
    return {
        NewsletterSubscriptionMutation: {
            createOne: async (
                _: unknown,
                { emailAddress }: GQLNewsletterSubscriptionMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.newsletterSubscription.createOne(context, { emailAddress }),
        },
    };
}
