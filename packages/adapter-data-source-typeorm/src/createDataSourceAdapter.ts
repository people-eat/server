import { type DataSource, type Logger } from '@people-eat/server-domain';
import 'reflect-metadata';
import { DataSource as TypeORMDataSource } from 'typeorm';
import createGenericRepository from './createGenericRepository';
import * as entities from './entities';

/* eslint-disable sort-keys */

export interface CreateDataSourceAdapterOptions {
    logger: Logger.Adapter;
    connection: {
        databaseHost: string;
        databasePort: number;
        databaseName: string;
        databaseUser: string;
        databasePassword: string;
    };
    reset: boolean;
}

export async function createDataSourceAdapter({ logger, connection, reset }: CreateDataSourceAdapterOptions): Promise<DataSource.Adapter> {
    const AppDataSource: TypeORMDataSource = new TypeORMDataSource({
        type: 'mysql',
        host: connection.databaseHost,
        port: connection.databasePort,
        database: connection.databaseName,
        username: connection.databaseUser,
        password: connection.databasePassword,
        entities,
        synchronize: reset,
        dropSchema: reset,
    });

    const { options } = await AppDataSource.initialize();
    logger.info(`🔌 TypeORM connected to ${options.type} database`);

    return {
        logRepository: createGenericRepository(AppDataSource.getRepository(entities.LogEntity), logger),
        userRepository: createGenericRepository(AppDataSource.getRepository(entities.UserEntity), logger),

        oneTimeAccessTokenRepository: createGenericRepository(AppDataSource.getRepository(entities.OneTimeAccessTokenEntity), logger),
        emailAddressUpdateRepository: createGenericRepository(AppDataSource.getRepository(entities.EmailAddressUpdateEntity), logger),
        phoneNumberUpdateRepository: createGenericRepository(AppDataSource.getRepository(entities.PhoneNumberUpdateEntity), logger),
        addressRepository: createGenericRepository(AppDataSource.getRepository(entities.AddressEntity), logger),
        notificationRepository: createGenericRepository(AppDataSource.getRepository(entities.NotificationEntity), logger),
        notificationConfigurationRepository: createGenericRepository(
            AppDataSource.getRepository(entities.NotificationConfigurationEntity),
            logger,
        ),

        sessionRepository: createGenericRepository(AppDataSource.getRepository(entities.SessionEntity), logger),
        cookVisitRepository: createGenericRepository(AppDataSource.getRepository(entities.CookVisitEntity), logger),
        menuVisitRepository: createGenericRepository(AppDataSource.getRepository(entities.MenuVisitEntity), logger),

        adminRepository: createGenericRepository(AppDataSource.getRepository(entities.AdminEntity), logger),
        privacyPolicyUpdateRepository: createGenericRepository(AppDataSource.getRepository(entities.PrivacyPolicyUpdateEntity), logger),
        termsUpdateRepository: createGenericRepository(AppDataSource.getRepository(entities.TermsUpdateEntity), logger),
        cookSpecificFeeRepository: createGenericRepository(AppDataSource.getRepository(entities.CookSpecificFeeEntity), logger),
        customerFeeUpdateRepository: createGenericRepository(AppDataSource.getRepository(entities.CustomerFeeUpdateEntity), logger),
        searchRequestRepository: createGenericRepository(AppDataSource.getRepository(entities.SearchRequestEntity), logger),

        cookRepository: createGenericRepository(AppDataSource.getRepository(entities.CookEntity), logger),
        languageRepository: createGenericRepository(AppDataSource.getRepository(entities.LanguageEntity), logger),
        cookLanguageRepository: createGenericRepository(AppDataSource.getRepository(entities.CookLanguageEntity), logger),
        favoriteCookRepository: createGenericRepository(AppDataSource.getRepository(entities.FavoriteCookEntity), logger),

        mealRepository: createGenericRepository(AppDataSource.getRepository(entities.MealEntity), logger),
        menuRepository: createGenericRepository(AppDataSource.getRepository(entities.MenuEntity), logger),
        courseRepository: createGenericRepository(AppDataSource.getRepository(entities.CourseEntity), logger),
        mealOptionRepository: createGenericRepository(AppDataSource.getRepository(entities.MealOptionEntity), logger),
        kitchenRepository: createGenericRepository(AppDataSource.getRepository(entities.KitchenEntity), logger),
        categoryRepository: createGenericRepository(AppDataSource.getRepository(entities.CategoryEntity), logger),
        menuCategoryRepository: createGenericRepository(AppDataSource.getRepository(entities.MenuCategoryEntity), logger),

        globalBookingRequestRepository: createGenericRepository(AppDataSource.getRepository(entities.GlobalBookingRequestEntity), logger),
        bookingRequestRepository: createGenericRepository(AppDataSource.getRepository(entities.BookingRequestEntity), logger),
        allergyRepository: createGenericRepository(AppDataSource.getRepository(entities.AllergyEntity), logger),
        bookingRequestAllergyRepository: createGenericRepository(AppDataSource.getRepository(entities.BookingRequestAllergyEntity), logger),
        chatMessageRepository: createGenericRepository(AppDataSource.getRepository(entities.ChatMessageEntity), logger),
        configuredMenuRepository: createGenericRepository(AppDataSource.getRepository(entities.ConfiguredMenuEntity), logger),

        cookRatingRepository: createGenericRepository(AppDataSource.getRepository(entities.CookRatingEntity), logger),
        userRatingRepository: createGenericRepository(AppDataSource.getRepository(entities.UserRatingEntity), logger),

        supportRequestRepository: createGenericRepository(AppDataSource.getRepository(entities.SupportRequestEntity), logger),
        timeTriggeredTaskRepository: createGenericRepository(AppDataSource.getRepository(entities.TimeTriggeredTaskEntity), logger),

        giftCardPromoCodeRepository: createGenericRepository(AppDataSource.getRepository(entities.GiftCardPromoCodeEntity), logger),

        newsletterSubscriptionRepository: createGenericRepository(
            AppDataSource.getRepository(entities.NewsletterSubscriptionEntity),
            logger,
        ),

        query: <T>(request: string) => AppDataSource.query(request) as Promise<T>,
    };
}
