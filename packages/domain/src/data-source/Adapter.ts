import { type DBGiftCardPromoCode, type DBMenu } from './entities';
import { type DBAddress } from './entities/Address';
import { type DBBookingRequest } from './entities/BookingRequest';
import { type DBCook } from './entities/Cook';
import { type DBEmailAddressUpdate } from './entities/EmailAddressUpdate';
import { type DBGlobalBookingRequest } from './entities/GlobalBookingRequest';
import { type DBOneTimeAccessToken } from './entities/OneTimeAccessToken';
import { type DBPhoneNumberUpdate } from './entities/PhoneNumberUpdate';
import {
    type DBAdmin,
    type DBAllergy,
    type DBBookingRequestAllergy,
    type DBCategory,
    type DBChatMessage,
    type DBConfiguredMenu,
    type DBCookLanguage,
    type DBCookRating,
    type DBCookSpecificFee,
    type DBCookVisit,
    type DBCourse,
    type DBCustomerFeeUpdate,
    type DBFavoriteCook,
    type DBKitchen,
    type DBLanguage,
    type DBLog,
    type DBMeal,
    type DBMealOption,
    type DBMenuCategory,
    type DBMenuVisit,
    type DBNotification,
    type DBNotificationConfiguration,
    type DBPrivacyPolicyUpdate,
    type DBSearchRequest,
    type DBSession,
    type DBSupportRequest,
    type DBTermsUpdate,
    type DBTimeTriggeredTask,
    type DBUserRating,
} from './entities/unchanged';
import { type DBUser } from './entities/User';
import { type Repository } from './Repository';

export interface Adapter {
    logRepository: Repository<DBLog>;

    userRepository: Repository<DBUser>;
    oneTimeAccessTokenRepository: Repository<DBOneTimeAccessToken>;
    emailAddressUpdateRepository: Repository<DBEmailAddressUpdate>;
    phoneNumberUpdateRepository: Repository<DBPhoneNumberUpdate>;
    addressRepository: Repository<DBAddress>;
    notificationRepository: Repository<DBNotification>;
    notificationConfigurationRepository: Repository<DBNotificationConfiguration>;

    sessionRepository: Repository<DBSession>;
    cookVisitRepository: Repository<DBCookVisit>;
    menuVisitRepository: Repository<DBMenuVisit>;

    adminRepository: Repository<DBAdmin>;
    privacyPolicyUpdateRepository: Repository<DBPrivacyPolicyUpdate>;
    termsUpdateRepository: Repository<DBTermsUpdate>;
    cookSpecificFeeRepository: Repository<DBCookSpecificFee>;
    customerFeeUpdateRepository: Repository<DBCustomerFeeUpdate>;
    searchRequestRepository: Repository<DBSearchRequest>;

    cookRepository: Repository<DBCook>;
    languageRepository: Repository<DBLanguage>;
    cookLanguageRepository: Repository<DBCookLanguage>;
    favoriteCookRepository: Repository<DBFavoriteCook>;

    mealRepository: Repository<DBMeal>;
    menuRepository: Repository<DBMenu>;
    courseRepository: Repository<DBCourse>;
    mealOptionRepository: Repository<DBMealOption>;
    kitchenRepository: Repository<DBKitchen>;
    categoryRepository: Repository<DBCategory>;
    menuCategoryRepository: Repository<DBMenuCategory>;

    globalBookingRequestRepository: Repository<DBGlobalBookingRequest>;
    bookingRequestRepository: Repository<DBBookingRequest>;
    allergyRepository: Repository<DBAllergy>;
    bookingRequestAllergyRepository: Repository<DBBookingRequestAllergy>;
    chatMessageRepository: Repository<DBChatMessage>;
    configuredMenuRepository: Repository<DBConfiguredMenu>;

    cookRatingRepository: Repository<DBCookRating>;
    userRatingRepository: Repository<DBUserRating>;

    supportRequestRepository: Repository<DBSupportRequest>;
    timeTriggeredTaskRepository: Repository<DBTimeTriggeredTask>;

    giftCardPromoCodeRepository: Repository<DBGiftCardPromoCode>;

    query: <T>(request: string) => Promise<T>;
}
