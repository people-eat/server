import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { FileUpload } from 'graphql-upload-minimal';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: string;
    DateTime: Date;
    EmailAddress: string;
    Latitude: number;
    Longitude: number;
    PhoneNumber: string;
    UInt: number;
    UUID: string;
    Upload: Promise<FileUpload>;
    Url: string;
};

export type GQLAddress = {
    __typename?: 'Address';
    addressId: Scalars['String'];
    city: Scalars['String'];
    country: Scalars['String'];
    createdAt: Scalars['DateTime'];
    houseNumber: Scalars['String'];
    location: GQLLocation;
    postCode: Scalars['String'];
    street: Scalars['String'];
    title: Scalars['String'];
};

export type GQLAdmin = {
    __typename?: 'Admin';
    adminId: Scalars['String'];
    user: GQLPublicUser;
};

export type GQLAdminGiftCardPromoCodeMutation = {
    __typename?: 'AdminGiftCardPromoCodeMutation';
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
};

export type GQLAdminGiftCardPromoCodeMutationCreateOneArgs = {
    giftCardPromoCode: GQLCreateOneGiftCardPromoCodeRequest;
};

export type GQLAdminGiftCardPromoCodeMutationDeleteOneArgs = {
    giftCardPromoCodeId: Scalars['String'];
};

export type GQLAdminGiftCardPromoCodeQuery = {
    __typename?: 'AdminGiftCardPromoCodeQuery';
    findMany: Array<GQLGiftCardPromoCode>;
};

export type GQLAdminMutation = {
    __typename?: 'AdminMutation';
    createOne: Scalars['Boolean'];
    giftCardPromoCodes: GQLAdminGiftCardPromoCodeMutation;
    unlockBookingRequestPayment: Scalars['Boolean'];
};

export type GQLAdminMutationCreateOneArgs = {
    request: GQLCreateOneAdminRequest;
};

export type GQLAdminMutationUnlockBookingRequestPaymentArgs = {
    bookingRequestId: Scalars['String'];
};

export type GQLAdminQuery = {
    __typename?: 'AdminQuery';
    findMany: Array<GQLAdmin>;
    findOne?: Maybe<GQLAdmin>;
    giftCardPromoCodes: GQLAdminGiftCardPromoCodeQuery;
};

export type GQLAdminQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLAdminQueryFindOneArgs = {
    adminId: Scalars['String'];
};

export type GQLAllergy = {
    __typename?: 'Allergy';
    allergyId: Scalars['String'];
    title: Scalars['String'];
};

export type GQLAllergyMutation = {
    __typename?: 'AllergyMutation';
    createOne: Scalars['Boolean'];
};

export type GQLAllergyQuery = {
    __typename?: 'AllergyQuery';
    findAll: Array<GQLAllergy>;
};

export type GQLAnonymousSession = {
    __typename?: 'AnonymousSession';
    anonymousUser?: Maybe<GQLAnonymousUser>;
    platform: GQLPlatform;
    sessionId: Scalars['String'];
    userId?: Maybe<Scalars['String']>;
};

export type GQLAnonymousUser = {
    __typename?: 'AnonymousUser';
    birthDate?: Maybe<Scalars['Date']>;
    createdAt: Scalars['DateTime'];
    gender: GQLGender;
    language: GQLUserLanguage;
};

export type GQLBookingRequest = {
    __typename?: 'BookingRequest';
    adultParticipants: Scalars['UInt'];
    allergies: Array<GQLAllergy>;
    bookingRequestId: Scalars['String'];
    children: Scalars['UInt'];
    configuredMenu?: Maybe<GQLConfiguredMenu>;
    cook: GQLPublicCook;
    cookAccepted?: Maybe<Scalars['Boolean']>;
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    dateTime: Scalars['DateTime'];
    duration: Scalars['UInt'];
    giftCard?: Maybe<GQLGiftCard>;
    giftCardPromoCode?: Maybe<GQLGiftCardPromoCode>;
    globalBookingRequestId?: Maybe<Scalars['String']>;
    kitchenId?: Maybe<Scalars['String']>;
    location: GQLLocation;
    message: Scalars['String'];
    occasion: Scalars['String'];
    preparationTime: Scalars['UInt'];
    price: GQLPrice;
    status: GQLBookingRequestStatus;
    user: GQLPublicUser;
    userAccepted?: Maybe<Scalars['Boolean']>;
    userId: Scalars['String'];
};

export type GQLBookingRequestQuery = {
    __typename?: 'BookingRequestQuery';
    findMany?: Maybe<Array<GQLBookingRequest>>;
    findOne?: Maybe<GQLBookingRequest>;
};

export type GQLBookingRequestQueryFindOneArgs = {
    bookingRequestId: Scalars['String'];
};

export type GQLBookingRequestStatus = 'CANCELED' | 'COMPLETED' | 'OPEN' | 'PENDING';

export type GQLCategory = {
    __typename?: 'Category';
    categoryId: Scalars['String'];
    title: Scalars['String'];
};

export type GQLCategoryMutation = {
    __typename?: 'CategoryMutation';
    createOne: Scalars['Boolean'];
};

export type GQLCategoryQuery = {
    __typename?: 'CategoryQuery';
    findAll: Array<GQLCategory>;
};

export type GQLChatMessage = {
    __typename?: 'ChatMessage';
    bookingRequestId: Scalars['String'];
    chatMessageId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    createdBy: Scalars['String'];
    generated: Scalars['Boolean'];
    message: Scalars['String'];
};

export type GQLConfiguredMenu = {
    __typename?: 'ConfiguredMenu';
    bookingRequestId: Scalars['String'];
    courses: Array<GQLConfiguredMenuCourse>;
    description: Scalars['String'];
    greetingFromKitchen?: Maybe<Scalars['String']>;
    kitchenId?: Maybe<Scalars['String']>;
    menuId?: Maybe<Scalars['String']>;
    title: Scalars['String'];
};

export type GQLConfiguredMenuCourse = {
    __typename?: 'ConfiguredMenuCourse';
    index: Scalars['UInt'];
    mealDescription: Scalars['String'];
    mealImageUrl?: Maybe<Scalars['String']>;
    mealTitle: Scalars['String'];
    mealType?: Maybe<GQLMealType>;
    title: Scalars['String'];
};

export type GQLCook = {
    __typename?: 'Cook';
    biography: Scalars['String'];
    bookingRequests: Array<GQLBookingRequest>;
    city: Scalars['String'];
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    followerCount: Scalars['UInt'];
    followers: Array<GQLFollowing>;
    hasStripePayoutMethodActivated: Scalars['Boolean'];
    isLocked: Scalars['Boolean'];
    isVisible: Scalars['Boolean'];
    languages: Array<GQLLanguage>;
    location: GQLLocation;
    maximumParticipants?: Maybe<Scalars['UInt']>;
    maximumPrice?: Maybe<Scalars['UInt']>;
    maximumTravelDistance?: Maybe<Scalars['UInt']>;
    mealCount: Scalars['UInt'];
    meals: Array<GQLMeal>;
    menuCount: Scalars['UInt'];
    menus: Array<GQLMenu>;
    minimumParticipants?: Maybe<Scalars['UInt']>;
    minimumPrice?: Maybe<Scalars['UInt']>;
    rank: GQLCookRank;
    ratingAverage: Scalars['UInt'];
    ratingCount: Scalars['UInt'];
    travelExpenses: Scalars['UInt'];
    user: GQLUser;
    visitStatistics: GQLCookVisitStatistics;
};

export type GQLCookBookingRequestChatMessageMutation = {
    __typename?: 'CookBookingRequestChatMessageMutation';
    bookingRequestId: Scalars['String'];
    cookId: Scalars['String'];
    createOne: Scalars['Boolean'];
};

export type GQLCookBookingRequestChatMessageMutationCreateOneArgs = {
    request: GQLCreateChatMessageRequest;
};

export type GQLCookBookingRequestChatMessageQuery = {
    __typename?: 'CookBookingRequestChatMessageQuery';
    bookingRequestId: Scalars['String'];
    cookId: Scalars['String'];
    findMany?: Maybe<Array<GQLChatMessage>>;
};

export type GQLCookBookingRequestChatMessageQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLCookBookingRequestMutation = {
    __typename?: 'CookBookingRequestMutation';
    accept: Scalars['Boolean'];
    chatMessages: GQLCookBookingRequestChatMessageMutation;
    cookId: Scalars['String'];
    createOne: Scalars['Boolean'];
    decline: Scalars['Boolean'];
    updatePrice: Scalars['Boolean'];
};

export type GQLCookBookingRequestMutationAcceptArgs = {
    bookingRequestId: Scalars['String'];
};

export type GQLCookBookingRequestMutationChatMessagesArgs = {
    bookingRequestId: Scalars['String'];
};

export type GQLCookBookingRequestMutationCreateOneArgs = {
    globalBookingRequestId: Scalars['String'];
};

export type GQLCookBookingRequestMutationDeclineArgs = {
    bookingRequestId: Scalars['String'];
};

export type GQLCookBookingRequestMutationUpdatePriceArgs = {
    bookingRequestId: Scalars['String'];
    price: GQLPriceInput;
};

export type GQLCookBookingRequestQuery = {
    __typename?: 'CookBookingRequestQuery';
    chatMessages: GQLCookBookingRequestChatMessageQuery;
    cookId: Scalars['String'];
    findMany?: Maybe<Array<GQLBookingRequest>>;
    findOne?: Maybe<GQLBookingRequest>;
};

export type GQLCookBookingRequestQueryChatMessagesArgs = {
    bookingRequestId: Scalars['String'];
};

export type GQLCookBookingRequestQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLCookBookingRequestQueryFindOneArgs = {
    bookingRequestId: Scalars['String'];
};

export type GQLCookCookRatingQuery = {
    __typename?: 'CookCookRatingQuery';
    cookId: Scalars['String'];
    findMany: Array<GQLCookRating>;
};

export type GQLCookCookVisitQuery = {
    __typename?: 'CookCookVisitQuery';
    cookId: Scalars['String'];
    findMany?: Maybe<Array<GQLAddress>>;
};

export type GQLCookCookVisitQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLCookFollowingQuery = {
    __typename?: 'CookFollowingQuery';
    findAll: Array<GQLFollowing>;
};

export type GQLCookGlobalBookingRequestQuery = {
    __typename?: 'CookGlobalBookingRequestQuery';
    cookId: Scalars['String'];
    findMany?: Maybe<Array<GQLGlobalBookingRequest>>;
    findOne?: Maybe<GQLGlobalBookingRequest>;
};

export type GQLCookGlobalBookingRequestQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLCookGlobalBookingRequestQueryFindOneArgs = {
    globalBookingRequestId: Scalars['String'];
};

export type GQLCookMealMutation = {
    __typename?: 'CookMealMutation';
    cookId: Scalars['String'];
    createOne: Scalars['Boolean'];
    deleteOne: GQLDeleteMealResult;
    updateDescription: Scalars['Boolean'];
    updateImage: Scalars['Boolean'];
    updateTitle: Scalars['Boolean'];
    updateType: Scalars['Boolean'];
};

export type GQLCookMealMutationCreateOneArgs = {
    image?: InputMaybe<Scalars['Upload']>;
    meal: GQLCreateOneMealRequest;
};

export type GQLCookMealMutationDeleteOneArgs = {
    mealId: Scalars['String'];
};

export type GQLCookMealMutationUpdateDescriptionArgs = {
    description: Scalars['String'];
    mealId: Scalars['String'];
};

export type GQLCookMealMutationUpdateImageArgs = {
    image?: InputMaybe<Scalars['Upload']>;
    mealId: Scalars['String'];
};

export type GQLCookMealMutationUpdateTitleArgs = {
    mealId: Scalars['String'];
    title: Scalars['String'];
};

export type GQLCookMealMutationUpdateTypeArgs = {
    mealId: Scalars['String'];
    type: GQLMealType;
};

export type GQLCookMealQuery = {
    __typename?: 'CookMealQuery';
    cookId: Scalars['String'];
    findMany: Array<GQLMeal>;
    findOne?: Maybe<GQLMeal>;
};

export type GQLCookMealQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLCookMealQueryFindOneArgs = {
    mealId: Scalars['String'];
};

export type GQLCookMenuCourseMealOptionMutation = {
    __typename?: 'CookMenuCourseMealOptionMutation';
    cookId: Scalars['String'];
    courseId: Scalars['String'];
    createMany: Scalars['Boolean'];
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    menuId: Scalars['String'];
};

export type GQLCookMenuCourseMealOptionMutationCreateManyArgs = {
    mealOptions: Array<GQLCreateOneMealOptionRequest>;
};

export type GQLCookMenuCourseMealOptionMutationCreateOneArgs = {
    mealOption: GQLCreateOneMealOptionRequest;
};

export type GQLCookMenuCourseMealOptionMutationDeleteOneArgs = {
    mealId: Scalars['String'];
};

export type GQLCookMenuCourseMealOptionQuery = {
    __typename?: 'CookMenuCourseMealOptionQuery';
    cookId: Scalars['String'];
    findMany: Array<GQLMealOption>;
    menuId: Scalars['String'];
};

export type GQLCookMenuCourseMealOptionQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLCookMenuCourseMutation = {
    __typename?: 'CookMenuCourseMutation';
    cookId: Scalars['String'];
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    mealOptions: GQLCookMenuCourseMealOptionMutation;
    menuId: Scalars['String'];
    updateTitle: Scalars['Boolean'];
};

export type GQLCookMenuCourseMutationCreateOneArgs = {
    request: GQLCreateOneCourseRequest;
};

export type GQLCookMenuCourseMutationDeleteOneArgs = {
    courseId: Scalars['String'];
};

export type GQLCookMenuCourseMutationMealOptionsArgs = {
    courseId: Scalars['String'];
};

export type GQLCookMenuCourseMutationUpdateTitleArgs = {
    courseId: Scalars['String'];
    title: Scalars['String'];
};

export type GQLCookMenuCourseQuery = {
    __typename?: 'CookMenuCourseQuery';
    cookId: Scalars['String'];
    findAll: Array<GQLCourse>;
    mealOptions: GQLCookMenuCourseMealOptionQuery;
    menuId: Scalars['String'];
};

export type GQLCookMenuCourseQueryMealOptionsArgs = {
    courseId: Scalars['String'];
};

export type GQLCookMenuMutation = {
    __typename?: 'CookMenuMutation';
    cookId: Scalars['String'];
    courses: GQLCookMenuCourseMutation;
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    updateBasePrice: Scalars['Boolean'];
    updateBasePriceCustomers: Scalars['Boolean'];
    updateCurrencyCode: Scalars['Boolean'];
    updateDescription: Scalars['Boolean'];
    updateGreetingFromKitchen: Scalars['Boolean'];
    updateIsVisible: Scalars['Boolean'];
    updateKeyMealOption: Scalars['Boolean'];
    updateKitchenId: Scalars['Boolean'];
    updatePreparationTime: Scalars['Boolean'];
    updatePricePerAdult: Scalars['Boolean'];
    updatePricePerChild: Scalars['Boolean'];
    updateTitle: Scalars['Boolean'];
};

