import { type DataSource, type Email, type IdentityProvider, type Klaviyo, type Logger, type PaymentProvider, type SMS } from '..';
import { type Publisher } from './Service';

export interface Runtime {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    emailAdapter: Email.Adapter;
    klaviyoEmailAdapter: Klaviyo.Adapter;
    smsAdapter: SMS.Adapter;
    identityProviderAdapter: IdentityProvider.Adapter;
    paymentAdapter: PaymentProvider.Adapter;
    serverUrl: string;
    webAppUrl: string;
    publisher: Publisher;
    notificationEmailAddresses: string[];
}