export type GQLCookMenuMutationCoursesArgs = {
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationCreateOneArgs = {
    menu: GQLCreateOneMenuRequest;
};

export type GQLCookMenuMutationDeleteOneArgs = {
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdateBasePriceArgs = {
    basePrice: Scalars['UInt'];
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdateBasePriceCustomersArgs = {
    basePriceCustomers: Scalars['UInt'];
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdateCurrencyCodeArgs = {
    currencyCode: GQLCurrencyCode;
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdateDescriptionArgs = {
    description: Scalars['String'];
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdateGreetingFromKitchenArgs = {
    greetingFromKitchen?: InputMaybe<Scalars['String']>;
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdateIsVisibleArgs = {
    isVisible: Scalars['Boolean'];
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdateKeyMealOptionArgs = {
    keyMealOption?: InputMaybe<GQLUpdateOneMenuKeyMealOptionRequest>;
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdateKitchenIdArgs = {
    kitchenId?: InputMaybe<Scalars['String']>;
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdatePreparationTimeArgs = {
    menuId: Scalars['String'];
    preparationTime: Scalars['UInt'];
};

export type GQLCookMenuMutationUpdatePricePerAdultArgs = {
    menuId: Scalars['String'];
    pricePerAdult: Scalars['UInt'];
};

export type GQLCookMenuMutationUpdatePricePerChildArgs = {
    menuId: Scalars['String'];
    pricePerChild?: InputMaybe<Scalars['UInt']>;
};

export type GQLCookMenuMutationUpdateTitleArgs = {
    menuId: Scalars['String'];
    title: Scalars['String'];
};

export type GQLCookMenuQuery = {
    __typename?: 'CookMenuQuery';
    cookId: Scalars['String'];
    courses: GQLCookMenuCourseQuery;
    findMany: Array<GQLMenu>;
    findOne?: Maybe<GQLMenu>;
};

export type GQLCookMenuQueryCoursesArgs = {
    cookId: Scalars['String'];
    menuId: Scalars['String'];
};

export type GQLCookMenuQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLCookMenuQueryFindOneArgs = {
    menuId: Scalars['String'];
};

export type GQLCookMenuVisitQuery = {
    __typename?: 'CookMenuVisitQuery';
    cookId: Scalars['String'];
    findMany?: Maybe<Array<GQLAddress>>;
};

export type GQLCookMenuVisitQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLCookMutation = {
    __typename?: 'CookMutation';
    addOneLanguage: Scalars['Boolean'];
    bookingRequests: GQLCookBookingRequestMutation;
    createOne: Scalars['Boolean'];
    meals: GQLCookMealMutation;
    menus: GQLCookMenuMutation;
    removeOneLanguage: Scalars['Boolean'];
    updateBiography: Scalars['Boolean'];
    updateHasStripePayoutMethodActivated: Scalars['Boolean'];
    updateIsLocked: Scalars['Boolean'];
    updateIsVisible: Scalars['Boolean'];
    updateLocation: Scalars['Boolean'];
    updateMaximumParticipants: Scalars['Boolean'];
    updateMaximumPrice: Scalars['Boolean'];
    updateMaximumTravelDistance: Scalars['Boolean'];
    updateMinimumParticipants: Scalars['Boolean'];
    updateMinimumPrice: Scalars['Boolean'];
    updateRank: Scalars['Boolean'];
    updateTravelExpenses: Scalars['Boolean'];
};

export type GQLCookMutationAddOneLanguageArgs = {
    cookId: Scalars['String'];
    languageId: Scalars['String'];
};

export type GQLCookMutationBookingRequestsArgs = {
    cookId: Scalars['String'];
};

export type GQLCookMutationCreateOneArgs = {
    cookId: Scalars['String'];
    request: GQLCreateOneCookRequest;
};

export type GQLCookMutationMealsArgs = {
    cookId: Scalars['String'];
};

export type GQLCookMutationMenusArgs = {
    cookId: Scalars['String'];
};

export type GQLCookMutationRemoveOneLanguageArgs = {
    cookId: Scalars['String'];
    languageId: Scalars['String'];
};

export type GQLCookMutationUpdateBiographyArgs = {
    biography: Scalars['String'];
    cookId: Scalars['String'];
};

export type GQLCookMutationUpdateHasStripePayoutMethodActivatedArgs = {
    cookId: Scalars['String'];
};

export type GQLCookMutationUpdateIsLockedArgs = {
    cookId: Scalars['String'];
    isLocked: Scalars['Boolean'];
};

export type GQLCookMutationUpdateIsVisibleArgs = {
    cookId: Scalars['String'];
    isVisible: Scalars['Boolean'];
};

export type GQLCookMutationUpdateLocationArgs = {
    cookId: Scalars['String'];
    location: GQLLocationInput;
};

export type GQLCookMutationUpdateMaximumParticipantsArgs = {
    cookId: Scalars['String'];
    maximumParticipants?: InputMaybe<Scalars['UInt']>;
};

export type GQLCookMutationUpdateMaximumPriceArgs = {
    cookId: Scalars['String'];
    maximumPrice?: InputMaybe<Scalars['UInt']>;
};

export type GQLCookMutationUpdateMaximumTravelDistanceArgs = {
    cookId: Scalars['String'];
    maximumTravelDistance?: InputMaybe<Scalars['UInt']>;
};

export type GQLCookMutationUpdateMinimumParticipantsArgs = {
    cookId: Scalars['String'];
    minimumParticipants?: InputMaybe<Scalars['UInt']>;
};

export type GQLCookMutationUpdateMinimumPriceArgs = {
    cookId: Scalars['String'];
    minimumPrice?: InputMaybe<Scalars['UInt']>;
};

export type GQLCookMutationUpdateRankArgs = {
    cookId: Scalars['String'];
    rank: GQLCookRank;
};

export type GQLCookMutationUpdateTravelExpensesArgs = {
    cookId: Scalars['String'];
    travelExpenses: Scalars['UInt'];
};

export type GQLCookQuery = {
    __typename?: 'CookQuery';
    bookingRequests: GQLCookBookingRequestQuery;
    cookRatings: GQLCookCookRatingQuery;
    cookVisits: GQLUserAddressQuery;
    findMany: Array<GQLCook>;
    findOne?: Maybe<GQLCook>;
    followers: GQLCookFollowingQuery;
    getStripeDashboardUrl?: Maybe<Scalars['Url']>;
    getStripeOnboardingUrl?: Maybe<Scalars['Url']>;
    globalBookingRequests: GQLCookGlobalBookingRequestQuery;
    meals: GQLCookMealQuery;
    menuVisits: GQLUserAddressQuery;
    menus: GQLCookMenuQuery;
    userRatings: GQLCookUserRatingQuery;
};

export type GQLCookQueryBookingRequestsArgs = {
    cookId: Scalars['String'];
};

export type GQLCookQueryCookRatingsArgs = {
    cookId: Scalars['String'];
};

export type GQLCookQueryCookVisitsArgs = {
    cookId: Scalars['String'];
};

export type GQLCookQueryFindManyArgs = {
    request: GQLFindManyRequest;
};

export type GQLCookQueryFindOneArgs = {
    cookId: Scalars['String'];
};

export type GQLCookQueryGetStripeDashboardUrlArgs = {
    cookId: Scalars['String'];
};

export type GQLCookQueryGetStripeOnboardingUrlArgs = {
    cookId: Scalars['String'];
};

export type GQLCookQueryGlobalBookingRequestsArgs = {
    cookId: Scalars['String'];
};

export type GQLCookQueryMealsArgs = {
    cookId: Scalars['String'];
};

export type GQLCookQueryMenuVisitsArgs = {
    cookId: Scalars['String'];
};

export type GQLCookQueryMenusArgs = {
    cookId: Scalars['String'];
};

export type GQLCookQueryUserRatingsArgs = {
    cookId: Scalars['String'];
};

export type GQLCookRank = 'HOBBY' | 'PROFESSIONAL';

export type GQLCookRating = {
    __typename?: 'CookRating';
    bookingRequest: GQLBookingRequest;
    bookingRequestId: Scalars['String'];
    comment?: Maybe<Scalars['String']>;
    cook: GQLPublicCook;
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    user: GQLPublicUser;
    userId: Scalars['String'];
    value: Scalars['UInt'];
};

export type GQLCookSpecificFee = {
    __typename?: 'CookSpecificFee';
    cookId: Scalars['String'];
};

export type GQLCookSpecificFeeMutation = {
    __typename?: 'CookSpecificFeeMutation';
    createOne: Scalars['Boolean'];
};

export type GQLCookSpecificFeeQuery = {
    __typename?: 'CookSpecificFeeQuery';
    findMany: Array<GQLCookSpecificFee>;
    findOne?: Maybe<GQLCookSpecificFee>;
};

export type GQLCookSpecificFeeQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLCookSpecificFeeQueryFindOneArgs = {
    cookId: Scalars['String'];
};

export type GQLCookUserRatingQuery = {
    __typename?: 'CookUserRatingQuery';
    cookId: Scalars['String'];
    findMany: Array<GQLUserRating>;
};

export type GQLCookVisit = {
    __typename?: 'CookVisit';
    cook: GQLPublicCook;
    cookId: Scalars['String'];
    cookVisitId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    session: GQLAnonymousSession;
    sessionId: Scalars['String'];
};

export type GQLCookVisitMutation = {
    __typename?: 'CookVisitMutation';
    createOne: Scalars['Boolean'];
};

export type GQLCookVisitMutationCreateOneArgs = {
    cookId: Scalars['String'];
};

export type GQLCookVisitStatistics = {
    __typename?: 'CookVisitStatistics';
    visitCountLastMonth: Scalars['UInt'];
    visitCountLastWeek: Scalars['UInt'];
    visitCountTotal: Scalars['UInt'];
    visits: Array<GQLCookVisit>;
};

export type GQLCouponCode = GQLGiftCard | GQLGiftCardPromoCode;

export type GQLCouponCodeQuery = {
    __typename?: 'CouponCodeQuery';
    /** Supports gift card promo codes and regular gift cards */
    findOne?: Maybe<GQLCouponCode>;
};

export type GQLCouponCodeQueryFindOneArgs = {
    couponCodeId: Scalars['String'];
};

export type GQLCourse = {
    __typename?: 'Course';
    cookId: Scalars['String'];
    courseId: Scalars['String'];
    index: Scalars['UInt'];
    mealOptionCount: Scalars['UInt'];
    mealOptions: Array<GQLMealOption>;
    menuId: Scalars['String'];
    title: Scalars['String'];
};

export type GQLCreateBookingRequestRequest = {
    cook?: InputMaybe<GQLCreateCookBookingRequestRequest>;
    menu?: InputMaybe<GQLCreateMenuBookingRequestRequest>;
};

export type GQLCreateChatMessageRequest = {
    message: Scalars['String'];
};

export type GQLCreateConfiguredMenuCourseRequest = {
    courseId: Scalars['String'];
    mealId: Scalars['String'];
};

export type GQLCreateConfiguredMenuRequest = {
    courses: Array<GQLCreateConfiguredMenuCourseRequest>;
    menuId: Scalars['String'];
};

export type GQLCreateCookBookingRequestRequest = {
    adultParticipants: Scalars['UInt'];
    children: Scalars['UInt'];
    cookId: Scalars['String'];
    dateTime: Scalars['DateTime'];
    duration: Scalars['UInt'];
    kitchenId?: InputMaybe<Scalars['String']>;
    location: GQLLocationInput;
    message: Scalars['String'];
    occasion: Scalars['String'];
    preparationTime: Scalars['UInt'];
    price: GQLPriceInput;
    travelExpensesAmount: Scalars['UInt'];
};

export type GQLCreateMenuBookingRequestRequest = {
    adultParticipants: Scalars['UInt'];
    children: Scalars['UInt'];
    configuredMenu: GQLCreateConfiguredMenuRequest;
    cookId: Scalars['String'];
    dateTime: Scalars['DateTime'];
    duration: Scalars['UInt'];
    giftCardPromoCodeId?: InputMaybe<Scalars['String']>;
    location: GQLLocationInput;
    message: Scalars['String'];
    occasion: Scalars['String'];
    preparationTime: Scalars['UInt'];
    travelExpensesAmount: Scalars['UInt'];
};

export type GQLCreateOneAddressRequest = {
    city: Scalars['String'];
    country: Scalars['String'];
    houseNumber: Scalars['String'];
    location: GQLLocationInput;
    postCode: Scalars['String'];
    street: Scalars['String'];
    title: Scalars['String'];
};

export type GQLCreateOneAdminRequest = {
    adminId: Scalars['String'];
};

export type GQLCreateOneCookRequest = {
    biography: Scalars['String'];
    isVisible: Scalars['Boolean'];
    languageIds?: InputMaybe<Array<Scalars['String']>>;
    location: GQLLocationInput;
    maximumParticipants?: InputMaybe<Scalars['UInt']>;
    maximumPrice?: InputMaybe<Scalars['UInt']>;
    maximumTravelDistance?: InputMaybe<Scalars['UInt']>;
    minimumParticipants?: InputMaybe<Scalars['UInt']>;
    minimumPrice?: InputMaybe<Scalars['UInt']>;
    rank: GQLCookRank;
    travelExpenses: Scalars['UInt'];
};

export type GQLCreateOneCourseRequest = {
    index: Scalars['UInt'];
    mealOptions?: InputMaybe<Array<GQLCreateOneMealOptionRequest>>;
    title: Scalars['String'];
};

export type GQLCreateOneGiftCardFailedResponse = {
    __typename?: 'CreateOneGiftCardFailedResponse';
    failed: Scalars['Boolean'];
};

export type GQLCreateOneGiftCardPromoCodeRequest = {
    balance: GQLPriceInput;
    expiresAt: Scalars['DateTime'];
    redeemCode: Scalars['String'];
};

export type GQLCreateOneGiftCardRequest = {
    balance: Scalars['UInt'];
    buyer?: InputMaybe<GQLCreateOneGiftCardRequestBuyer>;
    /** The day the recipient should be notified about him receiving the gift card */
    deliveryDate?: InputMaybe<Scalars['DateTime']>;
    message: Scalars['String'];
    occasion: Scalars['String'];
    recipient: GQLGiftCardRecipient;
    userId?: InputMaybe<Scalars['String']>;
};

export type GQLCreateOneGiftCardRequestBuyer = {
    emailAddress: Scalars['EmailAddress'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
};

export type GQLCreateOneGiftCardResponse = GQLCreateOneGiftCardFailedResponse | GQLCreateOneGiftCardSuccessResponse;

export type GQLCreateOneGiftCardSuccessResponse = {
    __typename?: 'CreateOneGiftCardSuccessResponse';
    giftCardId: Scalars['String'];
    stripeClientSecret: Scalars['String'];
};

export type GQLCreateOneGlobalBookingRequestRequest = {
    adultParticipants: Scalars['UInt'];
    allergyIds?: InputMaybe<Array<Scalars['String']>>;
    categoryIds?: InputMaybe<Array<Scalars['String']>>;
    children: Scalars['UInt'];
    dateTime: Scalars['DateTime'];
    duration: Scalars['UInt'];
    kitchenId?: InputMaybe<Scalars['String']>;
    location: GQLLocationInput;
    message: Scalars['String'];
    occasion: Scalars['String'];
    phoneNumber?: InputMaybe<Scalars['PhoneNumber']>;
    priceClassType: GQLGlobalBookingRequestPriceClassType;
};

export type GQLCreateOneMealOptionRequest = {
    index: Scalars['UInt'];
    mealId: Scalars['String'];
};

export type GQLCreateOneMealRequest = {
    description: Scalars['String'];
    title: Scalars['String'];
    type: GQLMealType;
};

export type GQLCreateOneMenuRequest = {
    basePrice: Scalars['UInt'];
    basePriceCustomers: Scalars['UInt'];
    categoryIds?: InputMaybe<Array<Scalars['String']>>;
    courses?: InputMaybe<Array<GQLCreateOneCourseRequest>>;
    currencyCode: GQLCurrencyCode;
    description: Scalars['String'];
    greetingFromKitchen?: InputMaybe<Scalars['String']>;
    isVisible: Scalars['Boolean'];
    keyMealOptionCourseIndex?: InputMaybe<Scalars['UInt']>;
    keyMealOptionIndex?: InputMaybe<Scalars['UInt']>;
    kitchenId?: InputMaybe<Scalars['String']>;
    preparationTime: Scalars['UInt'];
    pricePerAdult: Scalars['UInt'];
    pricePerChild?: InputMaybe<Scalars['UInt']>;
    title: Scalars['String'];
};

export type GQLCreateOneNotificationRequest = {
    message: Scalars['String'];
    url?: InputMaybe<Scalars['Url']>;
};

export type GQLCreateOnePrivacyPolicyUpdateRequest = {
    englishText: Scalars['String'];
    germanText: Scalars['String'];
};

export type GQLCreateOneSearchRequestRequest = {
    adults: Scalars['UInt'];
    children: Scalars['UInt'];
    date: Scalars['Date'];
    locationText: Scalars['String'];
    origin: GQLSearchRequestOrigin;
};

export type GQLCreateOneSessionByEmailAddressRequest = {
    emailAddress: Scalars['EmailAddress'];
    password: Scalars['String'];
    platform: GQLPlatform;
    pushToken?: InputMaybe<Scalars['String']>;
    title: Scalars['String'];
};

export type GQLCreateOneSessionByIdentityProviderRequest = {
    idToken: Scalars['String'];
    identityProvider: GQLIdentityProvider;
    platform: GQLPlatform;
    title: Scalars['String'];
};

export type GQLCreateOneSessionByPhoneNumberRequest = {
    password: Scalars['String'];
    phoneNumber: Scalars['String'];
    platform: GQLPlatform;
    pushToken?: InputMaybe<Scalars['String']>;
    title: Scalars['String'];
};

export type GQLCreateOneSupportRequest = {
    bookingRequestId?: InputMaybe<Scalars['String']>;
    message: Scalars['String'];
    subject: Scalars['String'];
};

export type GQLCreateOneTermsUpdateRequest = {
    englishText: Scalars['String'];
    germanText: Scalars['String'];
};

export type GQLCreateOneUserByEmailAddressRequest = {
    addresses?: InputMaybe<Array<GQLCreateOneAddressRequest>>;
    birthDate?: InputMaybe<Scalars['Date']>;
    cook?: InputMaybe<GQLCreateOneCookRequest>;
    emailAddress?: InputMaybe<Scalars['EmailAddress']>;
    firstName: Scalars['String'];
    gender: GQLGender;
    globalBookingRequest?: InputMaybe<GQLCreateOneGlobalBookingRequestRequest>;
    language: GQLUserLanguage;
    lastName: Scalars['String'];
    password?: InputMaybe<Scalars['String']>;
    phoneNumber?: InputMaybe<Scalars['PhoneNumber']>;
    profilePictureUrl?: InputMaybe<Scalars['Url']>;
};

export type GQLCreateOneUserByIdentityProviderRequest = {
    birthDate?: InputMaybe<Scalars['Date']>;
    cook?: InputMaybe<GQLCreateOneCookRequest>;
    firstName: Scalars['String'];
    gender: GQLGender;
    globalBookingRequest?: InputMaybe<GQLCreateOneGlobalBookingRequestRequest>;
    idToken: Scalars['String'];
    identityProvider: GQLIdentityProvider;
    language: GQLUserLanguage;
    lastName: Scalars['String'];
    profilePictureUrl?: InputMaybe<Scalars['Url']>;
};

export type GQLCreateOneUserByPhoneNumberRequest = {
    birthDate?: InputMaybe<Scalars['Date']>;
    cook?: InputMaybe<GQLCreateOneCookRequest>;
    firstName: Scalars['String'];
    gender: GQLGender;
    globalBookingRequest?: InputMaybe<GQLCreateOneGlobalBookingRequestRequest>;
    language: GQLUserLanguage;
    lastName: Scalars['String'];
    password: Scalars['String'];
    phoneNumber: Scalars['PhoneNumber'];
    profilePictureUrl?: InputMaybe<Scalars['Url']>;
};

export type GQLCurrencyCode = 'EUR' | 'USD';

export type GQLCustomerFeeUpdate = {
    __typename?: 'CustomerFeeUpdate';
    adminId: Scalars['String'];
    user: GQLPublicUser;
};

export type GQLCustomerFeeUpdateMutation = {
    __typename?: 'CustomerFeeUpdateMutation';
    createOne: Scalars['Boolean'];
};

export type GQLCustomerFeeUpdateQuery = {
    __typename?: 'CustomerFeeUpdateQuery';
    findMany: Array<GQLAdmin>;
    findOne?: Maybe<GQLAdmin>;
};

export type GQLCustomerFeeUpdateQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLCustomerFeeUpdateQueryFindOneArgs = {
    adminId: Scalars['String'];
};

export type GQLDeleteMealErrorResult = {
    __typename?: 'DeleteMealErrorResult';
    failedAt: Scalars['DateTime'];
};

export type GQLDeleteMealRequiredForMenuResult = {
    __typename?: 'DeleteMealRequiredForMenuResult';
    menuId: Scalars['String'];
    menuTitle: Scalars['String'];
};

export type GQLDeleteMealResult = GQLDeleteMealErrorResult | GQLDeleteMealRequiredForMenuResult | GQLDeleteMealSuccessResult;

export type GQLDeleteMealSuccessResult = {
    __typename?: 'DeleteMealSuccessResult';
    deletedAt: Scalars['DateTime'];
};

export type GQLEmailAddressUpdate = {
    __typename?: 'EmailAddressUpdate';
    createdAt: Scalars['DateTime'];
    emailAddress: Scalars['EmailAddress'];
    userId: Scalars['String'];
};

export type GQLExpireOneSessionRequest = {
    sessionId: Scalars['String'];
    userId: Scalars['String'];
};

export type GQLFindManyPublicCooksRequest = {
    adultParticipants: Scalars['UInt'];
    categoryIds?: InputMaybe<Array<Scalars['String']>>;
    children?: InputMaybe<Scalars['UInt']>;
    dateTime: Scalars['DateTime'];
    kitchenIds?: InputMaybe<Array<Scalars['String']>>;
    location?: InputMaybe<GQLLocationInput>;
    price?: InputMaybe<GQLPriceInput>;
    searchText?: InputMaybe<Scalars['String']>;
    skip?: InputMaybe<Scalars['UInt']>;
    take?: InputMaybe<Scalars['UInt']>;
};

export type GQLFindManyPublicMenusRequest = {
    adultParticipants: Scalars['UInt'];
    categoryIds?: InputMaybe<Array<Scalars['String']>>;
    children?: InputMaybe<Scalars['UInt']>;
    dateTime: Scalars['DateTime'];
    kitchenIds?: InputMaybe<Array<Scalars['String']>>;
    location?: InputMaybe<GQLLocationInput>;
    price?: InputMaybe<GQLPriceInput>;
    searchText?: InputMaybe<Scalars['String']>;
    skip?: InputMaybe<Scalars['UInt']>;
    take?: InputMaybe<Scalars['UInt']>;
};

export type GQLFindManyRequest = {
    searchText?: InputMaybe<Scalars['String']>;
    skip?: InputMaybe<Scalars['UInt']>;
    take?: InputMaybe<Scalars['UInt']>;
};

export type GQLFollowing = {
    __typename?: 'Following';
    cook: GQLPublicCook;
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    user: GQLAnonymousUser;
    userId: Scalars['String'];
};

export type GQLGender = 'DIVERSE' | 'FEMALE' | 'MALE' | 'NO_INFORMATION';

export type GQLGiftCard = {
    __typename?: 'GiftCard';
    balance: GQLPrice;
    createdAt: Scalars['DateTime'];
    expiresAt: Scalars['DateTime'];
    giftCardId: Scalars['String'];
    redeemCode: Scalars['String'];
    status: GQLGiftCardStatus;
};

export type GQLGiftCardMutation = {
    __typename?: 'GiftCardMutation';
    confirmOne: Scalars['Boolean'];
    createOne: GQLCreateOneGiftCardResponse;
};

export type GQLGiftCardMutationConfirmOneArgs = {
    giftCardId: Scalars['String'];
};

export type GQLGiftCardMutationCreateOneArgs = {
    request: GQLCreateOneGiftCardRequest;
};

export type GQLGiftCardPromoCode = {
    __typename?: 'GiftCardPromoCode';
    balance: GQLPrice;
    createdAt: Scalars['DateTime'];
    expiresAt: Scalars['DateTime'];
    giftCardPromoCodeId: Scalars['String'];
    redeemCode: Scalars['String'];
};

export type GQLGiftCardQuery = {
    __typename?: 'GiftCardQuery';
    findAll: Array<GQLGiftCard>;
    findOne?: Maybe<GQLGiftCard>;
};

export type GQLGiftCardQueryFindOneArgs = {
    redeemCode: Scalars['String'];
};

export type GQLGiftCardRecipient = {
    deliveryInformation?: InputMaybe<GQLGiftCardRecipientDeliveryInformation>;
    firstName: Scalars['String'];
    lastName: Scalars['String'];
};

export type GQLGiftCardRecipientDeliveryInformation = {
    date: Scalars['Date'];
    emailAddress: Scalars['String'];
};

export type GQLGiftCardStatus = 'CREATED' | 'PAYED';

export type GQLGlobalBookingRequest = {
    __typename?: 'GlobalBookingRequest';
    adultParticipants: Scalars['UInt'];
    allergies: Array<GQLAllergy>;
    children: Scalars['UInt'];
    createdAt: Scalars['DateTime'];
    dateTime: Scalars['DateTime'];
    duration?: Maybe<Scalars['UInt']>;
    globalBookingRequestId: Scalars['String'];
    location: GQLLocation;
    message: Scalars['String'];
    occasion: Scalars['String'];
    priceClass: GQLGlobalBookingRequestPriceClass;
    priceClassType: GQLGlobalBookingRequestPriceClassType;
    user: GQLPublicUser;
    userId: Scalars['String'];
};

export type GQLGlobalBookingRequestPriceClass = {
    __typename?: 'GlobalBookingRequestPriceClass';
    currencyCode: GQLCurrencyCode;
    max: Scalars['UInt'];
    min: Scalars['UInt'];
    type: GQLGlobalBookingRequestPriceClassType;
};

export type GQLGlobalBookingRequestPriceClassType = 'FINE' | 'GOURMET' | 'SIMPLE';

export type GQLGlobalBookingRequestQuery = {
    __typename?: 'GlobalBookingRequestQuery';
    findMany?: Maybe<Array<GQLGlobalBookingRequest>>;
    findOne?: Maybe<GQLGlobalBookingRequest>;
};

export type GQLGlobalBookingRequestQueryFindOneArgs = {
    globalBookingRequestId: Scalars['String'];
};

export type GQLIdentityProvider = 'APPLE' | 'GOOGLE';

export type GQLKitchen = {
    __typename?: 'Kitchen';
    kitchenId: Scalars['String'];
    title: Scalars['String'];
};

export type GQLKitchenMutation = {
    __typename?: 'KitchenMutation';
    createOne: Scalars['Boolean'];
};

export type GQLKitchenQuery = {
    __typename?: 'KitchenQuery';
    findAll: Array<GQLKitchen>;
};

export type GQLLanguage = {
    __typename?: 'Language';
    languageId: Scalars['String'];
    title: Scalars['String'];
};

export type GQLLanguageMutation = {
    __typename?: 'LanguageMutation';
    createOne: Scalars['Boolean'];
};

export type GQLLanguageQuery = {
    __typename?: 'LanguageQuery';
    findAll: Array<GQLLanguage>;
};

export type GQLLocation = {
    __typename?: 'Location';
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
    text: Scalars['String'];
};

export type GQLLocationInput = {
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
    text?: InputMaybe<Scalars['String']>;
};

export type GQLMeal = {
    __typename?: 'Meal';
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    description: Scalars['String'];
    imageUrl?: Maybe<Scalars['Url']>;
    mealId: Scalars['String'];
    title: Scalars['String'];
    type: GQLMealType;
};

export type GQLMealOption = {
    __typename?: 'MealOption';
    index: Scalars['UInt'];
    meal: GQLMeal;
    mealId: Scalars['String'];
};

export type GQLMealType = 'DESSERT' | 'FISH' | 'MEAT' | 'SOUP' | 'SPECIAL' | 'VEGAN' | 'VEGETARIAN';

export type GQLMenu = {
    __typename?: 'Menu';
    basePrice: Scalars['UInt'];
    basePriceCustomers: Scalars['UInt'];
    categories: Array<GQLCategory>;
    cook: GQLCook;
    cookId: Scalars['String'];
    courseCount: Scalars['UInt'];
    courses: Array<GQLCourse>;
    createdAt: Scalars['DateTime'];
    currencyCode: GQLCurrencyCode;
    description: Scalars['String'];
    greetingFromKitchen?: Maybe<Scalars['String']>;
    imageUrl?: Maybe<Scalars['Url']>;
    imageUrls: Array<Scalars['Url']>;
    isVisible: Scalars['Boolean'];
    kitchen?: Maybe<GQLKitchen>;
    kitchenId?: Maybe<Scalars['String']>;
    menuId: Scalars['String'];
    preparationTime: Scalars['UInt'];
    pricePerAdult: Scalars['UInt'];
    pricePerChild?: Maybe<Scalars['UInt']>;
    title: Scalars['String'];
    visitStatistics: GQLMenuVisitStatistics;
};

export type GQLMenuConfiguration = {
    __typename?: 'MenuConfiguration';
    bookingRequestId: Scalars['String'];
    categories: Array<GQLCategory>;
    categoryIds: Array<Scalars['String']>;
    courses: Array<GQLMenuConfigurationCourse>;
    greetingsFromKitchen: Scalars['Boolean'];
    kitchen: GQLKitchen;
    kitchenId: Scalars['String'];
    menuDescription: Scalars['String'];
    menuId: Scalars['String'];
    menuTitle: Scalars['String'];
};

export type GQLMenuConfigurationCourse = {
    __typename?: 'MenuConfigurationCourse';
    courseTitle: Scalars['String'];
    mealDescription: Scalars['String'];
    mealImageUrl: Scalars['Url'];
    mealTitle: Scalars['String'];
    mealType: GQLMealType;
};

export type GQLMenuVisit = {
    __typename?: 'MenuVisit';
    createdAt: Scalars['DateTime'];
    menu: GQLPublicMenu;
    menuId: Scalars['String'];
    menuVisitId: Scalars['String'];
    session: GQLAnonymousSession;
    sessionId: Scalars['String'];
};

export type GQLMenuVisitMutation = {
    __typename?: 'MenuVisitMutation';
    createOne: Scalars['Boolean'];
};

export type GQLMenuVisitMutationCreateOneArgs = {
    menuId: Scalars['String'];
};

export type GQLMenuVisitStatistics = {
    __typename?: 'MenuVisitStatistics';
    visitCountLastMonth: Scalars['UInt'];
    visitCountLastWeek: Scalars['UInt'];
    visitCountTotal: Scalars['UInt'];
    visits: Array<GQLMenuVisit>;
};

export type GQLMutation = {
    __typename?: 'Mutation';
    admins: GQLAdminMutation;
    allergies: GQLAllergyMutation;
    categories: GQLCategoryMutation;
    cookSpecificFees: GQLCookSpecificFeeMutation;
    cookVisits: GQLCookVisitMutation;
    cooks: GQLCookMutation;
    customerFeeUpdates: GQLCustomerFeeUpdateMutation;
    giftCards: GQLGiftCardMutation;
    kitchens: GQLKitchenMutation;
    languages: GQLLanguageMutation;
    menuVisits: GQLMenuVisitMutation;
    newsletterSubscriptions: GQLNewsletterSubscriptionMutation;
    notifications: GQLNotificationMutation;
    privacyPolicyUpdates: GQLPrivacyPolicyUpdateMutation;
    searchRequests: GQLSearchRequestMutation;
    sessions: GQLSessionMutation;
    termsUpdates: GQLTermsUpdateMutation;
    users: GQLUserMutation;
};

export type GQLNewsletterSubscriptionMutation = {
    __typename?: 'NewsletterSubscriptionMutation';
    createOne: Scalars['Boolean'];
};

export type GQLNewsletterSubscriptionMutationCreateOneArgs = {
    emailAddress: Scalars['String'];
};

export type GQLNotification = {
    __typename?: 'Notification';
    createdAt: Scalars['DateTime'];
    message: Scalars['String'];
    notificationId: Scalars['String'];
    url?: Maybe<Scalars['Url']>;
    userId: Scalars['String'];
    wasRead?: Maybe<Scalars['Boolean']>;
};

export type GQLNotificationConfiguration = {
    __typename?: 'NotificationConfiguration';
    emailsForAccount: Scalars['Boolean'];
    emailsForBookingRequests: Scalars['Boolean'];
    emailsForFavoriteCooks: Scalars['Boolean'];
    emailsForOffers: Scalars['Boolean'];
    pushesForAccount: Scalars['Boolean'];
    pushesForBookingRequests: Scalars['Boolean'];
    pushesForFavoriteCooks: Scalars['Boolean'];
    pushesForOffers: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLNotificationConfigurationMutation = {
    __typename?: 'NotificationConfigurationMutation';
    update: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLNotificationConfigurationQuery = {
    __typename?: 'NotificationConfigurationQuery';
    findOne: GQLNotificationConfiguration;
    userId: Scalars['String'];
};

export type GQLNotificationMutation = {
    __typename?: 'NotificationMutation';
    createOne: Scalars['Boolean'];
};

export type GQLNotificationMutationCreateOneArgs = {
    request: GQLCreateOneNotificationRequest;
};

export type GQLNotificationQuery = {
    __typename?: 'NotificationQuery';
    findMany?: Maybe<Array<GQLNotification>>;
    userId: Scalars['String'];
};

export type GQLOneTimeAccessToken = {
    __typename?: 'OneTimeAccessToken';
    createdAt: Scalars['DateTime'];
    userId: Scalars['String'];
};

export type GQLPaymentProvider = 'STRIPE';

export type GQLPhoneNumberUpdate = {
    __typename?: 'PhoneNumberUpdate';
    createdAt: Scalars['DateTime'];
    phoneNumber: Scalars['PhoneNumber'];
    userId: Scalars['String'];
};

export type GQLPlatform = 'ANDROID' | 'BROWSER' | 'IOS' | 'NO_INFORMATION';

export type GQLPrice = {
    __typename?: 'Price';
    amount: Scalars['UInt'];
    currencyCode: GQLCurrencyCode;
};

export type GQLPriceInput = {
    amount: Scalars['UInt'];
    currencyCode: GQLCurrencyCode;
};

export type GQLPrivacyPolicyUpdate = {
    __typename?: 'PrivacyPolicyUpdate';
    admin: GQLAdmin;
    adminId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    englishText: Scalars['String'];
    germanText: Scalars['String'];
    privacyPolicyUpdateId: Scalars['String'];
};

export type GQLPrivacyPolicyUpdateMutation = {
    __typename?: 'PrivacyPolicyUpdateMutation';
    createOne: Scalars['Boolean'];
};

export type GQLPrivacyPolicyUpdateMutationCreateOneArgs = {
    request: GQLCreateOnePrivacyPolicyUpdateRequest;
};

export type GQLPrivacyPolicyUpdateQuery = {
    __typename?: 'PrivacyPolicyUpdateQuery';
    findAll: Array<GQLPrivacyPolicyUpdate>;
    findLatest?: Maybe<GQLPrivacyPolicyUpdate>;
    findOne?: Maybe<GQLPrivacyPolicyUpdate>;
};

export type GQLPrivacyPolicyUpdateQueryFindOneArgs = {
    privacyPolicyUpdateId: Scalars['String'];
};

export type GQLPublicCook = {
    __typename?: 'PublicCook';
    biography: Scalars['String'];
    city: Scalars['String'];
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    languages: Array<GQLLanguage>;
    location: GQLLocation;
    maximumParticipants?: Maybe<Scalars['UInt']>;
    maximumPrice?: Maybe<Scalars['UInt']>;
    maximumTravelDistance?: Maybe<Scalars['UInt']>;
    menuCount: Scalars['UInt'];
    menus: Array<GQLPublicMenu>;
    minimumParticipants?: Maybe<Scalars['UInt']>;
    minimumPrice?: Maybe<Scalars['UInt']>;
    rank: GQLCookRank;
    travelExpenses: Scalars['UInt'];
    user: GQLPublicUser;
};

export type GQLPublicCookQuery = {
    __typename?: 'PublicCookQuery';
    checkAvailability: Scalars['Boolean'];
    findHeroes: Array<GQLPublicCook>;
    findMany: Array<GQLPublicCook>;
    findOne?: Maybe<GQLPublicCook>;
};

export type GQLPublicCookQueryCheckAvailabilityArgs = {
    request: GQLFindManyPublicCooksRequest;
};

export type GQLPublicCookQueryFindManyArgs = {
    request: GQLFindManyPublicCooksRequest;
};

export type GQLPublicCookQueryFindOneArgs = {
    cookId: Scalars['String'];
};

export type GQLPublicMenu = {
    __typename?: 'PublicMenu';
    basePrice: Scalars['UInt'];
    basePriceCustomers: Scalars['UInt'];
    categories: Array<GQLCategory>;
    cook: GQLPublicCook;
    cookId: Scalars['String'];
    courseCount: Scalars['UInt'];
    courses: Array<GQLCourse>;
    createdAt: Scalars['DateTime'];
    currencyCode: GQLCurrencyCode;
    description: Scalars['String'];
    greetingFromKitchen?: Maybe<Scalars['String']>;
    imageUrl?: Maybe<Scalars['Url']>;
    kitchen?: Maybe<GQLKitchen>;
    menuId: Scalars['String'];
    preparationTime: Scalars['UInt'];
    pricePerAdult: Scalars['UInt'];
    pricePerChild?: Maybe<Scalars['UInt']>;
    title: Scalars['String'];
};

export type GQLPublicMenuQuery = {
    __typename?: 'PublicMenuQuery';
    checkAvailability: Scalars['Boolean'];
    findHeroes: Array<GQLPublicMenu>;
    findMany: Array<GQLPublicMenu>;
    findOne?: Maybe<GQLPublicMenu>;
};

export type GQLPublicMenuQueryCheckAvailabilityArgs = {
    request: GQLFindManyPublicMenusRequest;
};

export type GQLPublicMenuQueryFindManyArgs = {
    request: GQLFindManyPublicMenusRequest;
};

export type GQLPublicMenuQueryFindOneArgs = {
    menuId: Scalars['String'];
};

export type GQLPublicPrivacyPolicyUpdate = {
    __typename?: 'PublicPrivacyPolicyUpdate';
    createdAt: Scalars['DateTime'];
    englishText: Scalars['String'];
    germanText: Scalars['String'];
    privacyPolicyUpdateId: Scalars['String'];
};

export type GQLPublicPrivacyPolicyUpdateQuery = {
    __typename?: 'PublicPrivacyPolicyUpdateQuery';
    findAll: Array<GQLPublicPrivacyPolicyUpdate>;
    findLatest?: Maybe<GQLPublicPrivacyPolicyUpdate>;
    findOne?: Maybe<GQLPublicPrivacyPolicyUpdate>;
};

export type GQLPublicPrivacyPolicyUpdateQueryFindOneArgs = {
    privacyPolicyUpdateId: Scalars['String'];
};

export type GQLPublicTermsUpdate = {
    __typename?: 'PublicTermsUpdate';
    createdAt: Scalars['DateTime'];
    englishText: Scalars['String'];
    germanText: Scalars['String'];
    termsUpdateId: Scalars['String'];
};

export type GQLPublicTermsUpdateQuery = {
    __typename?: 'PublicTermsUpdateQuery';
    findAll: Array<GQLPublicTermsUpdate>;
    findLatest?: Maybe<GQLPublicTermsUpdate>;
    findOne?: Maybe<GQLPublicTermsUpdate>;
};

export type GQLPublicTermsUpdateQueryFindOneArgs = {
    termsUpdateId: Scalars['String'];
};

export type GQLPublicUser = {
    __typename?: 'PublicUser';
    firstName: Scalars['String'];
    profilePictureUrl?: Maybe<Scalars['Url']>;
    userId: Scalars['String'];
};

export type GQLQuery = {
    __typename?: 'Query';
    admins: GQLAdminQuery;
    allergies: GQLAllergyQuery;
    bookingRequests: GQLBookingRequestQuery;
    categories: GQLCategoryQuery;
    cookSpecificFees: GQLCookSpecificFeeQuery;
    cooks: GQLCookQuery;
    /** Supports gift card promo codes and regular gift cards */
    couponCodes: GQLCouponCodeQuery;
    customerFeeUpdates: GQLCustomerFeeUpdateQuery;
    giftCards: GQLGiftCardQuery;
    globalBookingRequests: GQLGlobalBookingRequestQuery;
    kitchens: GQLKitchenQuery;
    languages: GQLLanguageQuery;
    privacyPolicyUpdates: GQLPrivacyPolicyUpdateQuery;
    publicCooks: GQLPublicCookQuery;
    publicMenus: GQLPublicMenuQuery;
    publicPrivacyPolicyUpdates: GQLPublicPrivacyPolicyUpdateQuery;
    publicTermsUpdates: GQLPublicTermsUpdateQuery;
    searchRequests: GQLSearchRequestQuery;
    sessions: GQLSessionQuery;
    stripePublishableKey?: Maybe<Scalars['String']>;
    supportRequests: GQLSupportRequestQuery;
    termsUpdates: GQLTermsUpdateQuery;
    users: GQLUserQuery;
};

export type GQLSearchRequest = {
    __typename?: 'SearchRequest';
    adults: Scalars['UInt'];
    children: Scalars['UInt'];
    createdAt: Scalars['DateTime'];
    date: Scalars['Date'];
    locationText: Scalars['String'];
    origin: GQLSearchRequestOrigin;
    searchRequestId?: Maybe<Scalars['String']>;
};

export type GQLSearchRequestMutation = {
    __typename?: 'SearchRequestMutation';
    createOne: Scalars['Boolean'];
};

export type GQLSearchRequestMutationCreateOneArgs = {
    request: GQLCreateOneSearchRequestRequest;
};

export type GQLSearchRequestOrigin = 'HOME' | 'PUBLIC_COOKS' | 'PUBLIC_MENUS';

export type GQLSearchRequestQuery = {
    __typename?: 'SearchRequestQuery';
    findAll: Array<GQLSearchRequest>;
};

export type GQLSession = {
    __typename?: 'Session';
    cookieSettings?: Maybe<GQLSessionCookieSettings>;
    createdAt: Scalars['DateTime'];
    expired: Scalars['Boolean'];
    lastExtendedAt: Scalars['DateTime'];
    platform: GQLPlatform;
    sessionId: Scalars['String'];
    title?: Maybe<Scalars['String']>;
    userId?: Maybe<Scalars['String']>;
};

export type GQLSessionCookieSettings = {
    __typename?: 'SessionCookieSettings';
    googleAnalytics?: Maybe<Scalars['Boolean']>;
    sessionCookie?: Maybe<Scalars['Boolean']>;
};

export type GQLSessionCookieSettingsInput = {
    googleAnalytics?: InputMaybe<Scalars['Boolean']>;
    sessionCookie?: InputMaybe<Scalars['Boolean']>;
};

export type GQLSessionMutation = {
    __typename?: 'SessionMutation';
    assignOne: Scalars['Boolean'];
    assignOneByEmailAddress: Scalars['Boolean'];
    assignOneByIdentityProvider: Scalars['Boolean'];
    assignOneByPhoneNumber: Scalars['Boolean'];
    updateCookieSettings: Scalars['Boolean'];
};

export type GQLSessionMutationAssignOneArgs = {
    userId: Scalars['String'];
};

export type GQLSessionMutationAssignOneByEmailAddressArgs = {
    request: GQLCreateOneSessionByEmailAddressRequest;
};

export type GQLSessionMutationAssignOneByIdentityProviderArgs = {
    request: GQLCreateOneSessionByIdentityProviderRequest;
};

export type GQLSessionMutationAssignOneByPhoneNumberArgs = {
    request: GQLCreateOneSessionByPhoneNumberRequest;
};

export type GQLSessionMutationUpdateCookieSettingsArgs = {
    request: GQLSessionCookieSettingsInput;
};

export type GQLSessionQuery = {
    __typename?: 'SessionQuery';
    current?: Maybe<GQLSession>;
};

export type GQLSubscription = {
    __typename?: 'Subscription';
    bookingRequestChatMessageCreations: GQLChatMessage;
};

export type GQLSubscriptionBookingRequestChatMessageCreationsArgs = {
    bookingRequestId: Scalars['String'];
};

export type GQLSupportRequest = {
    __typename?: 'SupportRequest';
    bookingRequestId?: Maybe<Scalars['String']>;
    createdAt: Scalars['DateTime'];
    message: Scalars['String'];
    subject: Scalars['String'];
    supportRequestId: Scalars['String'];
    user: GQLPublicUser;
    userId: Scalars['String'];
};

export type GQLSupportRequestQuery = {
    __typename?: 'SupportRequestQuery';
    findMany?: Maybe<Array<GQLSupportRequest>>;
    findOne?: Maybe<GQLSupportRequest>;
};

export type GQLSupportRequestQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLSupportRequestQueryFindOneArgs = {
    supportRequestId: Scalars['String'];
};

export type GQLTermsUpdate = {
    __typename?: 'TermsUpdate';
    admin: GQLAdmin;
    adminId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    englishText: Scalars['String'];
    germanText: Scalars['String'];
    termsUpdateId: Scalars['String'];
};

export type GQLTermsUpdateMutation = {
    __typename?: 'TermsUpdateMutation';
    createOne: Scalars['Boolean'];
};

export type GQLTermsUpdateMutationCreateOneArgs = {
    request: GQLCreateOneTermsUpdateRequest;
};

export type GQLTermsUpdateQuery = {
    __typename?: 'TermsUpdateQuery';
    findAll: Array<GQLTermsUpdate>;
    findLatest?: Maybe<GQLTermsUpdate>;
    findOne?: Maybe<GQLTermsUpdate>;
};

export type GQLTermsUpdateQueryFindOneArgs = {
    termsUpdateId: Scalars['String'];
};

export type GQLUpdateOneMenuKeyMealOptionRequest = {
    courseId: Scalars['String'];
    index: Scalars['UInt'];
};

export type GQLUser = {
    __typename?: 'User';
    acceptedPrivacyPolicy: Scalars['DateTime'];
    acceptedTerms: Scalars['DateTime'];
    activeSessionCount: Scalars['UInt'];
    activeSessions: Array<GQLSession>;
    addressCount: Scalars['UInt'];
    addresses: Array<GQLAddress>;
    admin?: Maybe<GQLAdmin>;
    birthDate?: Maybe<Scalars['Date']>;
    bookingRequests: Array<GQLBookingRequest>;
    cook?: Maybe<GQLCook>;
    createdAt: Scalars['DateTime'];
    emailAddress?: Maybe<Scalars['EmailAddress']>;
    emailAddressUpdate?: Maybe<GQLEmailAddressUpdate>;
    firstName: Scalars['String'];
    followingCount: Scalars['UInt'];
    followings: Array<GQLFollowing>;
    gender: GQLGender;
    isAdmin: Scalars['Boolean'];
    isCook: Scalars['Boolean'];
    isLocked: Scalars['Boolean'];
    language: GQLUserLanguage;
    lastName: Scalars['String'];
    notificationConfiguration: GQLNotificationConfiguration;
    notifications: Array<GQLNotification>;
    oneTimeAccessToken?: Maybe<GQLOneTimeAccessToken>;
    phoneNumber?: Maybe<Scalars['PhoneNumber']>;
    phoneNumberUpdate?: Maybe<GQLPhoneNumberUpdate>;
    profilePictureUrl?: Maybe<Scalars['Url']>;
    unreadNotificationCount: Scalars['UInt'];
    userId: Scalars['String'];
};

export type GQLUserAddressMutation = {
    __typename?: 'UserAddressMutation';
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    update: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLUserAddressMutationCreateOneArgs = {
    address: GQLCreateOneAddressRequest;
};

export type GQLUserAddressMutationDeleteOneArgs = {
    addressId: Scalars['String'];
};

export type GQLUserAddressMutationUpdateArgs = {
    address: GQLCreateOneAddressRequest;
    addressId: Scalars['String'];
};

export type GQLUserAddressQuery = {
    __typename?: 'UserAddressQuery';
    findMany?: Maybe<Array<GQLAddress>>;
    userId: Scalars['String'];
};

export type GQLUserAddressQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLUserBookingRequestChatMessageMutation = {
    __typename?: 'UserBookingRequestChatMessageMutation';
    bookingRequestId: Scalars['String'];
    createOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLUserBookingRequestChatMessageMutationCreateOneArgs = {
    request: GQLCreateChatMessageRequest;
};

export type GQLUserBookingRequestChatMessageQuery = {
    __typename?: 'UserBookingRequestChatMessageQuery';
    bookingRequestId: Scalars['String'];
    findMany?: Maybe<Array<GQLChatMessage>>;
    userId: Scalars['String'];
};

export type GQLUserBookingRequestChatMessageQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLUserBookingRequestMutation = {
    __typename?: 'UserBookingRequestMutation';
    accept: Scalars['Boolean'];
    chatMessages: GQLUserBookingRequestChatMessageMutation;
    confirmPaymentSetup: Scalars['Boolean'];
    createOne: GQLUserCreateOneBookingRequestResponse;
    decline: Scalars['Boolean'];
    updatePrice: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLUserBookingRequestMutationAcceptArgs = {
    bookingRequestId: Scalars['String'];
};

export type GQLUserBookingRequestMutationChatMessagesArgs = {
    bookingRequestId: Scalars['String'];
};

export type GQLUserBookingRequestMutationConfirmPaymentSetupArgs = {
    bookingRequestId: Scalars['String'];
};

export type GQLUserBookingRequestMutationCreateOneArgs = {
    request: GQLCreateBookingRequestRequest;
};

export type GQLUserBookingRequestMutationDeclineArgs = {
    bookingRequestId: Scalars['String'];
};

export type GQLUserBookingRequestMutationUpdatePriceArgs = {
    bookingRequestId: Scalars['String'];
    price: GQLPriceInput;
};

export type GQLUserBookingRequestQuery = {
    __typename?: 'UserBookingRequestQuery';
    chatMessages: GQLUserBookingRequestChatMessageQuery;
    findMany?: Maybe<Array<GQLBookingRequest>>;
    findOne?: Maybe<GQLBookingRequest>;
    userId: Scalars['String'];
};

export type GQLUserBookingRequestQueryChatMessagesArgs = {
    bookingRequestId: Scalars['String'];
};

export type GQLUserBookingRequestQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLUserBookingRequestQueryFindOneArgs = {
    bookingRequestId: Scalars['String'];
};

export type GQLUserCookRatingQuery = {
    __typename?: 'UserCookRatingQuery';
    findMany: Array<GQLCookRating>;
    userId: Scalars['String'];
};

export type GQLUserCookVisitQuery = {
    __typename?: 'UserCookVisitQuery';
    findMany?: Maybe<Array<GQLAddress>>;
    userId: Scalars['String'];
};

export type GQLUserCookVisitQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLUserCreateOneBookingRequestResponse = {
    __typename?: 'UserCreateOneBookingRequestResponse';
    bookingRequestId: Scalars['String'];
    clientSecret: Scalars['String'];
    success: Scalars['Boolean'];
};

export type GQLUserEmailAddressUpdateMutation = {
    __typename?: 'UserEmailAddressUpdateMutation';
    confirm: Scalars['Boolean'];
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLUserEmailAddressUpdateMutationConfirmArgs = {
    secret: Scalars['String'];
};

export type GQLUserEmailAddressUpdateMutationCreateOneArgs = {
    emailAddress: Scalars['EmailAddress'];
};

export type GQLUserEmailAddressUpdateQuery = {
    __typename?: 'UserEmailAddressUpdateQuery';
    findOne?: Maybe<GQLEmailAddressUpdate>;
    userId: Scalars['String'];
};

export type GQLUserFollowingMutation = {
    __typename?: 'UserFollowingMutation';
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLUserFollowingMutationCreateOneArgs = {
    cookId: Scalars['String'];
};

export type GQLUserFollowingMutationDeleteOneArgs = {
    cookId: Scalars['String'];
};

export type GQLUserFollowingQuery = {
    __typename?: 'UserFollowingQuery';
    findAll: Array<GQLFollowing>;
    userId: Scalars['String'];
};

export type GQLUserGlobalBookingRequestMutation = {
    __typename?: 'UserGlobalBookingRequestMutation';
    createOne: Scalars['Boolean'];
    expireOne: Scalars['Boolean'];
    updateDateTime: Scalars['Boolean'];
    updateMessage: Scalars['Boolean'];
    updateOccasion: Scalars['Boolean'];
    updatePriceClass: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLUserGlobalBookingRequestMutationCreateOneArgs = {
    request: GQLCreateOneGlobalBookingRequestRequest;
};

export type GQLUserGlobalBookingRequestMutationExpireOneArgs = {
    globalBookingRequestId: Scalars['String'];
};

export type GQLUserGlobalBookingRequestMutationUpdateDateTimeArgs = {
    dateTime: Scalars['DateTime'];
    globalBookingRequestId: Scalars['String'];
};

export type GQLUserGlobalBookingRequestMutationUpdateMessageArgs = {
    globalBookingRequestId: Scalars['String'];
    message: Scalars['String'];
};

export type GQLUserGlobalBookingRequestMutationUpdateOccasionArgs = {
    globalBookingRequestId: Scalars['String'];
    occasion: Scalars['String'];
};

export type GQLUserGlobalBookingRequestMutationUpdatePriceClassArgs = {
    globalBookingRequestId: Scalars['String'];
    priceClassType: GQLGlobalBookingRequestPriceClassType;
};

export type GQLUserGlobalBookingRequestQuery = {
    __typename?: 'UserGlobalBookingRequestQuery';
    findMany?: Maybe<Array<GQLGlobalBookingRequest>>;
    findOne?: Maybe<GQLGlobalBookingRequest>;
    userId: Scalars['String'];
};

export type GQLUserGlobalBookingRequestQueryFindOneArgs = {
    globalBookingRequestId: Scalars['String'];
};

export type GQLUserLanguage = 'ENGLISH' | 'GERMAN';

export type GQLUserMenuVisitQuery = {
    __typename?: 'UserMenuVisitQuery';
    findMany?: Maybe<Array<GQLAddress>>;
    userId: Scalars['String'];
};

export type GQLUserMenuVisitQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLUserMutation = {
    __typename?: 'UserMutation';
    acceptLatestPrivacyPolicy: Scalars['Boolean'];
    acceptLatestTerms: Scalars['Boolean'];
    addresses: GQLUserAddressMutation;
    bookingRequests: GQLUserBookingRequestMutation;
    createOneByEmailAddress: Scalars['Boolean'];
    createOneByIdentityProvider: Scalars['Boolean'];
    createOneByPhoneNumber: Scalars['Boolean'];
    emailAddressUpdate: GQLUserEmailAddressUpdateMutation;
    followings: GQLUserFollowingMutation;
    globalBookingRequests: GQLUserGlobalBookingRequestMutation;
    notificationConfiguration: GQLNotificationConfigurationMutation;
    notifications: GQLUserNotificationMutation;
    oneTimeAccessToken: GQLUserOneTimeAccessTokenMutation;
    phoneNumberUpdate: GQLUserPhoneNumberUpdateMutation;
    sessions: GQLUserSessionMutation;
    supportRequests: GQLUserSupportRequestMutation;
    updateGender: Scalars['Boolean'];
    updateIsLocked: Scalars['Boolean'];
    updatePassword: Scalars['Boolean'];
    updateProfilePicture: Scalars['Boolean'];
};

export type GQLUserMutationAddressesArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationBookingRequestsArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationCreateOneByEmailAddressArgs = {
    profilePicture?: InputMaybe<Scalars['Upload']>;
    request: GQLCreateOneUserByEmailAddressRequest;
};

export type GQLUserMutationCreateOneByIdentityProviderArgs = {
    request: GQLCreateOneUserByIdentityProviderRequest;
};

export type GQLUserMutationCreateOneByPhoneNumberArgs = {
    request: GQLCreateOneUserByPhoneNumberRequest;
};

export type GQLUserMutationEmailAddressUpdateArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationFollowingsArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationGlobalBookingRequestsArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationNotificationConfigurationArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationNotificationsArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationOneTimeAccessTokenArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationPhoneNumberUpdateArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationSessionsArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationSupportRequestsArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationUpdateGenderArgs = {
    gender: GQLGender;
    userId: Scalars['String'];
};

export type GQLUserMutationUpdateIsLockedArgs = {
    isLocked: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLUserMutationUpdatePasswordArgs = {
    password: Scalars['String'];
    userId: Scalars['String'];
};

export type GQLUserMutationUpdateProfilePictureArgs = {
    profilePicture?: InputMaybe<Scalars['Upload']>;
    userId: Scalars['String'];
};

export type GQLUserNotificationMutation = {
    __typename?: 'UserNotificationMutation';
    deleteAll: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    updateAllWasRead: Scalars['Boolean'];
    updateOneWasRead: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLUserNotificationMutationDeleteOneArgs = {
    notificationId: Scalars['String'];
};

export type GQLUserNotificationMutationUpdateAllWasReadArgs = {
    wasRead: Scalars['Boolean'];
};

export type GQLUserNotificationMutationUpdateOneWasReadArgs = {
    notificationId: Scalars['String'];
    wasRead: Scalars['Boolean'];
};

export type GQLUserOneTimeAccessTokenMutation = {
    __typename?: 'UserOneTimeAccessTokenMutation';
    confirm: Scalars['Boolean'];
    createOneForEmailAddress: Scalars['Boolean'];
    createOneForPhoneNumber: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLUserOneTimeAccessTokenMutationConfirmArgs = {
    secret: Scalars['String'];
};

export type GQLUserOneTimeAccessTokenMutationCreateOneForEmailAddressArgs = {
    emailAddress: Scalars['EmailAddress'];
};

export type GQLUserOneTimeAccessTokenMutationCreateOneForPhoneNumberArgs = {
    phoneNumber: Scalars['PhoneNumber'];
};

export type GQLUserOneTimeAccessTokenQuery = {
    __typename?: 'UserOneTimeAccessTokenQuery';
    findOne?: Maybe<GQLOneTimeAccessToken>;
    userId: Scalars['String'];
};

export type GQLUserPhoneNumberUpdateMutation = {
    __typename?: 'UserPhoneNumberUpdateMutation';
    confirm: Scalars['Boolean'];
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLUserPhoneNumberUpdateMutationConfirmArgs = {
    secret: Scalars['String'];
};

export type GQLUserPhoneNumberUpdateMutationCreateOneArgs = {
    phoneNumber: Scalars['PhoneNumber'];
};

export type GQLUserPhoneNumberUpdateQuery = {
    __typename?: 'UserPhoneNumberUpdateQuery';
    findOne?: Maybe<GQLPhoneNumberUpdate>;
    userId: Scalars['String'];
};

export type GQLUserQuery = {
    __typename?: 'UserQuery';
    addresses: GQLUserAddressQuery;
    bookingRequests: GQLUserBookingRequestQuery;
    cookRatings: GQLUserCookRatingQuery;
    cookVisits: GQLUserAddressQuery;
    emailAddressUpdate: GQLUserEmailAddressUpdateQuery;
    findMany?: Maybe<Array<GQLUser>>;
    findOne?: Maybe<GQLUser>;
    followings: GQLUserFollowingQuery;
    globalBookingRequests: GQLUserGlobalBookingRequestQuery;
    me?: Maybe<GQLUser>;
    menuVisits: GQLUserAddressQuery;
    notificationConfiguration?: Maybe<GQLNotificationConfigurationQuery>;
    notifications: GQLNotificationQuery;
    oneTimeAccessToken: GQLUserOneTimeAccessTokenQuery;
    phoneNumberUpdate: GQLUserPhoneNumberUpdateQuery;
    sessions: GQLUserSessionQuery;
    userRatings: GQLUserUserRatingQuery;
};

export type GQLUserQueryAddressesArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryBookingRequestsArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryCookRatingsArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryCookVisitsArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryEmailAddressUpdateArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryFindManyArgs = {
    request: GQLFindManyRequest;
};

export type GQLUserQueryFindOneArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryFollowingsArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryGlobalBookingRequestsArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryMenuVisitsArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryNotificationConfigurationArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryNotificationsArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryOneTimeAccessTokenArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryPhoneNumberUpdateArgs = {
    userId: Scalars['String'];
};

export type GQLUserQuerySessionsArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryUserRatingsArgs = {
    userId: Scalars['String'];
};

export type GQLUserRating = {
    __typename?: 'UserRating';
    bookingRequest: GQLBookingRequest;
    bookingRequestId: Scalars['String'];
    comment?: Maybe<Scalars['String']>;
    cook: GQLPublicCook;
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    user: GQLPublicUser;
    userId: Scalars['String'];
    value: Scalars['UInt'];
};

export type GQLUserSessionMutation = {
    __typename?: 'UserSessionMutation';
    expireCurrent: Scalars['Boolean'];
    expireMany: Scalars['Boolean'];
    expireOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLUserSessionMutationExpireManyArgs = {
    request: Array<Scalars['String']>;
};

export type GQLUserSessionMutationExpireOneArgs = {
    request: GQLExpireOneSessionRequest;
};

export type GQLUserSessionQuery = {
    __typename?: 'UserSessionQuery';
    findMany?: Maybe<Array<GQLSession>>;
    userId: Scalars['String'];
};

export type GQLUserSupportRequestMutation = {
    __typename?: 'UserSupportRequestMutation';
    createOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLUserSupportRequestMutationCreateOneArgs = {
    request: GQLCreateOneSupportRequest;
};

export type GQLUserUserRatingQuery = {
    __typename?: 'UserUserRatingQuery';
    findMany: Array<GQLUserRating>;
    userId: Scalars['String'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
    | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type GQLResolversUnionTypes = {
    CouponCode: GQLGiftCard | GQLGiftCardPromoCode;
    CreateOneGiftCardResponse: GQLCreateOneGiftCardFailedResponse | GQLCreateOneGiftCardSuccessResponse;
    DeleteMealResult: GQLDeleteMealErrorResult | GQLDeleteMealRequiredForMenuResult | GQLDeleteMealSuccessResult;
};

/** Mapping of union parent types */
export type GQLResolversUnionParentTypes = {
    CouponCode: GQLGiftCard | GQLGiftCardPromoCode;
    CreateOneGiftCardResponse: GQLCreateOneGiftCardFailedResponse | GQLCreateOneGiftCardSuccessResponse;
    DeleteMealResult: GQLDeleteMealErrorResult | GQLDeleteMealRequiredForMenuResult | GQLDeleteMealSuccessResult;
};

/** Mapping between all available schema types and the resolvers types */
export type GQLResolversTypes = {
    Address: ResolverTypeWrapper<GQLAddress>;
    Admin: ResolverTypeWrapper<GQLAdmin>;
    AdminGiftCardPromoCodeMutation: ResolverTypeWrapper<GQLAdminGiftCardPromoCodeMutation>;
    AdminGiftCardPromoCodeQuery: ResolverTypeWrapper<GQLAdminGiftCardPromoCodeQuery>;
    AdminMutation: ResolverTypeWrapper<GQLAdminMutation>;
    AdminQuery: ResolverTypeWrapper<GQLAdminQuery>;
    Allergy: ResolverTypeWrapper<GQLAllergy>;
    AllergyMutation: ResolverTypeWrapper<GQLAllergyMutation>;
    AllergyQuery: ResolverTypeWrapper<GQLAllergyQuery>;
    AnonymousSession: ResolverTypeWrapper<GQLAnonymousSession>;
    AnonymousUser: ResolverTypeWrapper<GQLAnonymousUser>;
    BookingRequest: ResolverTypeWrapper<GQLBookingRequest>;
    BookingRequestQuery: ResolverTypeWrapper<GQLBookingRequestQuery>;
    BookingRequestStatus: GQLBookingRequestStatus;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Category: ResolverTypeWrapper<GQLCategory>;
    CategoryMutation: ResolverTypeWrapper<GQLCategoryMutation>;
    CategoryQuery: ResolverTypeWrapper<GQLCategoryQuery>;
    ChatMessage: ResolverTypeWrapper<GQLChatMessage>;
    ConfiguredMenu: ResolverTypeWrapper<GQLConfiguredMenu>;
    ConfiguredMenuCourse: ResolverTypeWrapper<GQLConfiguredMenuCourse>;
    Cook: ResolverTypeWrapper<GQLCook>;
    CookBookingRequestChatMessageMutation: ResolverTypeWrapper<GQLCookBookingRequestChatMessageMutation>;
    CookBookingRequestChatMessageQuery: ResolverTypeWrapper<GQLCookBookingRequestChatMessageQuery>;
    CookBookingRequestMutation: ResolverTypeWrapper<GQLCookBookingRequestMutation>;
    CookBookingRequestQuery: ResolverTypeWrapper<GQLCookBookingRequestQuery>;
    CookCookRatingQuery: ResolverTypeWrapper<GQLCookCookRatingQuery>;
    CookCookVisitQuery: ResolverTypeWrapper<GQLCookCookVisitQuery>;
    CookFollowingQuery: ResolverTypeWrapper<GQLCookFollowingQuery>;
    CookGlobalBookingRequestQuery: ResolverTypeWrapper<GQLCookGlobalBookingRequestQuery>;
    CookMealMutation: ResolverTypeWrapper<Omit<GQLCookMealMutation, 'deleteOne'> & { deleteOne: GQLResolversTypes['DeleteMealResult'] }>;
    CookMealQuery: ResolverTypeWrapper<GQLCookMealQuery>;
    CookMenuCourseMealOptionMutation: ResolverTypeWrapper<GQLCookMenuCourseMealOptionMutation>;
    CookMenuCourseMealOptionQuery: ResolverTypeWrapper<GQLCookMenuCourseMealOptionQuery>;
    CookMenuCourseMutation: ResolverTypeWrapper<GQLCookMenuCourseMutation>;
    CookMenuCourseQuery: ResolverTypeWrapper<GQLCookMenuCourseQuery>;
    CookMenuMutation: ResolverTypeWrapper<GQLCookMenuMutation>;
    CookMenuQuery: ResolverTypeWrapper<GQLCookMenuQuery>;
    CookMenuVisitQuery: ResolverTypeWrapper<GQLCookMenuVisitQuery>;
    CookMutation: ResolverTypeWrapper<GQLCookMutation>;
    CookQuery: ResolverTypeWrapper<GQLCookQuery>;
    CookRank: GQLCookRank;
    CookRating: ResolverTypeWrapper<GQLCookRating>;
    CookSpecificFee: ResolverTypeWrapper<GQLCookSpecificFee>;
    CookSpecificFeeMutation: ResolverTypeWrapper<GQLCookSpecificFeeMutation>;
    CookSpecificFeeQuery: ResolverTypeWrapper<GQLCookSpecificFeeQuery>;
    CookUserRatingQuery: ResolverTypeWrapper<GQLCookUserRatingQuery>;
    CookVisit: ResolverTypeWrapper<GQLCookVisit>;
    CookVisitMutation: ResolverTypeWrapper<GQLCookVisitMutation>;
    CookVisitStatistics: ResolverTypeWrapper<GQLCookVisitStatistics>;
    CouponCode: ResolverTypeWrapper<GQLResolversUnionTypes['CouponCode']>;
    CouponCodeQuery: ResolverTypeWrapper<Omit<GQLCouponCodeQuery, 'findOne'> & { findOne?: Maybe<GQLResolversTypes['CouponCode']> }>;
    Course: ResolverTypeWrapper<GQLCourse>;
    CreateBookingRequestRequest: GQLCreateBookingRequestRequest;
    CreateChatMessageRequest: GQLCreateChatMessageRequest;
    CreateConfiguredMenuCourseRequest: GQLCreateConfiguredMenuCourseRequest;
    CreateConfiguredMenuRequest: GQLCreateConfiguredMenuRequest;
    CreateCookBookingRequestRequest: GQLCreateCookBookingRequestRequest;
    CreateMenuBookingRequestRequest: GQLCreateMenuBookingRequestRequest;
    CreateOneAddressRequest: GQLCreateOneAddressRequest;
    CreateOneAdminRequest: GQLCreateOneAdminRequest;
    CreateOneCookRequest: GQLCreateOneCookRequest;
    CreateOneCourseRequest: GQLCreateOneCourseRequest;
    CreateOneGiftCardFailedResponse: ResolverTypeWrapper<GQLCreateOneGiftCardFailedResponse>;
    CreateOneGiftCardPromoCodeRequest: GQLCreateOneGiftCardPromoCodeRequest;
    CreateOneGiftCardRequest: GQLCreateOneGiftCardRequest;
    CreateOneGiftCardRequestBuyer: GQLCreateOneGiftCardRequestBuyer;
    CreateOneGiftCardResponse: ResolverTypeWrapper<GQLResolversUnionTypes['CreateOneGiftCardResponse']>;
    CreateOneGiftCardSuccessResponse: ResolverTypeWrapper<GQLCreateOneGiftCardSuccessResponse>;
    CreateOneGlobalBookingRequestRequest: GQLCreateOneGlobalBookingRequestRequest;
    CreateOneMealOptionRequest: GQLCreateOneMealOptionRequest;
    CreateOneMealRequest: GQLCreateOneMealRequest;
    CreateOneMenuRequest: GQLCreateOneMenuRequest;
    CreateOneNotificationRequest: GQLCreateOneNotificationRequest;
    CreateOnePrivacyPolicyUpdateRequest: GQLCreateOnePrivacyPolicyUpdateRequest;
    CreateOneSearchRequestRequest: GQLCreateOneSearchRequestRequest;
    CreateOneSessionByEmailAddressRequest: GQLCreateOneSessionByEmailAddressRequest;
    CreateOneSessionByIdentityProviderRequest: GQLCreateOneSessionByIdentityProviderRequest;
    CreateOneSessionByPhoneNumberRequest: GQLCreateOneSessionByPhoneNumberRequest;
    CreateOneSupportRequest: GQLCreateOneSupportRequest;
    CreateOneTermsUpdateRequest: GQLCreateOneTermsUpdateRequest;
    CreateOneUserByEmailAddressRequest: GQLCreateOneUserByEmailAddressRequest;
    CreateOneUserByIdentityProviderRequest: GQLCreateOneUserByIdentityProviderRequest;
    CreateOneUserByPhoneNumberRequest: GQLCreateOneUserByPhoneNumberRequest;
    CurrencyCode: GQLCurrencyCode;
    CustomerFeeUpdate: ResolverTypeWrapper<GQLCustomerFeeUpdate>;
    CustomerFeeUpdateMutation: ResolverTypeWrapper<GQLCustomerFeeUpdateMutation>;
    CustomerFeeUpdateQuery: ResolverTypeWrapper<GQLCustomerFeeUpdateQuery>;
    Date: ResolverTypeWrapper<Scalars['Date']>;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
    DeleteMealErrorResult: ResolverTypeWrapper<GQLDeleteMealErrorResult>;
    DeleteMealRequiredForMenuResult: ResolverTypeWrapper<GQLDeleteMealRequiredForMenuResult>;
    DeleteMealResult: ResolverTypeWrapper<GQLResolversUnionTypes['DeleteMealResult']>;
    DeleteMealSuccessResult: ResolverTypeWrapper<GQLDeleteMealSuccessResult>;
    EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
    EmailAddressUpdate: ResolverTypeWrapper<GQLEmailAddressUpdate>;
    ExpireOneSessionRequest: GQLExpireOneSessionRequest;
    FindManyPublicCooksRequest: GQLFindManyPublicCooksRequest;
    FindManyPublicMenusRequest: GQLFindManyPublicMenusRequest;
    FindManyRequest: GQLFindManyRequest;
    Following: ResolverTypeWrapper<GQLFollowing>;
    Gender: GQLGender;
    GiftCard: ResolverTypeWrapper<GQLGiftCard>;
    GiftCardMutation: ResolverTypeWrapper<
        Omit<GQLGiftCardMutation, 'createOne'> & { createOne: GQLResolversTypes['CreateOneGiftCardResponse'] }
    >;
    GiftCardPromoCode: ResolverTypeWrapper<GQLGiftCardPromoCode>;
    GiftCardQuery: ResolverTypeWrapper<GQLGiftCardQuery>;
    GiftCardRecipient: GQLGiftCardRecipient;
    GiftCardRecipientDeliveryInformation: GQLGiftCardRecipientDeliveryInformation;
    GiftCardStatus: GQLGiftCardStatus;
    GlobalBookingRequest: ResolverTypeWrapper<GQLGlobalBookingRequest>;
    GlobalBookingRequestPriceClass: ResolverTypeWrapper<GQLGlobalBookingRequestPriceClass>;
    GlobalBookingRequestPriceClassType: GQLGlobalBookingRequestPriceClassType;
    GlobalBookingRequestQuery: ResolverTypeWrapper<GQLGlobalBookingRequestQuery>;
    IdentityProvider: GQLIdentityProvider;
    Kitchen: ResolverTypeWrapper<GQLKitchen>;
    KitchenMutation: ResolverTypeWrapper<GQLKitchenMutation>;
    KitchenQuery: ResolverTypeWrapper<GQLKitchenQuery>;
    Language: ResolverTypeWrapper<GQLLanguage>;
    LanguageMutation: ResolverTypeWrapper<GQLLanguageMutation>;
    LanguageQuery: ResolverTypeWrapper<GQLLanguageQuery>;
    Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
    Location: ResolverTypeWrapper<GQLLocation>;
    LocationInput: GQLLocationInput;
    Longitude: ResolverTypeWrapper<Scalars['Longitude']>;
    Meal: ResolverTypeWrapper<GQLMeal>;
    MealOption: ResolverTypeWrapper<GQLMealOption>;
    MealType: GQLMealType;
    Menu: ResolverTypeWrapper<GQLMenu>;
    MenuConfiguration: ResolverTypeWrapper<GQLMenuConfiguration>;
    MenuConfigurationCourse: ResolverTypeWrapper<GQLMenuConfigurationCourse>;
    MenuVisit: ResolverTypeWrapper<GQLMenuVisit>;
    MenuVisitMutation: ResolverTypeWrapper<GQLMenuVisitMutation>;
    MenuVisitStatistics: ResolverTypeWrapper<GQLMenuVisitStatistics>;
    Mutation: ResolverTypeWrapper<{}>;
    NewsletterSubscriptionMutation: ResolverTypeWrapper<GQLNewsletterSubscriptionMutation>;
    Notification: ResolverTypeWrapper<GQLNotification>;
    NotificationConfiguration: ResolverTypeWrapper<GQLNotificationConfiguration>;
    NotificationConfigurationMutation: ResolverTypeWrapper<GQLNotificationConfigurationMutation>;
    NotificationConfigurationQuery: ResolverTypeWrapper<GQLNotificationConfigurationQuery>;
    NotificationMutation: ResolverTypeWrapper<GQLNotificationMutation>;
    NotificationQuery: ResolverTypeWrapper<GQLNotificationQuery>;
    OneTimeAccessToken: ResolverTypeWrapper<GQLOneTimeAccessToken>;
    PaymentProvider: GQLPaymentProvider;
    PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
    PhoneNumberUpdate: ResolverTypeWrapper<GQLPhoneNumberUpdate>;
    Platform: GQLPlatform;
    Price: ResolverTypeWrapper<GQLPrice>;
    PriceInput: GQLPriceInput;
    PrivacyPolicyUpdate: ResolverTypeWrapper<GQLPrivacyPolicyUpdate>;
    PrivacyPolicyUpdateMutation: ResolverTypeWrapper<GQLPrivacyPolicyUpdateMutation>;
    PrivacyPolicyUpdateQuery: ResolverTypeWrapper<GQLPrivacyPolicyUpdateQuery>;
    PublicCook: ResolverTypeWrapper<GQLPublicCook>;
    PublicCookQuery: ResolverTypeWrapper<GQLPublicCookQuery>;
    PublicMenu: ResolverTypeWrapper<GQLPublicMenu>;
    PublicMenuQuery: ResolverTypeWrapper<GQLPublicMenuQuery>;
    PublicPrivacyPolicyUpdate: ResolverTypeWrapper<GQLPublicPrivacyPolicyUpdate>;
    PublicPrivacyPolicyUpdateQuery: ResolverTypeWrapper<GQLPublicPrivacyPolicyUpdateQuery>;
    PublicTermsUpdate: ResolverTypeWrapper<GQLPublicTermsUpdate>;
    PublicTermsUpdateQuery: ResolverTypeWrapper<GQLPublicTermsUpdateQuery>;
    PublicUser: ResolverTypeWrapper<GQLPublicUser>;
    Query: ResolverTypeWrapper<{}>;
    SearchRequest: ResolverTypeWrapper<GQLSearchRequest>;
    SearchRequestMutation: ResolverTypeWrapper<GQLSearchRequestMutation>;
    SearchRequestOrigin: GQLSearchRequestOrigin;
    SearchRequestQuery: ResolverTypeWrapper<GQLSearchRequestQuery>;
    Session: ResolverTypeWrapper<GQLSession>;
    SessionCookieSettings: ResolverTypeWrapper<GQLSessionCookieSettings>;
    SessionCookieSettingsInput: GQLSessionCookieSettingsInput;
    SessionMutation: ResolverTypeWrapper<GQLSessionMutation>;
    SessionQuery: ResolverTypeWrapper<GQLSessionQuery>;
    String: ResolverTypeWrapper<Scalars['String']>;
    Subscription: ResolverTypeWrapper<{}>;
    SupportRequest: ResolverTypeWrapper<GQLSupportRequest>;
    SupportRequestQuery: ResolverTypeWrapper<GQLSupportRequestQuery>;
    TermsUpdate: ResolverTypeWrapper<GQLTermsUpdate>;
    TermsUpdateMutation: ResolverTypeWrapper<GQLTermsUpdateMutation>;
    TermsUpdateQuery: ResolverTypeWrapper<GQLTermsUpdateQuery>;
    UInt: ResolverTypeWrapper<Scalars['UInt']>;
    UUID: ResolverTypeWrapper<Scalars['UUID']>;
    UpdateOneMenuKeyMealOptionRequest: GQLUpdateOneMenuKeyMealOptionRequest;
    Upload: ResolverTypeWrapper<Scalars['Upload']>;
    Url: ResolverTypeWrapper<Scalars['Url']>;
    User: ResolverTypeWrapper<GQLUser>;
    UserAddressMutation: ResolverTypeWrapper<GQLUserAddressMutation>;
    UserAddressQuery: ResolverTypeWrapper<GQLUserAddressQuery>;
    UserBookingRequestChatMessageMutation: ResolverTypeWrapper<GQLUserBookingRequestChatMessageMutation>;
    UserBookingRequestChatMessageQuery: ResolverTypeWrapper<GQLUserBookingRequestChatMessageQuery>;
    UserBookingRequestMutation: ResolverTypeWrapper<GQLUserBookingRequestMutation>;
    UserBookingRequestQuery: ResolverTypeWrapper<GQLUserBookingRequestQuery>;
    UserCookRatingQuery: ResolverTypeWrapper<GQLUserCookRatingQuery>;
    UserCookVisitQuery: ResolverTypeWrapper<GQLUserCookVisitQuery>;
    UserCreateOneBookingRequestResponse: ResolverTypeWrapper<GQLUserCreateOneBookingRequestResponse>;
    UserEmailAddressUpdateMutation: ResolverTypeWrapper<GQLUserEmailAddressUpdateMutation>;
    UserEmailAddressUpdateQuery: ResolverTypeWrapper<GQLUserEmailAddressUpdateQuery>;
    UserFollowingMutation: ResolverTypeWrapper<GQLUserFollowingMutation>;
    UserFollowingQuery: ResolverTypeWrapper<GQLUserFollowingQuery>;
    UserGlobalBookingRequestMutation: ResolverTypeWrapper<GQLUserGlobalBookingRequestMutation>;
    UserGlobalBookingRequestQuery: ResolverTypeWrapper<GQLUserGlobalBookingRequestQuery>;
    UserLanguage: GQLUserLanguage;
    UserMenuVisitQuery: ResolverTypeWrapper<GQLUserMenuVisitQuery>;
    UserMutation: ResolverTypeWrapper<GQLUserMutation>;
    UserNotificationMutation: ResolverTypeWrapper<GQLUserNotificationMutation>;
    UserOneTimeAccessTokenMutation: ResolverTypeWrapper<GQLUserOneTimeAccessTokenMutation>;
    UserOneTimeAccessTokenQuery: ResolverTypeWrapper<GQLUserOneTimeAccessTokenQuery>;
    UserPhoneNumberUpdateMutation: ResolverTypeWrapper<GQLUserPhoneNumberUpdateMutation>;
    UserPhoneNumberUpdateQuery: ResolverTypeWrapper<GQLUserPhoneNumberUpdateQuery>;
    UserQuery: ResolverTypeWrapper<GQLUserQuery>;
    UserRating: ResolverTypeWrapper<GQLUserRating>;
    UserSessionMutation: ResolverTypeWrapper<GQLUserSessionMutation>;
    UserSessionQuery: ResolverTypeWrapper<GQLUserSessionQuery>;
    UserSupportRequestMutation: ResolverTypeWrapper<GQLUserSupportRequestMutation>;
    UserUserRatingQuery: ResolverTypeWrapper<GQLUserUserRatingQuery>;
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
    Address: GQLAddress;
    Admin: GQLAdmin;
    AdminGiftCardPromoCodeMutation: GQLAdminGiftCardPromoCodeMutation;
    AdminGiftCardPromoCodeQuery: GQLAdminGiftCardPromoCodeQuery;
    AdminMutation: GQLAdminMutation;
    AdminQuery: GQLAdminQuery;
    Allergy: GQLAllergy;
    AllergyMutation: GQLAllergyMutation;
    AllergyQuery: GQLAllergyQuery;
    AnonymousSession: GQLAnonymousSession;
    AnonymousUser: GQLAnonymousUser;
    BookingRequest: GQLBookingRequest;
    BookingRequestQuery: GQLBookingRequestQuery;
    Boolean: Scalars['Boolean'];
    Category: GQLCategory;
    CategoryMutation: GQLCategoryMutation;
    CategoryQuery: GQLCategoryQuery;
    ChatMessage: GQLChatMessage;
    ConfiguredMenu: GQLConfiguredMenu;
    ConfiguredMenuCourse: GQLConfiguredMenuCourse;
    Cook: GQLCook;
    CookBookingRequestChatMessageMutation: GQLCookBookingRequestChatMessageMutation;
    CookBookingRequestChatMessageQuery: GQLCookBookingRequestChatMessageQuery;
    CookBookingRequestMutation: GQLCookBookingRequestMutation;
    CookBookingRequestQuery: GQLCookBookingRequestQuery;
    CookCookRatingQuery: GQLCookCookRatingQuery;
    CookCookVisitQuery: GQLCookCookVisitQuery;
    CookFollowingQuery: GQLCookFollowingQuery;
    CookGlobalBookingRequestQuery: GQLCookGlobalBookingRequestQuery;
    CookMealMutation: Omit<GQLCookMealMutation, 'deleteOne'> & { deleteOne: GQLResolversParentTypes['DeleteMealResult'] };
    CookMealQuery: GQLCookMealQuery;
    CookMenuCourseMealOptionMutation: GQLCookMenuCourseMealOptionMutation;
    CookMenuCourseMealOptionQuery: GQLCookMenuCourseMealOptionQuery;
    CookMenuCourseMutation: GQLCookMenuCourseMutation;
    CookMenuCourseQuery: GQLCookMenuCourseQuery;
    CookMenuMutation: GQLCookMenuMutation;
    CookMenuQuery: GQLCookMenuQuery;
    CookMenuVisitQuery: GQLCookMenuVisitQuery;
    CookMutation: GQLCookMutation;
    CookQuery: GQLCookQuery;
    CookRating: GQLCookRating;
    CookSpecificFee: GQLCookSpecificFee;
    CookSpecificFeeMutation: GQLCookSpecificFeeMutation;
    CookSpecificFeeQuery: GQLCookSpecificFeeQuery;
    CookUserRatingQuery: GQLCookUserRatingQuery;
    CookVisit: GQLCookVisit;
    CookVisitMutation: GQLCookVisitMutation;
    CookVisitStatistics: GQLCookVisitStatistics;
    CouponCode: GQLResolversUnionParentTypes['CouponCode'];
    CouponCodeQuery: Omit<GQLCouponCodeQuery, 'findOne'> & { findOne?: Maybe<GQLResolversParentTypes['CouponCode']> };
    Course: GQLCourse;
    CreateBookingRequestRequest: GQLCreateBookingRequestRequest;
    CreateChatMessageRequest: GQLCreateChatMessageRequest;
    CreateConfiguredMenuCourseRequest: GQLCreateConfiguredMenuCourseRequest;
    CreateConfiguredMenuRequest: GQLCreateConfiguredMenuRequest;
    CreateCookBookingRequestRequest: GQLCreateCookBookingRequestRequest;
    CreateMenuBookingRequestRequest: GQLCreateMenuBookingRequestRequest;
    CreateOneAddressRequest: GQLCreateOneAddressRequest;
    CreateOneAdminRequest: GQLCreateOneAdminRequest;
    CreateOneCookRequest: GQLCreateOneCookRequest;
    CreateOneCourseRequest: GQLCreateOneCourseRequest;
    CreateOneGiftCardFailedResponse: GQLCreateOneGiftCardFailedResponse;
    CreateOneGiftCardPromoCodeRequest: GQLCreateOneGiftCardPromoCodeRequest;
    CreateOneGiftCardRequest: GQLCreateOneGiftCardRequest;
    CreateOneGiftCardRequestBuyer: GQLCreateOneGiftCardRequestBuyer;
    CreateOneGiftCardResponse: GQLResolversUnionParentTypes['CreateOneGiftCardResponse'];
    CreateOneGiftCardSuccessResponse: GQLCreateOneGiftCardSuccessResponse;
    CreateOneGlobalBookingRequestRequest: GQLCreateOneGlobalBookingRequestRequest;
    CreateOneMealOptionRequest: GQLCreateOneMealOptionRequest;
    CreateOneMealRequest: GQLCreateOneMealRequest;
    CreateOneMenuRequest: GQLCreateOneMenuRequest;
    CreateOneNotificationRequest: GQLCreateOneNotificationRequest;
    CreateOnePrivacyPolicyUpdateRequest: GQLCreateOnePrivacyPolicyUpdateRequest;
    CreateOneSearchRequestRequest: GQLCreateOneSearchRequestRequest;
    CreateOneSessionByEmailAddressRequest: GQLCreateOneSessionByEmailAddressRequest;
    CreateOneSessionByIdentityProviderRequest: GQLCreateOneSessionByIdentityProviderRequest;
    CreateOneSessionByPhoneNumberRequest: GQLCreateOneSessionByPhoneNumberRequest;
    CreateOneSupportRequest: GQLCreateOneSupportRequest;
    CreateOneTermsUpdateRequest: GQLCreateOneTermsUpdateRequest;
    CreateOneUserByEmailAddressRequest: GQLCreateOneUserByEmailAddressRequest;
    CreateOneUserByIdentityProviderRequest: GQLCreateOneUserByIdentityProviderRequest;
    CreateOneUserByPhoneNumberRequest: GQLCreateOneUserByPhoneNumberRequest;
    CustomerFeeUpdate: GQLCustomerFeeUpdate;
    CustomerFeeUpdateMutation: GQLCustomerFeeUpdateMutation;
    CustomerFeeUpdateQuery: GQLCustomerFeeUpdateQuery;
    Date: Scalars['Date'];
    DateTime: Scalars['DateTime'];
    DeleteMealErrorResult: GQLDeleteMealErrorResult;
    DeleteMealRequiredForMenuResult: GQLDeleteMealRequiredForMenuResult;
    DeleteMealResult: GQLResolversUnionParentTypes['DeleteMealResult'];
    DeleteMealSuccessResult: GQLDeleteMealSuccessResult;
    EmailAddress: Scalars['EmailAddress'];
    EmailAddressUpdate: GQLEmailAddressUpdate;
    ExpireOneSessionRequest: GQLExpireOneSessionRequest;
    FindManyPublicCooksRequest: GQLFindManyPublicCooksRequest;
    FindManyPublicMenusRequest: GQLFindManyPublicMenusRequest;
    FindManyRequest: GQLFindManyRequest;
    Following: GQLFollowing;
    GiftCard: GQLGiftCard;
    GiftCardMutation: Omit<GQLGiftCardMutation, 'createOne'> & { createOne: GQLResolversParentTypes['CreateOneGiftCardResponse'] };
    GiftCardPromoCode: GQLGiftCardPromoCode;
    GiftCardQuery: GQLGiftCardQuery;
    GiftCardRecipient: GQLGiftCardRecipient;
    GiftCardRecipientDeliveryInformation: GQLGiftCardRecipientDeliveryInformation;
    GlobalBookingRequest: GQLGlobalBookingRequest;
    GlobalBookingRequestPriceClass: GQLGlobalBookingRequestPriceClass;
    GlobalBookingRequestQuery: GQLGlobalBookingRequestQuery;
    Kitchen: GQLKitchen;
    KitchenMutation: GQLKitchenMutation;
    KitchenQuery: GQLKitchenQuery;
    Language: GQLLanguage;
    LanguageMutation: GQLLanguageMutation;
    LanguageQuery: GQLLanguageQuery;
    Latitude: Scalars['Latitude'];
    Location: GQLLocation;
    LocationInput: GQLLocationInput;
    Longitude: Scalars['Longitude'];
    Meal: GQLMeal;
    MealOption: GQLMealOption;
    Menu: GQLMenu;
    MenuConfiguration: GQLMenuConfiguration;
    MenuConfigurationCourse: GQLMenuConfigurationCourse;
    MenuVisit: GQLMenuVisit;
    MenuVisitMutation: GQLMenuVisitMutation;
    MenuVisitStatistics: GQLMenuVisitStatistics;
    Mutation: {};
    NewsletterSubscriptionMutation: GQLNewsletterSubscriptionMutation;
    Notification: GQLNotification;
    NotificationConfiguration: GQLNotificationConfiguration;
    NotificationConfigurationMutation: GQLNotificationConfigurationMutation;
    NotificationConfigurationQuery: GQLNotificationConfigurationQuery;
    NotificationMutation: GQLNotificationMutation;
    NotificationQuery: GQLNotificationQuery;
    OneTimeAccessToken: GQLOneTimeAccessToken;
    PhoneNumber: Scalars['PhoneNumber'];
    PhoneNumberUpdate: GQLPhoneNumberUpdate;
    Price: GQLPrice;
    PriceInput: GQLPriceInput;
    PrivacyPolicyUpdate: GQLPrivacyPolicyUpdate;
    PrivacyPolicyUpdateMutation: GQLPrivacyPolicyUpdateMutation;
    PrivacyPolicyUpdateQuery: GQLPrivacyPolicyUpdateQuery;
    PublicCook: GQLPublicCook;
    PublicCookQuery: GQLPublicCookQuery;
    PublicMenu: GQLPublicMenu;
    PublicMenuQuery: GQLPublicMenuQuery;
    PublicPrivacyPolicyUpdate: GQLPublicPrivacyPolicyUpdate;
    PublicPrivacyPolicyUpdateQuery: GQLPublicPrivacyPolicyUpdateQuery;
    PublicTermsUpdate: GQLPublicTermsUpdate;
    PublicTermsUpdateQuery: GQLPublicTermsUpdateQuery;
    PublicUser: GQLPublicUser;
    Query: {};
    SearchRequest: GQLSearchRequest;
    SearchRequestMutation: GQLSearchRequestMutation;
    SearchRequestQuery: GQLSearchRequestQuery;
    Session: GQLSession;
    SessionCookieSettings: GQLSessionCookieSettings;
    SessionCookieSettingsInput: GQLSessionCookieSettingsInput;
    SessionMutation: GQLSessionMutation;
    SessionQuery: GQLSessionQuery;
    String: Scalars['String'];
    Subscription: {};
    SupportRequest: GQLSupportRequest;
    SupportRequestQuery: GQLSupportRequestQuery;
    TermsUpdate: GQLTermsUpdate;
    TermsUpdateMutation: GQLTermsUpdateMutation;
    TermsUpdateQuery: GQLTermsUpdateQuery;
    UInt: Scalars['UInt'];
    UUID: Scalars['UUID'];
    UpdateOneMenuKeyMealOptionRequest: GQLUpdateOneMenuKeyMealOptionRequest;
    Upload: Scalars['Upload'];
    Url: Scalars['Url'];
    User: GQLUser;
    UserAddressMutation: GQLUserAddressMutation;
    UserAddressQuery: GQLUserAddressQuery;
    UserBookingRequestChatMessageMutation: GQLUserBookingRequestChatMessageMutation;
    UserBookingRequestChatMessageQuery: GQLUserBookingRequestChatMessageQuery;
    UserBookingRequestMutation: GQLUserBookingRequestMutation;
    UserBookingRequestQuery: GQLUserBookingRequestQuery;
    UserCookRatingQuery: GQLUserCookRatingQuery;
    UserCookVisitQuery: GQLUserCookVisitQuery;
    UserCreateOneBookingRequestResponse: GQLUserCreateOneBookingRequestResponse;
    UserEmailAddressUpdateMutation: GQLUserEmailAddressUpdateMutation;
    UserEmailAddressUpdateQuery: GQLUserEmailAddressUpdateQuery;
    UserFollowingMutation: GQLUserFollowingMutation;
    UserFollowingQuery: GQLUserFollowingQuery;
    UserGlobalBookingRequestMutation: GQLUserGlobalBookingRequestMutation;
    UserGlobalBookingRequestQuery: GQLUserGlobalBookingRequestQuery;
    UserMenuVisitQuery: GQLUserMenuVisitQuery;
    UserMutation: GQLUserMutation;
    UserNotificationMutation: GQLUserNotificationMutation;
    UserOneTimeAccessTokenMutation: GQLUserOneTimeAccessTokenMutation;
    UserOneTimeAccessTokenQuery: GQLUserOneTimeAccessTokenQuery;
    UserPhoneNumberUpdateMutation: GQLUserPhoneNumberUpdateMutation;
    UserPhoneNumberUpdateQuery: GQLUserPhoneNumberUpdateQuery;
    UserQuery: GQLUserQuery;
    UserRating: GQLUserRating;
    UserSessionMutation: GQLUserSessionMutation;
    UserSessionQuery: GQLUserSessionQuery;
    UserSupportRequestMutation: GQLUserSupportRequestMutation;
    UserUserRatingQuery: GQLUserUserRatingQuery;
};

export type GQLAddressResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Address'] = GQLResolversParentTypes['Address'],
> = {
    addressId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    city?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    country?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    houseNumber?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    location?: Resolver<GQLResolversTypes['Location'], ParentType, ContextType>;
    postCode?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    street?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAdminResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Admin'] = GQLResolversParentTypes['Admin']> = {
    adminId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['PublicUser'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAdminGiftCardPromoCodeMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['AdminGiftCardPromoCodeMutation'] = GQLResolversParentTypes['AdminGiftCardPromoCodeMutation'],
> = {
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLAdminGiftCardPromoCodeMutationCreateOneArgs, 'giftCardPromoCode'>
    >;
    deleteOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLAdminGiftCardPromoCodeMutationDeleteOneArgs, 'giftCardPromoCodeId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAdminGiftCardPromoCodeQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['AdminGiftCardPromoCodeQuery'] = GQLResolversParentTypes['AdminGiftCardPromoCodeQuery'],
> = {
    findMany?: Resolver<Array<GQLResolversTypes['GiftCardPromoCode']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAdminMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['AdminMutation'] = GQLResolversParentTypes['AdminMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLAdminMutationCreateOneArgs, 'request'>>;
    giftCardPromoCodes?: Resolver<GQLResolversTypes['AdminGiftCardPromoCodeMutation'], ParentType, ContextType>;
    unlockBookingRequestPayment?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLAdminMutationUnlockBookingRequestPaymentArgs, 'bookingRequestId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAdminQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['AdminQuery'] = GQLResolversParentTypes['AdminQuery'],
> = {
    findMany?: Resolver<Array<GQLResolversTypes['Admin']>, ParentType, ContextType, Partial<GQLAdminQueryFindManyArgs>>;
    findOne?: Resolver<Maybe<GQLResolversTypes['Admin']>, ParentType, ContextType, RequireFields<GQLAdminQueryFindOneArgs, 'adminId'>>;
    giftCardPromoCodes?: Resolver<GQLResolversTypes['AdminGiftCardPromoCodeQuery'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAllergyResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Allergy'] = GQLResolversParentTypes['Allergy'],
> = {
    allergyId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAllergyMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['AllergyMutation'] = GQLResolversParentTypes['AllergyMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAllergyQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['AllergyQuery'] = GQLResolversParentTypes['AllergyQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['Allergy']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAnonymousSessionResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['AnonymousSession'] = GQLResolversParentTypes['AnonymousSession'],
> = {
    anonymousUser?: Resolver<Maybe<GQLResolversTypes['AnonymousUser']>, ParentType, ContextType>;
    platform?: Resolver<GQLResolversTypes['Platform'], ParentType, ContextType>;
    sessionId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    userId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAnonymousUserResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['AnonymousUser'] = GQLResolversParentTypes['AnonymousUser'],
> = {
    birthDate?: Resolver<Maybe<GQLResolversTypes['Date']>, ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    gender?: Resolver<GQLResolversTypes['Gender'], ParentType, ContextType>;
    language?: Resolver<GQLResolversTypes['UserLanguage'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLBookingRequestResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['BookingRequest'] = GQLResolversParentTypes['BookingRequest'],
> = {
    adultParticipants?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    allergies?: Resolver<Array<GQLResolversTypes['Allergy']>, ParentType, ContextType>;
    bookingRequestId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    children?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    configuredMenu?: Resolver<Maybe<GQLResolversTypes['ConfiguredMenu']>, ParentType, ContextType>;
    cook?: Resolver<GQLResolversTypes['PublicCook'], ParentType, ContextType>;
    cookAccepted?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    dateTime?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    duration?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    giftCard?: Resolver<Maybe<GQLResolversTypes['GiftCard']>, ParentType, ContextType>;
    giftCardPromoCode?: Resolver<Maybe<GQLResolversTypes['GiftCardPromoCode']>, ParentType, ContextType>;
    globalBookingRequestId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    kitchenId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    location?: Resolver<GQLResolversTypes['Location'], ParentType, ContextType>;
    message?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    occasion?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    preparationTime?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    price?: Resolver<GQLResolversTypes['Price'], ParentType, ContextType>;
    status?: Resolver<GQLResolversTypes['BookingRequestStatus'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['PublicUser'], ParentType, ContextType>;
    userAccepted?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLBookingRequestQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['BookingRequestQuery'] = GQLResolversParentTypes['BookingRequestQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['BookingRequest']>>, ParentType, ContextType>;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['BookingRequest']>,
        ParentType,
        ContextType,
        RequireFields<GQLBookingRequestQueryFindOneArgs, 'bookingRequestId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCategoryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Category'] = GQLResolversParentTypes['Category'],
> = {
    categoryId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCategoryMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CategoryMutation'] = GQLResolversParentTypes['CategoryMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCategoryQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CategoryQuery'] = GQLResolversParentTypes['CategoryQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['Category']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLChatMessageResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['ChatMessage'] = GQLResolversParentTypes['ChatMessage'],
> = {
    bookingRequestId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    chatMessageId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    createdBy?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    generated?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    message?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLConfiguredMenuResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['ConfiguredMenu'] = GQLResolversParentTypes['ConfiguredMenu'],
> = {
    bookingRequestId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    courses?: Resolver<Array<GQLResolversTypes['ConfiguredMenuCourse']>, ParentType, ContextType>;
    description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    greetingFromKitchen?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    kitchenId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    menuId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLConfiguredMenuCourseResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['ConfiguredMenuCourse'] = GQLResolversParentTypes['ConfiguredMenuCourse'],
> = {
    index?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    mealDescription?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    mealImageUrl?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    mealTitle?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    mealType?: Resolver<Maybe<GQLResolversTypes['MealType']>, ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Cook'] = GQLResolversParentTypes['Cook']> = {
    biography?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    bookingRequests?: Resolver<Array<GQLResolversTypes['BookingRequest']>, ParentType, ContextType>;
    city?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    followerCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    followers?: Resolver<Array<GQLResolversTypes['Following']>, ParentType, ContextType>;
    hasStripePayoutMethodActivated?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    isLocked?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    isVisible?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    languages?: Resolver<Array<GQLResolversTypes['Language']>, ParentType, ContextType>;
    location?: Resolver<GQLResolversTypes['Location'], ParentType, ContextType>;
    maximumParticipants?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    maximumPrice?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    maximumTravelDistance?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    mealCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    meals?: Resolver<Array<GQLResolversTypes['Meal']>, ParentType, ContextType>;
    menuCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    menus?: Resolver<Array<GQLResolversTypes['Menu']>, ParentType, ContextType>;
    minimumParticipants?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    minimumPrice?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    rank?: Resolver<GQLResolversTypes['CookRank'], ParentType, ContextType>;
    ratingAverage?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    ratingCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    travelExpenses?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['User'], ParentType, ContextType>;
    visitStatistics?: Resolver<GQLResolversTypes['CookVisitStatistics'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookBookingRequestChatMessageMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookBookingRequestChatMessageMutation'] = GQLResolversParentTypes['CookBookingRequestChatMessageMutation'],
> = {
    bookingRequestId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookBookingRequestChatMessageMutationCreateOneArgs, 'request'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookBookingRequestChatMessageQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookBookingRequestChatMessageQuery'] = GQLResolversParentTypes['CookBookingRequestChatMessageQuery'],
> = {
    bookingRequestId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    findMany?: Resolver<
        Maybe<Array<GQLResolversTypes['ChatMessage']>>,
        ParentType,
        ContextType,
        Partial<GQLCookBookingRequestChatMessageQueryFindManyArgs>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookBookingRequestMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookBookingRequestMutation'] = GQLResolversParentTypes['CookBookingRequestMutation'],
> = {
    accept?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookBookingRequestMutationAcceptArgs, 'bookingRequestId'>
    >;
    chatMessages?: Resolver<
        GQLResolversTypes['CookBookingRequestChatMessageMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLCookBookingRequestMutationChatMessagesArgs, 'bookingRequestId'>
    >;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookBookingRequestMutationCreateOneArgs, 'globalBookingRequestId'>
    >;
    decline?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookBookingRequestMutationDeclineArgs, 'bookingRequestId'>
    >;
    updatePrice?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookBookingRequestMutationUpdatePriceArgs, 'bookingRequestId' | 'price'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookBookingRequestQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookBookingRequestQuery'] = GQLResolversParentTypes['CookBookingRequestQuery'],
> = {
    chatMessages?: Resolver<
        GQLResolversTypes['CookBookingRequestChatMessageQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLCookBookingRequestQueryChatMessagesArgs, 'bookingRequestId'>
    >;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    findMany?: Resolver<
        Maybe<Array<GQLResolversTypes['BookingRequest']>>,
        ParentType,
        ContextType,
        Partial<GQLCookBookingRequestQueryFindManyArgs>
    >;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['BookingRequest']>,
        ParentType,
        ContextType,
        RequireFields<GQLCookBookingRequestQueryFindOneArgs, 'bookingRequestId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookCookRatingQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookCookRatingQuery'] = GQLResolversParentTypes['CookCookRatingQuery'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    findMany?: Resolver<Array<GQLResolversTypes['CookRating']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookCookVisitQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookCookVisitQuery'] = GQLResolversParentTypes['CookCookVisitQuery'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Address']>>, ParentType, ContextType, Partial<GQLCookCookVisitQueryFindManyArgs>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookFollowingQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookFollowingQuery'] = GQLResolversParentTypes['CookFollowingQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['Following']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookGlobalBookingRequestQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookGlobalBookingRequestQuery'] = GQLResolversParentTypes['CookGlobalBookingRequestQuery'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    findMany?: Resolver<
        Maybe<Array<GQLResolversTypes['GlobalBookingRequest']>>,
        ParentType,
        ContextType,
        Partial<GQLCookGlobalBookingRequestQueryFindManyArgs>
    >;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['GlobalBookingRequest']>,
        ParentType,
        ContextType,
        RequireFields<GQLCookGlobalBookingRequestQueryFindOneArgs, 'globalBookingRequestId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMealMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMealMutation'] = GQLResolversParentTypes['CookMealMutation'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLCookMealMutationCreateOneArgs, 'meal'>>;
    deleteOne?: Resolver<
        GQLResolversTypes['DeleteMealResult'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMealMutationDeleteOneArgs, 'mealId'>
    >;
    updateDescription?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMealMutationUpdateDescriptionArgs, 'description' | 'mealId'>
    >;
    updateImage?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMealMutationUpdateImageArgs, 'mealId'>
    >;
    updateTitle?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMealMutationUpdateTitleArgs, 'mealId' | 'title'>
    >;
    updateType?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMealMutationUpdateTypeArgs, 'mealId' | 'type'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMealQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMealQuery'] = GQLResolversParentTypes['CookMealQuery'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    findMany?: Resolver<Array<GQLResolversTypes['Meal']>, ParentType, ContextType, Partial<GQLCookMealQueryFindManyArgs>>;
    findOne?: Resolver<Maybe<GQLResolversTypes['Meal']>, ParentType, ContextType, RequireFields<GQLCookMealQueryFindOneArgs, 'mealId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMenuCourseMealOptionMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMenuCourseMealOptionMutation'] = GQLResolversParentTypes['CookMenuCourseMealOptionMutation'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    courseId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createMany?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuCourseMealOptionMutationCreateManyArgs, 'mealOptions'>
    >;
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuCourseMealOptionMutationCreateOneArgs, 'mealOption'>
    >;
    deleteOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuCourseMealOptionMutationDeleteOneArgs, 'mealId'>
    >;
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMenuCourseMealOptionQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMenuCourseMealOptionQuery'] = GQLResolversParentTypes['CookMenuCourseMealOptionQuery'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    findMany?: Resolver<
        Array<GQLResolversTypes['MealOption']>,
        ParentType,
        ContextType,
        Partial<GQLCookMenuCourseMealOptionQueryFindManyArgs>
    >;
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMenuCourseMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMenuCourseMutation'] = GQLResolversParentTypes['CookMenuCourseMutation'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuCourseMutationCreateOneArgs, 'request'>
    >;
    deleteOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuCourseMutationDeleteOneArgs, 'courseId'>
    >;
    mealOptions?: Resolver<
        GQLResolversTypes['CookMenuCourseMealOptionMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuCourseMutationMealOptionsArgs, 'courseId'>
    >;
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    updateTitle?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuCourseMutationUpdateTitleArgs, 'courseId' | 'title'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMenuCourseQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMenuCourseQuery'] = GQLResolversParentTypes['CookMenuCourseQuery'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    findAll?: Resolver<Array<GQLResolversTypes['Course']>, ParentType, ContextType>;
    mealOptions?: Resolver<
        GQLResolversTypes['CookMenuCourseMealOptionQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuCourseQueryMealOptionsArgs, 'courseId'>
    >;
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMenuMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMenuMutation'] = GQLResolversParentTypes['CookMenuMutation'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    courses?: Resolver<
        GQLResolversTypes['CookMenuCourseMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationCoursesArgs, 'menuId'>
    >;
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLCookMenuMutationCreateOneArgs, 'menu'>>;
    deleteOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLCookMenuMutationDeleteOneArgs, 'menuId'>>;
    updateBasePrice?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateBasePriceArgs, 'basePrice' | 'menuId'>
    >;
    updateBasePriceCustomers?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateBasePriceCustomersArgs, 'basePriceCustomers' | 'menuId'>
    >;
    updateCurrencyCode?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateCurrencyCodeArgs, 'currencyCode' | 'menuId'>
    >;
    updateDescription?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateDescriptionArgs, 'description' | 'menuId'>
    >;
    updateGreetingFromKitchen?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateGreetingFromKitchenArgs, 'menuId'>
    >;
    updateIsVisible?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateIsVisibleArgs, 'isVisible' | 'menuId'>
    >;
    updateKeyMealOption?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateKeyMealOptionArgs, 'menuId'>
    >;
    updateKitchenId?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateKitchenIdArgs, 'menuId'>
    >;
    updatePreparationTime?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdatePreparationTimeArgs, 'menuId' | 'preparationTime'>
    >;
    updatePricePerAdult?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdatePricePerAdultArgs, 'menuId' | 'pricePerAdult'>
    >;
    updatePricePerChild?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdatePricePerChildArgs, 'menuId'>
    >;
    updateTitle?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateTitleArgs, 'menuId' | 'title'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMenuQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMenuQuery'] = GQLResolversParentTypes['CookMenuQuery'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    courses?: Resolver<
        GQLResolversTypes['CookMenuCourseQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuQueryCoursesArgs, 'cookId' | 'menuId'>
    >;
    findMany?: Resolver<Array<GQLResolversTypes['Menu']>, ParentType, ContextType, Partial<GQLCookMenuQueryFindManyArgs>>;
    findOne?: Resolver<Maybe<GQLResolversTypes['Menu']>, ParentType, ContextType, RequireFields<GQLCookMenuQueryFindOneArgs, 'menuId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMenuVisitQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMenuVisitQuery'] = GQLResolversParentTypes['CookMenuVisitQuery'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Address']>>, ParentType, ContextType, Partial<GQLCookMenuVisitQueryFindManyArgs>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMutation'] = GQLResolversParentTypes['CookMutation'],
> = {
    addOneLanguage?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationAddOneLanguageArgs, 'cookId' | 'languageId'>
    >;
    bookingRequests?: Resolver<
        GQLResolversTypes['CookBookingRequestMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationBookingRequestsArgs, 'cookId'>
    >;
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationCreateOneArgs, 'cookId' | 'request'>
    >;
    meals?: Resolver<GQLResolversTypes['CookMealMutation'], ParentType, ContextType, RequireFields<GQLCookMutationMealsArgs, 'cookId'>>;
    menus?: Resolver<GQLResolversTypes['CookMenuMutation'], ParentType, ContextType, RequireFields<GQLCookMutationMenusArgs, 'cookId'>>;
    removeOneLanguage?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationRemoveOneLanguageArgs, 'cookId' | 'languageId'>
    >;
    updateBiography?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateBiographyArgs, 'biography' | 'cookId'>
    >;
    updateHasStripePayoutMethodActivated?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateHasStripePayoutMethodActivatedArgs, 'cookId'>
    >;
    updateIsLocked?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateIsLockedArgs, 'cookId' | 'isLocked'>
    >;
    updateIsVisible?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateIsVisibleArgs, 'cookId' | 'isVisible'>
    >;
    updateLocation?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateLocationArgs, 'cookId' | 'location'>
    >;
    updateMaximumParticipants?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateMaximumParticipantsArgs, 'cookId'>
    >;
    updateMaximumPrice?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateMaximumPriceArgs, 'cookId'>
    >;
    updateMaximumTravelDistance?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateMaximumTravelDistanceArgs, 'cookId'>
    >;
    updateMinimumParticipants?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateMinimumParticipantsArgs, 'cookId'>
    >;
    updateMinimumPrice?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateMinimumPriceArgs, 'cookId'>
    >;
    updateRank?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateRankArgs, 'cookId' | 'rank'>
    >;
    updateTravelExpenses?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateTravelExpensesArgs, 'cookId' | 'travelExpenses'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookQuery'] = GQLResolversParentTypes['CookQuery'],
> = {
    bookingRequests?: Resolver<
        GQLResolversTypes['CookBookingRequestQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLCookQueryBookingRequestsArgs, 'cookId'>
    >;
    cookRatings?: Resolver<
        GQLResolversTypes['CookCookRatingQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLCookQueryCookRatingsArgs, 'cookId'>
    >;
    cookVisits?: Resolver<
        GQLResolversTypes['UserAddressQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLCookQueryCookVisitsArgs, 'cookId'>
    >;
    findMany?: Resolver<Array<GQLResolversTypes['Cook']>, ParentType, ContextType, RequireFields<GQLCookQueryFindManyArgs, 'request'>>;
    findOne?: Resolver<Maybe<GQLResolversTypes['Cook']>, ParentType, ContextType, RequireFields<GQLCookQueryFindOneArgs, 'cookId'>>;
    followers?: Resolver<GQLResolversTypes['CookFollowingQuery'], ParentType, ContextType>;
    getStripeDashboardUrl?: Resolver<
        Maybe<GQLResolversTypes['Url']>,
        ParentType,
        ContextType,
        RequireFields<GQLCookQueryGetStripeDashboardUrlArgs, 'cookId'>
    >;
    getStripeOnboardingUrl?: Resolver<
        Maybe<GQLResolversTypes['Url']>,
        ParentType,
        ContextType,
        RequireFields<GQLCookQueryGetStripeOnboardingUrlArgs, 'cookId'>
    >;
    globalBookingRequests?: Resolver<
        GQLResolversTypes['CookGlobalBookingRequestQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLCookQueryGlobalBookingRequestsArgs, 'cookId'>
    >;
    meals?: Resolver<GQLResolversTypes['CookMealQuery'], ParentType, ContextType, RequireFields<GQLCookQueryMealsArgs, 'cookId'>>;
    menuVisits?: Resolver<
        GQLResolversTypes['UserAddressQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLCookQueryMenuVisitsArgs, 'cookId'>
    >;
    menus?: Resolver<GQLResolversTypes['CookMenuQuery'], ParentType, ContextType, RequireFields<GQLCookQueryMenusArgs, 'cookId'>>;
    userRatings?: Resolver<
        GQLResolversTypes['CookUserRatingQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLCookQueryUserRatingsArgs, 'cookId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookRatingResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookRating'] = GQLResolversParentTypes['CookRating'],
> = {
    bookingRequest?: Resolver<GQLResolversTypes['BookingRequest'], ParentType, ContextType>;
    bookingRequestId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    comment?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    cook?: Resolver<GQLResolversTypes['PublicCook'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['PublicUser'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    value?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookSpecificFeeResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookSpecificFee'] = GQLResolversParentTypes['CookSpecificFee'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookSpecificFeeMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookSpecificFeeMutation'] = GQLResolversParentTypes['CookSpecificFeeMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookSpecificFeeQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookSpecificFeeQuery'] = GQLResolversParentTypes['CookSpecificFeeQuery'],
> = {
    findMany?: Resolver<Array<GQLResolversTypes['CookSpecificFee']>, ParentType, ContextType, Partial<GQLCookSpecificFeeQueryFindManyArgs>>;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['CookSpecificFee']>,
        ParentType,
        ContextType,
        RequireFields<GQLCookSpecificFeeQueryFindOneArgs, 'cookId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookUserRatingQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookUserRatingQuery'] = GQLResolversParentTypes['CookUserRatingQuery'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    findMany?: Resolver<Array<GQLResolversTypes['UserRating']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookVisitResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookVisit'] = GQLResolversParentTypes['CookVisit'],
> = {
    cook?: Resolver<GQLResolversTypes['PublicCook'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    cookVisitId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    session?: Resolver<GQLResolversTypes['AnonymousSession'], ParentType, ContextType>;
    sessionId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookVisitMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookVisitMutation'] = GQLResolversParentTypes['CookVisitMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLCookVisitMutationCreateOneArgs, 'cookId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookVisitStatisticsResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookVisitStatistics'] = GQLResolversParentTypes['CookVisitStatistics'],
> = {
    visitCountLastMonth?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    visitCountLastWeek?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    visitCountTotal?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    visits?: Resolver<Array<GQLResolversTypes['CookVisit']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCouponCodeResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CouponCode'] = GQLResolversParentTypes['CouponCode'],
> = {
    __resolveType: TypeResolveFn<'GiftCard' | 'GiftCardPromoCode', ParentType, ContextType>;
};

export type GQLCouponCodeQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CouponCodeQuery'] = GQLResolversParentTypes['CouponCodeQuery'],
> = {
    findOne?: Resolver<
        Maybe<GQLResolversTypes['CouponCode']>,
        ParentType,
        ContextType,
        RequireFields<GQLCouponCodeQueryFindOneArgs, 'couponCodeId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCourseResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Course'] = GQLResolversParentTypes['Course'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    courseId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    index?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    mealOptionCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    mealOptions?: Resolver<Array<GQLResolversTypes['MealOption']>, ParentType, ContextType>;
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCreateOneGiftCardFailedResponseResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CreateOneGiftCardFailedResponse'] = GQLResolversParentTypes['CreateOneGiftCardFailedResponse'],
> = {
    failed?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCreateOneGiftCardResponseResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CreateOneGiftCardResponse'] = GQLResolversParentTypes['CreateOneGiftCardResponse'],
> = {
    __resolveType: TypeResolveFn<'CreateOneGiftCardFailedResponse' | 'CreateOneGiftCardSuccessResponse', ParentType, ContextType>;
};

export type GQLCreateOneGiftCardSuccessResponseResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CreateOneGiftCardSuccessResponse'] = GQLResolversParentTypes['CreateOneGiftCardSuccessResponse'],
> = {
    giftCardId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    stripeClientSecret?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCustomerFeeUpdateResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CustomerFeeUpdate'] = GQLResolversParentTypes['CustomerFeeUpdate'],
> = {
    adminId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['PublicUser'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCustomerFeeUpdateMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CustomerFeeUpdateMutation'] = GQLResolversParentTypes['CustomerFeeUpdateMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCustomerFeeUpdateQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CustomerFeeUpdateQuery'] = GQLResolversParentTypes['CustomerFeeUpdateQuery'],
> = {
    findMany?: Resolver<Array<GQLResolversTypes['Admin']>, ParentType, ContextType, Partial<GQLCustomerFeeUpdateQueryFindManyArgs>>;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['Admin']>,
        ParentType,
        ContextType,
        RequireFields<GQLCustomerFeeUpdateQueryFindOneArgs, 'adminId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLDateScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['Date'], any> {
    name: 'Date';
}

export interface GQLDateTimeScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['DateTime'], any> {
    name: 'DateTime';
}

export type GQLDeleteMealErrorResultResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['DeleteMealErrorResult'] = GQLResolversParentTypes['DeleteMealErrorResult'],
> = {
    failedAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLDeleteMealRequiredForMenuResultResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['DeleteMealRequiredForMenuResult'] = GQLResolversParentTypes['DeleteMealRequiredForMenuResult'],
> = {
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    menuTitle?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLDeleteMealResultResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['DeleteMealResult'] = GQLResolversParentTypes['DeleteMealResult'],
> = {
    __resolveType: TypeResolveFn<
        'DeleteMealErrorResult' | 'DeleteMealRequiredForMenuResult' | 'DeleteMealSuccessResult',
        ParentType,
        ContextType
    >;
};

export type GQLDeleteMealSuccessResultResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['DeleteMealSuccessResult'] = GQLResolversParentTypes['DeleteMealSuccessResult'],
> = {
    deletedAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLEmailAddressScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['EmailAddress'], any> {
    name: 'EmailAddress';
}

export type GQLEmailAddressUpdateResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['EmailAddressUpdate'] = GQLResolversParentTypes['EmailAddressUpdate'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    emailAddress?: Resolver<GQLResolversTypes['EmailAddress'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFollowingResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Following'] = GQLResolversParentTypes['Following'],
> = {
    cook?: Resolver<GQLResolversTypes['PublicCook'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['AnonymousUser'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLGiftCardResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['GiftCard'] = GQLResolversParentTypes['GiftCard'],
> = {
    balance?: Resolver<GQLResolversTypes['Price'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    expiresAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    giftCardId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    redeemCode?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    status?: Resolver<GQLResolversTypes['GiftCardStatus'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLGiftCardMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['GiftCardMutation'] = GQLResolversParentTypes['GiftCardMutation'],
> = {
    confirmOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLGiftCardMutationConfirmOneArgs, 'giftCardId'>
    >;
    createOne?: Resolver<
        GQLResolversTypes['CreateOneGiftCardResponse'],
        ParentType,
        ContextType,
        RequireFields<GQLGiftCardMutationCreateOneArgs, 'request'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLGiftCardPromoCodeResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['GiftCardPromoCode'] = GQLResolversParentTypes['GiftCardPromoCode'],
> = {
    balance?: Resolver<GQLResolversTypes['Price'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    expiresAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    giftCardPromoCodeId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    redeemCode?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLGiftCardQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['GiftCardQuery'] = GQLResolversParentTypes['GiftCardQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['GiftCard']>, ParentType, ContextType>;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['GiftCard']>,
        ParentType,
        ContextType,
        RequireFields<GQLGiftCardQueryFindOneArgs, 'redeemCode'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLGlobalBookingRequestResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['GlobalBookingRequest'] = GQLResolversParentTypes['GlobalBookingRequest'],
> = {
    adultParticipants?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    allergies?: Resolver<Array<GQLResolversTypes['Allergy']>, ParentType, ContextType>;
    children?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    dateTime?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    duration?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    globalBookingRequestId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    location?: Resolver<GQLResolversTypes['Location'], ParentType, ContextType>;
    message?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    occasion?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    priceClass?: Resolver<GQLResolversTypes['GlobalBookingRequestPriceClass'], ParentType, ContextType>;
    priceClassType?: Resolver<GQLResolversTypes['GlobalBookingRequestPriceClassType'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['PublicUser'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLGlobalBookingRequestPriceClassResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['GlobalBookingRequestPriceClass'] = GQLResolversParentTypes['GlobalBookingRequestPriceClass'],
> = {
    currencyCode?: Resolver<GQLResolversTypes['CurrencyCode'], ParentType, ContextType>;
    max?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    min?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    type?: Resolver<GQLResolversTypes['GlobalBookingRequestPriceClassType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLGlobalBookingRequestQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['GlobalBookingRequestQuery'] = GQLResolversParentTypes['GlobalBookingRequestQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['GlobalBookingRequest']>>, ParentType, ContextType>;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['GlobalBookingRequest']>,
        ParentType,
        ContextType,
        RequireFields<GQLGlobalBookingRequestQueryFindOneArgs, 'globalBookingRequestId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLKitchenResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Kitchen'] = GQLResolversParentTypes['Kitchen'],
> = {
    kitchenId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLKitchenMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['KitchenMutation'] = GQLResolversParentTypes['KitchenMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLKitchenQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['KitchenQuery'] = GQLResolversParentTypes['KitchenQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['Kitchen']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLanguageResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Language'] = GQLResolversParentTypes['Language'],
> = {
    languageId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLanguageMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['LanguageMutation'] = GQLResolversParentTypes['LanguageMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLanguageQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['LanguageQuery'] = GQLResolversParentTypes['LanguageQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['Language']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLLatitudeScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['Latitude'], any> {
    name: 'Latitude';
}

export type GQLLocationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Location'] = GQLResolversParentTypes['Location'],
> = {
    latitude?: Resolver<GQLResolversTypes['Latitude'], ParentType, ContextType>;
    longitude?: Resolver<GQLResolversTypes['Longitude'], ParentType, ContextType>;
    text?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLLongitudeScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['Longitude'], any> {
    name: 'Longitude';
}

export type GQLMealResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Meal'] = GQLResolversParentTypes['Meal']> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    imageUrl?: Resolver<Maybe<GQLResolversTypes['Url']>, ParentType, ContextType>;
    mealId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    type?: Resolver<GQLResolversTypes['MealType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMealOptionResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['MealOption'] = GQLResolversParentTypes['MealOption'],
> = {
    index?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    meal?: Resolver<GQLResolversTypes['Meal'], ParentType, ContextType>;
    mealId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMenuResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Menu'] = GQLResolversParentTypes['Menu']> = {
    basePrice?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    basePriceCustomers?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    categories?: Resolver<Array<GQLResolversTypes['Category']>, ParentType, ContextType>;
    cook?: Resolver<GQLResolversTypes['Cook'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    courseCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    courses?: Resolver<Array<GQLResolversTypes['Course']>, ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    currencyCode?: Resolver<GQLResolversTypes['CurrencyCode'], ParentType, ContextType>;
    description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    greetingFromKitchen?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    imageUrl?: Resolver<Maybe<GQLResolversTypes['Url']>, ParentType, ContextType>;
    imageUrls?: Resolver<Array<GQLResolversTypes['Url']>, ParentType, ContextType>;
    isVisible?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    kitchen?: Resolver<Maybe<GQLResolversTypes['Kitchen']>, ParentType, ContextType>;
    kitchenId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    preparationTime?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    pricePerAdult?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    pricePerChild?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    visitStatistics?: Resolver<GQLResolversTypes['MenuVisitStatistics'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMenuConfigurationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['MenuConfiguration'] = GQLResolversParentTypes['MenuConfiguration'],
> = {
    bookingRequestId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    categories?: Resolver<Array<GQLResolversTypes['Category']>, ParentType, ContextType>;
    categoryIds?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
    courses?: Resolver<Array<GQLResolversTypes['MenuConfigurationCourse']>, ParentType, ContextType>;
    greetingsFromKitchen?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    kitchen?: Resolver<GQLResolversTypes['Kitchen'], ParentType, ContextType>;
    kitchenId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    menuDescription?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    menuTitle?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMenuConfigurationCourseResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['MenuConfigurationCourse'] = GQLResolversParentTypes['MenuConfigurationCourse'],
> = {
    courseTitle?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    mealDescription?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    mealImageUrl?: Resolver<GQLResolversTypes['Url'], ParentType, ContextType>;
    mealTitle?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    mealType?: Resolver<GQLResolversTypes['MealType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMenuVisitResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['MenuVisit'] = GQLResolversParentTypes['MenuVisit'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    menu?: Resolver<GQLResolversTypes['PublicMenu'], ParentType, ContextType>;
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    menuVisitId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    session?: Resolver<GQLResolversTypes['AnonymousSession'], ParentType, ContextType>;
    sessionId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMenuVisitMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['MenuVisitMutation'] = GQLResolversParentTypes['MenuVisitMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLMenuVisitMutationCreateOneArgs, 'menuId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMenuVisitStatisticsResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['MenuVisitStatistics'] = GQLResolversParentTypes['MenuVisitStatistics'],
> = {
    visitCountLastMonth?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    visitCountLastWeek?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    visitCountTotal?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    visits?: Resolver<Array<GQLResolversTypes['MenuVisit']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Mutation'] = GQLResolversParentTypes['Mutation'],
> = {
    admins?: Resolver<GQLResolversTypes['AdminMutation'], ParentType, ContextType>;
    allergies?: Resolver<GQLResolversTypes['AllergyMutation'], ParentType, ContextType>;
    categories?: Resolver<GQLResolversTypes['CategoryMutation'], ParentType, ContextType>;
    cookSpecificFees?: Resolver<GQLResolversTypes['CookSpecificFeeMutation'], ParentType, ContextType>;
    cookVisits?: Resolver<GQLResolversTypes['CookVisitMutation'], ParentType, ContextType>;
    cooks?: Resolver<GQLResolversTypes['CookMutation'], ParentType, ContextType>;
    customerFeeUpdates?: Resolver<GQLResolversTypes['CustomerFeeUpdateMutation'], ParentType, ContextType>;
    giftCards?: Resolver<GQLResolversTypes['GiftCardMutation'], ParentType, ContextType>;
    kitchens?: Resolver<GQLResolversTypes['KitchenMutation'], ParentType, ContextType>;
    languages?: Resolver<GQLResolversTypes['LanguageMutation'], ParentType, ContextType>;
    menuVisits?: Resolver<GQLResolversTypes['MenuVisitMutation'], ParentType, ContextType>;
    newsletterSubscriptions?: Resolver<GQLResolversTypes['NewsletterSubscriptionMutation'], ParentType, ContextType>;
    notifications?: Resolver<GQLResolversTypes['NotificationMutation'], ParentType, ContextType>;
    privacyPolicyUpdates?: Resolver<GQLResolversTypes['PrivacyPolicyUpdateMutation'], ParentType, ContextType>;
    searchRequests?: Resolver<GQLResolversTypes['SearchRequestMutation'], ParentType, ContextType>;
    sessions?: Resolver<GQLResolversTypes['SessionMutation'], ParentType, ContextType>;
    termsUpdates?: Resolver<GQLResolversTypes['TermsUpdateMutation'], ParentType, ContextType>;
    users?: Resolver<GQLResolversTypes['UserMutation'], ParentType, ContextType>;
};

export type GQLNewsletterSubscriptionMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['NewsletterSubscriptionMutation'] = GQLResolversParentTypes['NewsletterSubscriptionMutation'],
> = {
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLNewsletterSubscriptionMutationCreateOneArgs, 'emailAddress'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNotificationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Notification'] = GQLResolversParentTypes['Notification'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    message?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    notificationId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    url?: Resolver<Maybe<GQLResolversTypes['Url']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    wasRead?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNotificationConfigurationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['NotificationConfiguration'] = GQLResolversParentTypes['NotificationConfiguration'],
> = {
    emailsForAccount?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    emailsForBookingRequests?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    emailsForFavoriteCooks?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    emailsForOffers?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    pushesForAccount?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    pushesForBookingRequests?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    pushesForFavoriteCooks?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    pushesForOffers?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNotificationConfigurationMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['NotificationConfigurationMutation'] = GQLResolversParentTypes['NotificationConfigurationMutation'],
> = {
    update?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNotificationConfigurationQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['NotificationConfigurationQuery'] = GQLResolversParentTypes['NotificationConfigurationQuery'],
> = {
    findOne?: Resolver<GQLResolversTypes['NotificationConfiguration'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNotificationMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['NotificationMutation'] = GQLResolversParentTypes['NotificationMutation'],
> = {
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLNotificationMutationCreateOneArgs, 'request'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNotificationQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['NotificationQuery'] = GQLResolversParentTypes['NotificationQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Notification']>>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLOneTimeAccessTokenResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['OneTimeAccessToken'] = GQLResolversParentTypes['OneTimeAccessToken'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLPhoneNumberScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['PhoneNumber'], any> {
    name: 'PhoneNumber';
}

export type GQLPhoneNumberUpdateResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PhoneNumberUpdate'] = GQLResolversParentTypes['PhoneNumberUpdate'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    phoneNumber?: Resolver<GQLResolversTypes['PhoneNumber'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPriceResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Price'] = GQLResolversParentTypes['Price']> = {
    amount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    currencyCode?: Resolver<GQLResolversTypes['CurrencyCode'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPrivacyPolicyUpdateResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PrivacyPolicyUpdate'] = GQLResolversParentTypes['PrivacyPolicyUpdate'],
> = {
    admin?: Resolver<GQLResolversTypes['Admin'], ParentType, ContextType>;
    adminId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    englishText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    germanText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    privacyPolicyUpdateId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPrivacyPolicyUpdateMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PrivacyPolicyUpdateMutation'] = GQLResolversParentTypes['PrivacyPolicyUpdateMutation'],
> = {
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLPrivacyPolicyUpdateMutationCreateOneArgs, 'request'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPrivacyPolicyUpdateQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PrivacyPolicyUpdateQuery'] = GQLResolversParentTypes['PrivacyPolicyUpdateQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['PrivacyPolicyUpdate']>, ParentType, ContextType>;
    findLatest?: Resolver<Maybe<GQLResolversTypes['PrivacyPolicyUpdate']>, ParentType, ContextType>;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['PrivacyPolicyUpdate']>,
        ParentType,
        ContextType,
        RequireFields<GQLPrivacyPolicyUpdateQueryFindOneArgs, 'privacyPolicyUpdateId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicCookResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PublicCook'] = GQLResolversParentTypes['PublicCook'],
> = {
    biography?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    city?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    languages?: Resolver<Array<GQLResolversTypes['Language']>, ParentType, ContextType>;
    location?: Resolver<GQLResolversTypes['Location'], ParentType, ContextType>;
    maximumParticipants?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    maximumPrice?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    maximumTravelDistance?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    menuCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    menus?: Resolver<Array<GQLResolversTypes['PublicMenu']>, ParentType, ContextType>;
    minimumParticipants?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    minimumPrice?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    rank?: Resolver<GQLResolversTypes['CookRank'], ParentType, ContextType>;
    travelExpenses?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['PublicUser'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicCookQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PublicCookQuery'] = GQLResolversParentTypes['PublicCookQuery'],
> = {
    checkAvailability?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLPublicCookQueryCheckAvailabilityArgs, 'request'>
    >;
    findHeroes?: Resolver<Array<GQLResolversTypes['PublicCook']>, ParentType, ContextType>;
    findMany?: Resolver<
        Array<GQLResolversTypes['PublicCook']>,
        ParentType,
        ContextType,
        RequireFields<GQLPublicCookQueryFindManyArgs, 'request'>
    >;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['PublicCook']>,
        ParentType,
        ContextType,
        RequireFields<GQLPublicCookQueryFindOneArgs, 'cookId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicMenuResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PublicMenu'] = GQLResolversParentTypes['PublicMenu'],
> = {
    basePrice?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    basePriceCustomers?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    categories?: Resolver<Array<GQLResolversTypes['Category']>, ParentType, ContextType>;
    cook?: Resolver<GQLResolversTypes['PublicCook'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    courseCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    courses?: Resolver<Array<GQLResolversTypes['Course']>, ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    currencyCode?: Resolver<GQLResolversTypes['CurrencyCode'], ParentType, ContextType>;
    description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    greetingFromKitchen?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    imageUrl?: Resolver<Maybe<GQLResolversTypes['Url']>, ParentType, ContextType>;
    kitchen?: Resolver<Maybe<GQLResolversTypes['Kitchen']>, ParentType, ContextType>;
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    preparationTime?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    pricePerAdult?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    pricePerChild?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicMenuQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PublicMenuQuery'] = GQLResolversParentTypes['PublicMenuQuery'],
> = {
    checkAvailability?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLPublicMenuQueryCheckAvailabilityArgs, 'request'>
    >;
    findHeroes?: Resolver<Array<GQLResolversTypes['PublicMenu']>, ParentType, ContextType>;
    findMany?: Resolver<
        Array<GQLResolversTypes['PublicMenu']>,
        ParentType,
        ContextType,
        RequireFields<GQLPublicMenuQueryFindManyArgs, 'request'>
    >;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['PublicMenu']>,
        ParentType,
        ContextType,
        RequireFields<GQLPublicMenuQueryFindOneArgs, 'menuId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicPrivacyPolicyUpdateResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PublicPrivacyPolicyUpdate'] = GQLResolversParentTypes['PublicPrivacyPolicyUpdate'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    englishText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    germanText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    privacyPolicyUpdateId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicPrivacyPolicyUpdateQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PublicPrivacyPolicyUpdateQuery'] = GQLResolversParentTypes['PublicPrivacyPolicyUpdateQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['PublicPrivacyPolicyUpdate']>, ParentType, ContextType>;
    findLatest?: Resolver<Maybe<GQLResolversTypes['PublicPrivacyPolicyUpdate']>, ParentType, ContextType>;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['PublicPrivacyPolicyUpdate']>,
        ParentType,
        ContextType,
        RequireFields<GQLPublicPrivacyPolicyUpdateQueryFindOneArgs, 'privacyPolicyUpdateId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicTermsUpdateResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PublicTermsUpdate'] = GQLResolversParentTypes['PublicTermsUpdate'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    englishText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    germanText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    termsUpdateId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicTermsUpdateQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PublicTermsUpdateQuery'] = GQLResolversParentTypes['PublicTermsUpdateQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['PublicTermsUpdate']>, ParentType, ContextType>;
    findLatest?: Resolver<Maybe<GQLResolversTypes['PublicTermsUpdate']>, ParentType, ContextType>;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['PublicTermsUpdate']>,
        ParentType,
        ContextType,
        RequireFields<GQLPublicTermsUpdateQueryFindOneArgs, 'termsUpdateId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicUserResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PublicUser'] = GQLResolversParentTypes['PublicUser'],
> = {
    firstName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    profilePictureUrl?: Resolver<Maybe<GQLResolversTypes['Url']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = {
    admins?: Resolver<GQLResolversTypes['AdminQuery'], ParentType, ContextType>;
    allergies?: Resolver<GQLResolversTypes['AllergyQuery'], ParentType, ContextType>;
    bookingRequests?: Resolver<GQLResolversTypes['BookingRequestQuery'], ParentType, ContextType>;
    categories?: Resolver<GQLResolversTypes['CategoryQuery'], ParentType, ContextType>;
    cookSpecificFees?: Resolver<GQLResolversTypes['CookSpecificFeeQuery'], ParentType, ContextType>;
    cooks?: Resolver<GQLResolversTypes['CookQuery'], ParentType, ContextType>;
    couponCodes?: Resolver<GQLResolversTypes['CouponCodeQuery'], ParentType, ContextType>;
    customerFeeUpdates?: Resolver<GQLResolversTypes['CustomerFeeUpdateQuery'], ParentType, ContextType>;
    giftCards?: Resolver<GQLResolversTypes['GiftCardQuery'], ParentType, ContextType>;
    globalBookingRequests?: Resolver<GQLResolversTypes['GlobalBookingRequestQuery'], ParentType, ContextType>;
    kitchens?: Resolver<GQLResolversTypes['KitchenQuery'], ParentType, ContextType>;
    languages?: Resolver<GQLResolversTypes['LanguageQuery'], ParentType, ContextType>;
    privacyPolicyUpdates?: Resolver<GQLResolversTypes['PrivacyPolicyUpdateQuery'], ParentType, ContextType>;
    publicCooks?: Resolver<GQLResolversTypes['PublicCookQuery'], ParentType, ContextType>;
    publicMenus?: Resolver<GQLResolversTypes['PublicMenuQuery'], ParentType, ContextType>;
    publicPrivacyPolicyUpdates?: Resolver<GQLResolversTypes['PublicPrivacyPolicyUpdateQuery'], ParentType, ContextType>;
    publicTermsUpdates?: Resolver<GQLResolversTypes['PublicTermsUpdateQuery'], ParentType, ContextType>;
    searchRequests?: Resolver<GQLResolversTypes['SearchRequestQuery'], ParentType, ContextType>;
    sessions?: Resolver<GQLResolversTypes['SessionQuery'], ParentType, ContextType>;
    stripePublishableKey?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    supportRequests?: Resolver<GQLResolversTypes['SupportRequestQuery'], ParentType, ContextType>;
    termsUpdates?: Resolver<GQLResolversTypes['TermsUpdateQuery'], ParentType, ContextType>;
    users?: Resolver<GQLResolversTypes['UserQuery'], ParentType, ContextType>;
};

export type GQLSearchRequestResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['SearchRequest'] = GQLResolversParentTypes['SearchRequest'],
> = {
    adults?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    children?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    date?: Resolver<GQLResolversTypes['Date'], ParentType, ContextType>;
    locationText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    origin?: Resolver<GQLResolversTypes['SearchRequestOrigin'], ParentType, ContextType>;
    searchRequestId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSearchRequestMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['SearchRequestMutation'] = GQLResolversParentTypes['SearchRequestMutation'],
> = {
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLSearchRequestMutationCreateOneArgs, 'request'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSearchRequestQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['SearchRequestQuery'] = GQLResolversParentTypes['SearchRequestQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['SearchRequest']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSessionResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Session'] = GQLResolversParentTypes['Session'],
> = {
    cookieSettings?: Resolver<Maybe<GQLResolversTypes['SessionCookieSettings']>, ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    expired?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    lastExtendedAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    platform?: Resolver<GQLResolversTypes['Platform'], ParentType, ContextType>;
    sessionId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    userId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSessionCookieSettingsResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['SessionCookieSettings'] = GQLResolversParentTypes['SessionCookieSettings'],
> = {
    googleAnalytics?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
    sessionCookie?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSessionMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['SessionMutation'] = GQLResolversParentTypes['SessionMutation'],
> = {
    assignOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLSessionMutationAssignOneArgs, 'userId'>>;
    assignOneByEmailAddress?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLSessionMutationAssignOneByEmailAddressArgs, 'request'>
    >;
    assignOneByIdentityProvider?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLSessionMutationAssignOneByIdentityProviderArgs, 'request'>
    >;
    assignOneByPhoneNumber?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLSessionMutationAssignOneByPhoneNumberArgs, 'request'>
    >;
    updateCookieSettings?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLSessionMutationUpdateCookieSettingsArgs, 'request'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSessionQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['SessionQuery'] = GQLResolversParentTypes['SessionQuery'],
> = {
    current?: Resolver<Maybe<GQLResolversTypes['Session']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSubscriptionResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Subscription'] = GQLResolversParentTypes['Subscription'],
> = {
    bookingRequestChatMessageCreations?: SubscriptionResolver<
        GQLResolversTypes['ChatMessage'],
        'bookingRequestChatMessageCreations',
        ParentType,
        ContextType,
        RequireFields<GQLSubscriptionBookingRequestChatMessageCreationsArgs, 'bookingRequestId'>
    >;
};

export type GQLSupportRequestResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['SupportRequest'] = GQLResolversParentTypes['SupportRequest'],
> = {
    bookingRequestId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    message?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    subject?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    supportRequestId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['PublicUser'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSupportRequestQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['SupportRequestQuery'] = GQLResolversParentTypes['SupportRequestQuery'],
> = {
    findMany?: Resolver<
        Maybe<Array<GQLResolversTypes['SupportRequest']>>,
        ParentType,
        ContextType,
        Partial<GQLSupportRequestQueryFindManyArgs>
    >;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['SupportRequest']>,
        ParentType,
        ContextType,
        RequireFields<GQLSupportRequestQueryFindOneArgs, 'supportRequestId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTermsUpdateResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['TermsUpdate'] = GQLResolversParentTypes['TermsUpdate'],
> = {
    admin?: Resolver<GQLResolversTypes['Admin'], ParentType, ContextType>;
    adminId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    englishText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    germanText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    termsUpdateId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTermsUpdateMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['TermsUpdateMutation'] = GQLResolversParentTypes['TermsUpdateMutation'],
> = {
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLTermsUpdateMutationCreateOneArgs, 'request'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTermsUpdateQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['TermsUpdateQuery'] = GQLResolversParentTypes['TermsUpdateQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['TermsUpdate']>, ParentType, ContextType>;
    findLatest?: Resolver<Maybe<GQLResolversTypes['TermsUpdate']>, ParentType, ContextType>;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['TermsUpdate']>,
        ParentType,
        ContextType,
        RequireFields<GQLTermsUpdateQueryFindOneArgs, 'termsUpdateId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLUIntScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['UInt'], any> {
    name: 'UInt';
}

export interface GQLUuidScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['UUID'], any> {
    name: 'UUID';
}

export interface GQLUploadScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['Upload'], any> {
    name: 'Upload';
}

export interface GQLUrlScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['Url'], any> {
    name: 'Url';
}

export type GQLUserResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['User'] = GQLResolversParentTypes['User']> = {
    acceptedPrivacyPolicy?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    acceptedTerms?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    activeSessionCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    activeSessions?: Resolver<Array<GQLResolversTypes['Session']>, ParentType, ContextType>;
    addressCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    addresses?: Resolver<Array<GQLResolversTypes['Address']>, ParentType, ContextType>;
    admin?: Resolver<Maybe<GQLResolversTypes['Admin']>, ParentType, ContextType>;
    birthDate?: Resolver<Maybe<GQLResolversTypes['Date']>, ParentType, ContextType>;
    bookingRequests?: Resolver<Array<GQLResolversTypes['BookingRequest']>, ParentType, ContextType>;
    cook?: Resolver<Maybe<GQLResolversTypes['Cook']>, ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    emailAddress?: Resolver<Maybe<GQLResolversTypes['EmailAddress']>, ParentType, ContextType>;
    emailAddressUpdate?: Resolver<Maybe<GQLResolversTypes['EmailAddressUpdate']>, ParentType, ContextType>;
    firstName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    followingCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    followings?: Resolver<Array<GQLResolversTypes['Following']>, ParentType, ContextType>;
    gender?: Resolver<GQLResolversTypes['Gender'], ParentType, ContextType>;
    isAdmin?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    isCook?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    isLocked?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    language?: Resolver<GQLResolversTypes['UserLanguage'], ParentType, ContextType>;
    lastName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    notificationConfiguration?: Resolver<GQLResolversTypes['NotificationConfiguration'], ParentType, ContextType>;
    notifications?: Resolver<Array<GQLResolversTypes['Notification']>, ParentType, ContextType>;
    oneTimeAccessToken?: Resolver<Maybe<GQLResolversTypes['OneTimeAccessToken']>, ParentType, ContextType>;
    phoneNumber?: Resolver<Maybe<GQLResolversTypes['PhoneNumber']>, ParentType, ContextType>;
    phoneNumberUpdate?: Resolver<Maybe<GQLResolversTypes['PhoneNumberUpdate']>, ParentType, ContextType>;
    profilePictureUrl?: Resolver<Maybe<GQLResolversTypes['Url']>, ParentType, ContextType>;
    unreadNotificationCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserAddressMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserAddressMutation'] = GQLResolversParentTypes['UserAddressMutation'],
> = {
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserAddressMutationCreateOneArgs, 'address'>
    >;
    deleteOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserAddressMutationDeleteOneArgs, 'addressId'>
    >;
    update?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserAddressMutationUpdateArgs, 'address' | 'addressId'>
    >;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserAddressQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserAddressQuery'] = GQLResolversParentTypes['UserAddressQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Address']>>, ParentType, ContextType, Partial<GQLUserAddressQueryFindManyArgs>>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserBookingRequestChatMessageMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserBookingRequestChatMessageMutation'] = GQLResolversParentTypes['UserBookingRequestChatMessageMutation'],
> = {
    bookingRequestId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserBookingRequestChatMessageMutationCreateOneArgs, 'request'>
    >;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserBookingRequestChatMessageQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserBookingRequestChatMessageQuery'] = GQLResolversParentTypes['UserBookingRequestChatMessageQuery'],
> = {
    bookingRequestId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    findMany?: Resolver<
        Maybe<Array<GQLResolversTypes['ChatMessage']>>,
        ParentType,
        ContextType,
        Partial<GQLUserBookingRequestChatMessageQueryFindManyArgs>
    >;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserBookingRequestMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserBookingRequestMutation'] = GQLResolversParentTypes['UserBookingRequestMutation'],
> = {
    accept?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserBookingRequestMutationAcceptArgs, 'bookingRequestId'>
    >;
    chatMessages?: Resolver<
        GQLResolversTypes['UserBookingRequestChatMessageMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserBookingRequestMutationChatMessagesArgs, 'bookingRequestId'>
    >;
    confirmPaymentSetup?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserBookingRequestMutationConfirmPaymentSetupArgs, 'bookingRequestId'>
    >;
    createOne?: Resolver<
        GQLResolversTypes['UserCreateOneBookingRequestResponse'],
        ParentType,
        ContextType,
        RequireFields<GQLUserBookingRequestMutationCreateOneArgs, 'request'>
    >;
    decline?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserBookingRequestMutationDeclineArgs, 'bookingRequestId'>
    >;
    updatePrice?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserBookingRequestMutationUpdatePriceArgs, 'bookingRequestId' | 'price'>
    >;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserBookingRequestQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserBookingRequestQuery'] = GQLResolversParentTypes['UserBookingRequestQuery'],
> = {
    chatMessages?: Resolver<
        GQLResolversTypes['UserBookingRequestChatMessageQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserBookingRequestQueryChatMessagesArgs, 'bookingRequestId'>
    >;
    findMany?: Resolver<
        Maybe<Array<GQLResolversTypes['BookingRequest']>>,
        ParentType,
        ContextType,
        Partial<GQLUserBookingRequestQueryFindManyArgs>
    >;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['BookingRequest']>,
        ParentType,
        ContextType,
        RequireFields<GQLUserBookingRequestQueryFindOneArgs, 'bookingRequestId'>
    >;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserCookRatingQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserCookRatingQuery'] = GQLResolversParentTypes['UserCookRatingQuery'],
> = {
    findMany?: Resolver<Array<GQLResolversTypes['CookRating']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserCookVisitQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserCookVisitQuery'] = GQLResolversParentTypes['UserCookVisitQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Address']>>, ParentType, ContextType, Partial<GQLUserCookVisitQueryFindManyArgs>>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserCreateOneBookingRequestResponseResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserCreateOneBookingRequestResponse'] = GQLResolversParentTypes['UserCreateOneBookingRequestResponse'],
> = {
    bookingRequestId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    clientSecret?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    success?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserEmailAddressUpdateMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserEmailAddressUpdateMutation'] = GQLResolversParentTypes['UserEmailAddressUpdateMutation'],
> = {
    confirm?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserEmailAddressUpdateMutationConfirmArgs, 'secret'>
    >;
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserEmailAddressUpdateMutationCreateOneArgs, 'emailAddress'>
    >;
    deleteOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserEmailAddressUpdateQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserEmailAddressUpdateQuery'] = GQLResolversParentTypes['UserEmailAddressUpdateQuery'],
> = {
    findOne?: Resolver<Maybe<GQLResolversTypes['EmailAddressUpdate']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserFollowingMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserFollowingMutation'] = GQLResolversParentTypes['UserFollowingMutation'],
> = {
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserFollowingMutationCreateOneArgs, 'cookId'>
    >;
    deleteOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserFollowingMutationDeleteOneArgs, 'cookId'>
    >;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserFollowingQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserFollowingQuery'] = GQLResolversParentTypes['UserFollowingQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['Following']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserGlobalBookingRequestMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserGlobalBookingRequestMutation'] = GQLResolversParentTypes['UserGlobalBookingRequestMutation'],
> = {
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserGlobalBookingRequestMutationCreateOneArgs, 'request'>
    >;
    expireOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserGlobalBookingRequestMutationExpireOneArgs, 'globalBookingRequestId'>
    >;
    updateDateTime?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserGlobalBookingRequestMutationUpdateDateTimeArgs, 'dateTime' | 'globalBookingRequestId'>
    >;
    updateMessage?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserGlobalBookingRequestMutationUpdateMessageArgs, 'globalBookingRequestId' | 'message'>
    >;
    updateOccasion?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserGlobalBookingRequestMutationUpdateOccasionArgs, 'globalBookingRequestId' | 'occasion'>
    >;
    updatePriceClass?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserGlobalBookingRequestMutationUpdatePriceClassArgs, 'globalBookingRequestId' | 'priceClassType'>
    >;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserGlobalBookingRequestQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserGlobalBookingRequestQuery'] = GQLResolversParentTypes['UserGlobalBookingRequestQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['GlobalBookingRequest']>>, ParentType, ContextType>;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['GlobalBookingRequest']>,
        ParentType,
        ContextType,
        RequireFields<GQLUserGlobalBookingRequestQueryFindOneArgs, 'globalBookingRequestId'>
    >;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserMenuVisitQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserMenuVisitQuery'] = GQLResolversParentTypes['UserMenuVisitQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Address']>>, ParentType, ContextType, Partial<GQLUserMenuVisitQueryFindManyArgs>>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserMutation'] = GQLResolversParentTypes['UserMutation'],
> = {
    acceptLatestPrivacyPolicy?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    acceptLatestTerms?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    addresses?: Resolver<
        GQLResolversTypes['UserAddressMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationAddressesArgs, 'userId'>
    >;
    bookingRequests?: Resolver<
        GQLResolversTypes['UserBookingRequestMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationBookingRequestsArgs, 'userId'>
    >;
    createOneByEmailAddress?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationCreateOneByEmailAddressArgs, 'request'>
    >;
    createOneByIdentityProvider?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationCreateOneByIdentityProviderArgs, 'request'>
    >;
    createOneByPhoneNumber?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationCreateOneByPhoneNumberArgs, 'request'>
    >;
    emailAddressUpdate?: Resolver<
        GQLResolversTypes['UserEmailAddressUpdateMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationEmailAddressUpdateArgs, 'userId'>
    >;
    followings?: Resolver<
        GQLResolversTypes['UserFollowingMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationFollowingsArgs, 'userId'>
    >;
    globalBookingRequests?: Resolver<
        GQLResolversTypes['UserGlobalBookingRequestMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationGlobalBookingRequestsArgs, 'userId'>
    >;
    notificationConfiguration?: Resolver<
        GQLResolversTypes['NotificationConfigurationMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationNotificationConfigurationArgs, 'userId'>
    >;
    notifications?: Resolver<
        GQLResolversTypes['UserNotificationMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationNotificationsArgs, 'userId'>
    >;
    oneTimeAccessToken?: Resolver<
        GQLResolversTypes['UserOneTimeAccessTokenMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationOneTimeAccessTokenArgs, 'userId'>
    >;
    phoneNumberUpdate?: Resolver<
        GQLResolversTypes['UserPhoneNumberUpdateMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationPhoneNumberUpdateArgs, 'userId'>
    >;
    sessions?: Resolver<
        GQLResolversTypes['UserSessionMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationSessionsArgs, 'userId'>
    >;
    supportRequests?: Resolver<
        GQLResolversTypes['UserSupportRequestMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationSupportRequestsArgs, 'userId'>
    >;
    updateGender?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationUpdateGenderArgs, 'gender' | 'userId'>
    >;
    updateIsLocked?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationUpdateIsLockedArgs, 'isLocked' | 'userId'>
    >;
    updatePassword?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationUpdatePasswordArgs, 'password' | 'userId'>
    >;
    updateProfilePicture?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationUpdateProfilePictureArgs, 'userId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserNotificationMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserNotificationMutation'] = GQLResolversParentTypes['UserNotificationMutation'],
> = {
    deleteAll?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    deleteOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserNotificationMutationDeleteOneArgs, 'notificationId'>
    >;
    updateAllWasRead?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserNotificationMutationUpdateAllWasReadArgs, 'wasRead'>
    >;
    updateOneWasRead?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserNotificationMutationUpdateOneWasReadArgs, 'notificationId' | 'wasRead'>
    >;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserOneTimeAccessTokenMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserOneTimeAccessTokenMutation'] = GQLResolversParentTypes['UserOneTimeAccessTokenMutation'],
> = {
    confirm?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserOneTimeAccessTokenMutationConfirmArgs, 'secret'>
    >;
    createOneForEmailAddress?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserOneTimeAccessTokenMutationCreateOneForEmailAddressArgs, 'emailAddress'>
    >;
    createOneForPhoneNumber?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserOneTimeAccessTokenMutationCreateOneForPhoneNumberArgs, 'phoneNumber'>
    >;
    deleteOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserOneTimeAccessTokenQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserOneTimeAccessTokenQuery'] = GQLResolversParentTypes['UserOneTimeAccessTokenQuery'],
> = {
    findOne?: Resolver<Maybe<GQLResolversTypes['OneTimeAccessToken']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserPhoneNumberUpdateMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserPhoneNumberUpdateMutation'] = GQLResolversParentTypes['UserPhoneNumberUpdateMutation'],
> = {
    confirm?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserPhoneNumberUpdateMutationConfirmArgs, 'secret'>
    >;
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserPhoneNumberUpdateMutationCreateOneArgs, 'phoneNumber'>
    >;
    deleteOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserPhoneNumberUpdateQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserPhoneNumberUpdateQuery'] = GQLResolversParentTypes['UserPhoneNumberUpdateQuery'],
> = {
    findOne?: Resolver<Maybe<GQLResolversTypes['PhoneNumberUpdate']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserQuery'] = GQLResolversParentTypes['UserQuery'],
> = {
    addresses?: Resolver<
        GQLResolversTypes['UserAddressQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryAddressesArgs, 'userId'>
    >;
    bookingRequests?: Resolver<
        GQLResolversTypes['UserBookingRequestQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryBookingRequestsArgs, 'userId'>
    >;
    cookRatings?: Resolver<
        GQLResolversTypes['UserCookRatingQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryCookRatingsArgs, 'userId'>
    >;
    cookVisits?: Resolver<
        GQLResolversTypes['UserAddressQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryCookVisitsArgs, 'userId'>
    >;
    emailAddressUpdate?: Resolver<
        GQLResolversTypes['UserEmailAddressUpdateQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryEmailAddressUpdateArgs, 'userId'>
    >;
    findMany?: Resolver<
        Maybe<Array<GQLResolversTypes['User']>>,
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryFindManyArgs, 'request'>
    >;
    findOne?: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType, RequireFields<GQLUserQueryFindOneArgs, 'userId'>>;
    followings?: Resolver<
        GQLResolversTypes['UserFollowingQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryFollowingsArgs, 'userId'>
    >;
    globalBookingRequests?: Resolver<
        GQLResolversTypes['UserGlobalBookingRequestQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryGlobalBookingRequestsArgs, 'userId'>
    >;
    me?: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType>;
    menuVisits?: Resolver<
        GQLResolversTypes['UserAddressQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryMenuVisitsArgs, 'userId'>
    >;
    notificationConfiguration?: Resolver<
        Maybe<GQLResolversTypes['NotificationConfigurationQuery']>,
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryNotificationConfigurationArgs, 'userId'>
    >;
    notifications?: Resolver<
        GQLResolversTypes['NotificationQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryNotificationsArgs, 'userId'>
    >;
    oneTimeAccessToken?: Resolver<
        GQLResolversTypes['UserOneTimeAccessTokenQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryOneTimeAccessTokenArgs, 'userId'>
    >;
    phoneNumberUpdate?: Resolver<
        GQLResolversTypes['UserPhoneNumberUpdateQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryPhoneNumberUpdateArgs, 'userId'>
    >;
    sessions?: Resolver<GQLResolversTypes['UserSessionQuery'], ParentType, ContextType, RequireFields<GQLUserQuerySessionsArgs, 'userId'>>;
    userRatings?: Resolver<
        GQLResolversTypes['UserUserRatingQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryUserRatingsArgs, 'userId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserRatingResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserRating'] = GQLResolversParentTypes['UserRating'],
> = {
    bookingRequest?: Resolver<GQLResolversTypes['BookingRequest'], ParentType, ContextType>;
    bookingRequestId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    comment?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    cook?: Resolver<GQLResolversTypes['PublicCook'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['PublicUser'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    value?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserSessionMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserSessionMutation'] = GQLResolversParentTypes['UserSessionMutation'],
> = {
    expireCurrent?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    expireMany?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserSessionMutationExpireManyArgs, 'request'>
    >;
    expireOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserSessionMutationExpireOneArgs, 'request'>
    >;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserSessionQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserSessionQuery'] = GQLResolversParentTypes['UserSessionQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Session']>>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserSupportRequestMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserSupportRequestMutation'] = GQLResolversParentTypes['UserSupportRequestMutation'],
> = {
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserSupportRequestMutationCreateOneArgs, 'request'>
    >;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserUserRatingQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserUserRatingQuery'] = GQLResolversParentTypes['UserUserRatingQuery'],
> = {
    findMany?: Resolver<Array<GQLResolversTypes['UserRating']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLResolvers<ContextType = any> = {
    Address?: GQLAddressResolvers<ContextType>;
    Admin?: GQLAdminResolvers<ContextType>;
    AdminGiftCardPromoCodeMutation?: GQLAdminGiftCardPromoCodeMutationResolvers<ContextType>;
    AdminGiftCardPromoCodeQuery?: GQLAdminGiftCardPromoCodeQueryResolvers<ContextType>;
    AdminMutation?: GQLAdminMutationResolvers<ContextType>;
    AdminQuery?: GQLAdminQueryResolvers<ContextType>;
    Allergy?: GQLAllergyResolvers<ContextType>;
    AllergyMutation?: GQLAllergyMutationResolvers<ContextType>;
    AllergyQuery?: GQLAllergyQueryResolvers<ContextType>;
    AnonymousSession?: GQLAnonymousSessionResolvers<ContextType>;
    AnonymousUser?: GQLAnonymousUserResolvers<ContextType>;
    BookingRequest?: GQLBookingRequestResolvers<ContextType>;
    BookingRequestQuery?: GQLBookingRequestQueryResolvers<ContextType>;
    Category?: GQLCategoryResolvers<ContextType>;
    CategoryMutation?: GQLCategoryMutationResolvers<ContextType>;
    CategoryQuery?: GQLCategoryQueryResolvers<ContextType>;
    ChatMessage?: GQLChatMessageResolvers<ContextType>;
    ConfiguredMenu?: GQLConfiguredMenuResolvers<ContextType>;
    ConfiguredMenuCourse?: GQLConfiguredMenuCourseResolvers<ContextType>;
    Cook?: GQLCookResolvers<ContextType>;
    CookBookingRequestChatMessageMutation?: GQLCookBookingRequestChatMessageMutationResolvers<ContextType>;
    CookBookingRequestChatMessageQuery?: GQLCookBookingRequestChatMessageQueryResolvers<ContextType>;
    CookBookingRequestMutation?: GQLCookBookingRequestMutationResolvers<ContextType>;
    CookBookingRequestQuery?: GQLCookBookingRequestQueryResolvers<ContextType>;
    CookCookRatingQuery?: GQLCookCookRatingQueryResolvers<ContextType>;
    CookCookVisitQuery?: GQLCookCookVisitQueryResolvers<ContextType>;
    CookFollowingQuery?: GQLCookFollowingQueryResolvers<ContextType>;
    CookGlobalBookingRequestQuery?: GQLCookGlobalBookingRequestQueryResolvers<ContextType>;
    CookMealMutation?: GQLCookMealMutationResolvers<ContextType>;
    CookMealQuery?: GQLCookMealQueryResolvers<ContextType>;
    CookMenuCourseMealOptionMutation?: GQLCookMenuCourseMealOptionMutationResolvers<ContextType>;
    CookMenuCourseMealOptionQuery?: GQLCookMenuCourseMealOptionQueryResolvers<ContextType>;
    CookMenuCourseMutation?: GQLCookMenuCourseMutationResolvers<ContextType>;
    CookMenuCourseQuery?: GQLCookMenuCourseQueryResolvers<ContextType>;
    CookMenuMutation?: GQLCookMenuMutationResolvers<ContextType>;
    CookMenuQuery?: GQLCookMenuQueryResolvers<ContextType>;
    CookMenuVisitQuery?: GQLCookMenuVisitQueryResolvers<ContextType>;
    CookMutation?: GQLCookMutationResolvers<ContextType>;
    CookQuery?: GQLCookQueryResolvers<ContextType>;
    CookRating?: GQLCookRatingResolvers<ContextType>;
    CookSpecificFee?: GQLCookSpecificFeeResolvers<ContextType>;
    CookSpecificFeeMutation?: GQLCookSpecificFeeMutationResolvers<ContextType>;
    CookSpecificFeeQuery?: GQLCookSpecificFeeQueryResolvers<ContextType>;
    CookUserRatingQuery?: GQLCookUserRatingQueryResolvers<ContextType>;
    CookVisit?: GQLCookVisitResolvers<ContextType>;
    CookVisitMutation?: GQLCookVisitMutationResolvers<ContextType>;
    CookVisitStatistics?: GQLCookVisitStatisticsResolvers<ContextType>;
    CouponCode?: GQLCouponCodeResolvers<ContextType>;
    CouponCodeQuery?: GQLCouponCodeQueryResolvers<ContextType>;
    Course?: GQLCourseResolvers<ContextType>;
    CreateOneGiftCardFailedResponse?: GQLCreateOneGiftCardFailedResponseResolvers<ContextType>;
    CreateOneGiftCardResponse?: GQLCreateOneGiftCardResponseResolvers<ContextType>;
    CreateOneGiftCardSuccessResponse?: GQLCreateOneGiftCardSuccessResponseResolvers<ContextType>;
    CustomerFeeUpdate?: GQLCustomerFeeUpdateResolvers<ContextType>;
    CustomerFeeUpdateMutation?: GQLCustomerFeeUpdateMutationResolvers<ContextType>;
    CustomerFeeUpdateQuery?: GQLCustomerFeeUpdateQueryResolvers<ContextType>;
    Date?: GraphQLScalarType;
    DateTime?: GraphQLScalarType;
    DeleteMealErrorResult?: GQLDeleteMealErrorResultResolvers<ContextType>;
    DeleteMealRequiredForMenuResult?: GQLDeleteMealRequiredForMenuResultResolvers<ContextType>;
    DeleteMealResult?: GQLDeleteMealResultResolvers<ContextType>;
    DeleteMealSuccessResult?: GQLDeleteMealSuccessResultResolvers<ContextType>;
    EmailAddress?: GraphQLScalarType;
    EmailAddressUpdate?: GQLEmailAddressUpdateResolvers<ContextType>;
    Following?: GQLFollowingResolvers<ContextType>;
    GiftCard?: GQLGiftCardResolvers<ContextType>;
    GiftCardMutation?: GQLGiftCardMutationResolvers<ContextType>;
    GiftCardPromoCode?: GQLGiftCardPromoCodeResolvers<ContextType>;
    GiftCardQuery?: GQLGiftCardQueryResolvers<ContextType>;
    GlobalBookingRequest?: GQLGlobalBookingRequestResolvers<ContextType>;
    GlobalBookingRequestPriceClass?: GQLGlobalBookingRequestPriceClassResolvers<ContextType>;
    GlobalBookingRequestQuery?: GQLGlobalBookingRequestQueryResolvers<ContextType>;
    Kitchen?: GQLKitchenResolvers<ContextType>;
    KitchenMutation?: GQLKitchenMutationResolvers<ContextType>;
    KitchenQuery?: GQLKitchenQueryResolvers<ContextType>;
    Language?: GQLLanguageResolvers<ContextType>;
    LanguageMutation?: GQLLanguageMutationResolvers<ContextType>;
    LanguageQuery?: GQLLanguageQueryResolvers<ContextType>;
    Latitude?: GraphQLScalarType;
    Location?: GQLLocationResolvers<ContextType>;
    Longitude?: GraphQLScalarType;
    Meal?: GQLMealResolvers<ContextType>;
    MealOption?: GQLMealOptionResolvers<ContextType>;
    Menu?: GQLMenuResolvers<ContextType>;
    MenuConfiguration?: GQLMenuConfigurationResolvers<ContextType>;
    MenuConfigurationCourse?: GQLMenuConfigurationCourseResolvers<ContextType>;
    MenuVisit?: GQLMenuVisitResolvers<ContextType>;
    MenuVisitMutation?: GQLMenuVisitMutationResolvers<ContextType>;
    MenuVisitStatistics?: GQLMenuVisitStatisticsResolvers<ContextType>;
    Mutation?: GQLMutationResolvers<ContextType>;
    NewsletterSubscriptionMutation?: GQLNewsletterSubscriptionMutationResolvers<ContextType>;
    Notification?: GQLNotificationResolvers<ContextType>;
    NotificationConfiguration?: GQLNotificationConfigurationResolvers<ContextType>;
    NotificationConfigurationMutation?: GQLNotificationConfigurationMutationResolvers<ContextType>;
    NotificationConfigurationQuery?: GQLNotificationConfigurationQueryResolvers<ContextType>;
    NotificationMutation?: GQLNotificationMutationResolvers<ContextType>;
    NotificationQuery?: GQLNotificationQueryResolvers<ContextType>;
    OneTimeAccessToken?: GQLOneTimeAccessTokenResolvers<ContextType>;
    PhoneNumber?: GraphQLScalarType;
    PhoneNumberUpdate?: GQLPhoneNumberUpdateResolvers<ContextType>;
    Price?: GQLPriceResolvers<ContextType>;
    PrivacyPolicyUpdate?: GQLPrivacyPolicyUpdateResolvers<ContextType>;
    PrivacyPolicyUpdateMutation?: GQLPrivacyPolicyUpdateMutationResolvers<ContextType>;
    PrivacyPolicyUpdateQuery?: GQLPrivacyPolicyUpdateQueryResolvers<ContextType>;
    PublicCook?: GQLPublicCookResolvers<ContextType>;
    PublicCookQuery?: GQLPublicCookQueryResolvers<ContextType>;
    PublicMenu?: GQLPublicMenuResolvers<ContextType>;
    PublicMenuQuery?: GQLPublicMenuQueryResolvers<ContextType>;
    PublicPrivacyPolicyUpdate?: GQLPublicPrivacyPolicyUpdateResolvers<ContextType>;
    PublicPrivacyPolicyUpdateQuery?: GQLPublicPrivacyPolicyUpdateQueryResolvers<ContextType>;
    PublicTermsUpdate?: GQLPublicTermsUpdateResolvers<ContextType>;
    PublicTermsUpdateQuery?: GQLPublicTermsUpdateQueryResolvers<ContextType>;
    PublicUser?: GQLPublicUserResolvers<ContextType>;
    Query?: GQLQueryResolvers<ContextType>;
    SearchRequest?: GQLSearchRequestResolvers<ContextType>;
    SearchRequestMutation?: GQLSearchRequestMutationResolvers<ContextType>;
    SearchRequestQuery?: GQLSearchRequestQueryResolvers<ContextType>;
    Session?: GQLSessionResolvers<ContextType>;
    SessionCookieSettings?: GQLSessionCookieSettingsResolvers<ContextType>;
    SessionMutation?: GQLSessionMutationResolvers<ContextType>;
    SessionQuery?: GQLSessionQueryResolvers<ContextType>;
    Subscription?: GQLSubscriptionResolvers<ContextType>;
    SupportRequest?: GQLSupportRequestResolvers<ContextType>;
    SupportRequestQuery?: GQLSupportRequestQueryResolvers<ContextType>;
    TermsUpdate?: GQLTermsUpdateResolvers<ContextType>;
    TermsUpdateMutation?: GQLTermsUpdateMutationResolvers<ContextType>;
    TermsUpdateQuery?: GQLTermsUpdateQueryResolvers<ContextType>;
    UInt?: GraphQLScalarType;
    UUID?: GraphQLScalarType;
    Upload?: GraphQLScalarType;
    Url?: GraphQLScalarType;
    User?: GQLUserResolvers<ContextType>;
    UserAddressMutation?: GQLUserAddressMutationResolvers<ContextType>;
    UserAddressQuery?: GQLUserAddressQueryResolvers<ContextType>;
    UserBookingRequestChatMessageMutation?: GQLUserBookingRequestChatMessageMutationResolvers<ContextType>;
    UserBookingRequestChatMessageQuery?: GQLUserBookingRequestChatMessageQueryResolvers<ContextType>;
    UserBookingRequestMutation?: GQLUserBookingRequestMutationResolvers<ContextType>;
    UserBookingRequestQuery?: GQLUserBookingRequestQueryResolvers<ContextType>;
    UserCookRatingQuery?: GQLUserCookRatingQueryResolvers<ContextType>;
    UserCookVisitQuery?: GQLUserCookVisitQueryResolvers<ContextType>;
    UserCreateOneBookingRequestResponse?: GQLUserCreateOneBookingRequestResponseResolvers<ContextType>;
    UserEmailAddressUpdateMutation?: GQLUserEmailAddressUpdateMutationResolvers<ContextType>;
    UserEmailAddressUpdateQuery?: GQLUserEmailAddressUpdateQueryResolvers<ContextType>;
    UserFollowingMutation?: GQLUserFollowingMutationResolvers<ContextType>;
    UserFollowingQuery?: GQLUserFollowingQueryResolvers<ContextType>;
    UserGlobalBookingRequestMutation?: GQLUserGlobalBookingRequestMutationResolvers<ContextType>;
    UserGlobalBookingRequestQuery?: GQLUserGlobalBookingRequestQueryResolvers<ContextType>;
    UserMenuVisitQuery?: GQLUserMenuVisitQueryResolvers<ContextType>;
    UserMutation?: GQLUserMutationResolvers<ContextType>;
    UserNotificationMutation?: GQLUserNotificationMutationResolvers<ContextType>;
    UserOneTimeAccessTokenMutation?: GQLUserOneTimeAccessTokenMutationResolvers<ContextType>;
    UserOneTimeAccessTokenQuery?: GQLUserOneTimeAccessTokenQueryResolvers<ContextType>;
    UserPhoneNumberUpdateMutation?: GQLUserPhoneNumberUpdateMutationResolvers<ContextType>;
    UserPhoneNumberUpdateQuery?: GQLUserPhoneNumberUpdateQueryResolvers<ContextType>;
    UserQuery?: GQLUserQueryResolvers<ContextType>;
    UserRating?: GQLUserRatingResolvers<ContextType>;
    UserSessionMutation?: GQLUserSessionMutationResolvers<ContextType>;
    UserSessionQuery?: GQLUserSessionQueryResolvers<ContextType>;
    UserSupportRequestMutation?: GQLUserSupportRequestMutationResolvers<ContextType>;
    UserUserRatingQuery?: GQLUserUserRatingQueryResolvers<ContextType>;
};
