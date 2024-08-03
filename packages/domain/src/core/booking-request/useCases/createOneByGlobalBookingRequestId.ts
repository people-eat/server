import { cookBookingRequestCustomerConfirmation, globalBookingRequestCookConfirmation } from '@people-eat/server-adapter-email-template';
import moment from 'moment';
import { Authorization, type Course, type MealOption, type PublicMenu } from '../../..';
import { type Context } from '../../../authorization';
import { type DBGlobalBookingRequest, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { calculateMenuPrice } from '../../calculateMenuPrice';
import { type ConfiguredMenuCourse, type CreateOneConfiguredMenuRequest } from '../../configured-menu';
import { findAllCourses } from '../../public-menu/useCases/findAllCourses';
import { findOne as findOnePublicMenu } from '../../public-menu/useCases/findOne';
import { type Runtime } from '../../Runtime';
import { type NanoId, type Price } from '../../shared';

interface PriceResult {
    totalAmountUser: number;
    totalAmountCook: number;
    pricePerPerson: number;
}

async function persistMenuBookingRequest(
    runtime: Runtime,
    context: Context,
    bookingRequestId: NanoId,
    configuredMenu: CreateOneConfiguredMenuRequest,
    adultParticipants: number,
    children: number,
    price?: Price,
): Promise<undefined | PriceResult> {
    const travelExpensesAmount: number = 0;
    const { dataSourceAdapter, logger } = runtime;

    const publicMenu: PublicMenu | undefined = await findOnePublicMenu({
        dataSourceAdapter,
        logger,
        context,
        request: { menuId: configuredMenu.menuId },
    });

    const courses: Course[] | undefined = await findAllCourses({
        dataSourceAdapter,
        logger,
        context,
        request: { menuId: configuredMenu.menuId },
    });

    if (!publicMenu || !courses) return undefined;

    const menuPrice: number = calculateMenuPrice(
        adultParticipants,
        children,
        publicMenu.basePrice,
        publicMenu.basePriceCustomers,
        publicMenu.pricePerAdult,
        publicMenu.pricePerChild,
    );

    const totalAmountUser: number = (menuPrice + menuPrice * 0.04 + travelExpensesAmount + 25) / (1 - 0.015);
    const totalAmountCook: number = Math.round(menuPrice * ((100 - 18) / 100)) + travelExpensesAmount;

    if (!price) {
        const success: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
            { bookingRequestId },
            { totalAmountCook, totalAmountUser },
        );

        if (!success) return undefined;
    }

    const configuredMenuCourses: ConfiguredMenuCourse[] = [];

    for (const configuredCourse of configuredMenu.courses) {
        const course: Course | undefined = courses.find((c: Course) => c.courseId === configuredCourse.courseId);
        if (!course) {
            logger.info("Didn't find course");
            return undefined;
        }

        const selectedMeal: MealOption | undefined = course.mealOptions?.find(
            (mealOption: MealOption) => mealOption.mealId === configuredCourse.mealId,
        );

        if (!selectedMeal) {
            logger.info("Didn't find selected meal");
            return undefined;
        }

        configuredMenuCourses.push({
            index: course.index,
            title: course.title,
            mealTitle: selectedMeal.meal?.title ?? '',
            mealDescription: selectedMeal.meal?.description ?? '',
            mealImageUrl: selectedMeal.meal?.imageUrl ?? '',
            mealType: selectedMeal.meal?.type ?? 'SPECIAL',
        });
    }

    configuredMenuCourses.sort(({ index: i1 }: ConfiguredMenuCourse, { index: i2 }: ConfiguredMenuCourse) => i1 - i2);

    const saveConfiguredMenuSuccess: boolean = await dataSourceAdapter.configuredMenuRepository.insertOne({
        bookingRequestId,
        menuId: publicMenu.menuId,
        title: publicMenu.title,
        description: publicMenu.description,
        greetingFromKitchen: publicMenu.greetingFromKitchen,
        kitchenId: publicMenu.kitchen?.kitchenId,
        courses: configuredMenuCourses,
    });

    if (!saveConfiguredMenuSuccess) return undefined;

    return {
        totalAmountUser,
        totalAmountCook,
        pricePerPerson: totalAmountUser / (adultParticipants + children),
    };
}

export interface CreateOneBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { cookId: NanoId; globalBookingRequestId: NanoId; configuredMenu?: CreateOneConfiguredMenuRequest; price?: Price };
}

// eslint-disable-next-line max-statements
export async function createOneByGlobalBookingRequestId({ runtime, context, request }: CreateOneBookingRequestInput): Promise<boolean> {
    const { dataSourceAdapter, emailAdapter, webAppUrl, logger } = runtime;
    const { cookId, globalBookingRequestId, configuredMenu, price } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const globalBookingRequest: DBGlobalBookingRequest | undefined = await dataSourceAdapter.globalBookingRequestRepository.findOne({
        globalBookingRequestId,
    });

    if (!globalBookingRequest) return false;

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: globalBookingRequest.userId });

    if (!user) return false;

    const cookUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cookId });

    if (!cookUser) return false;

    const {
        userId,
        adultParticipants,
        children,
        // priceClassType,
        dateTime,
        duration,
        occasion,
        message,
        kitchenId,
        latitude,
        longitude,
        locationText,
        // expiresAt,
        // createdAt,
    } = globalBookingRequest;

    const bookingRequestId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.insertOne({
        bookingRequestId,
        cookId,
        userId,
        cookAccepted: true,
        userAccepted: true,
        latitude,
        longitude,
        locationText,
        dateTime,
        preparationTime: 120,
        duration,
        adultParticipants,
        children,
        totalAmountUser: price?.amount ?? 0,
        totalAmountCook: price?.amount ?? 0,
        currencyCode: 'EUR',
        fee: 18,
        occasion,
        kitchenId,
        globalBookingRequestId,
        createdAt: new Date(),
        paymentData: {
            provider: 'STRIPE',
            setupIntentId: '',
            clientSecret: '',
            confirmed: false,
            unlocked: false,
        },
    });

    if (!success) return false;

    let priceResult: PriceResult | undefined;

    if (configuredMenu) {
        priceResult = await persistMenuBookingRequest(
            runtime,
            context,
            bookingRequestId,
            configuredMenu,
            adultParticipants,
            children,
            price,
        );
    }

    const messageSuccess: boolean = await dataSourceAdapter.chatMessageRepository.insertMany([
        {
            chatMessageId: createNanoId(),
            bookingRequestId,
            message,
            generated: false,
            createdBy: userId,
            createdAt: new Date(),
        },
        {
            chatMessageId: createNanoId(),
            bookingRequestId,
            message: `Globale Buchungsanfrage wurde mit Koch ${cookUser.firstName} gematcht`,
            generated: true,
            createdBy: userId,
            createdAt: new Date(),
        },
    ]);

    if (!messageSuccess) logger.info('persisting message for booking request failed');

    if (user.emailAddress) {
        const customerEmailSuccess: boolean = await emailAdapter.sendToOne(
            'PeopleEat',
            user.emailAddress,
            `${cookUser.firstName} hat Deine Anfrage akzeptiert`,
            cookBookingRequestCustomerConfirmation({
                webAppUrl,
                customer: {
                    firstName: user.firstName,
                },
                cook: {
                    firstName: cookUser.firstName,
                    profilePictureUrl: cookUser.profilePictureUrl ?? '',
                },
                bookingRequest: {
                    bookingRequestId,
                    occasion,
                    children,
                    adults: adultParticipants,
                    location: locationText,
                    date: dateTime.toDateString(),
                    time: moment(dateTime).format('LT'),
                    price: {
                        perPerson: priceResult?.pricePerPerson ?? 0,
                        total: priceResult?.totalAmountUser ?? 0,
                        currency: 'EUR',
                    },
                },
                chatMessage: message.trim(),
            }),
        );

        if (!customerEmailSuccess) logger.info('sending email failed');
    }

    if (cookUser.emailAddress) {
        const customerEmailSuccess: boolean = await emailAdapter.sendToOne(
            user.firstName,
            cookUser.emailAddress,
            'Du hast eine Buchungsanfrage akzeptiert',
            globalBookingRequestCookConfirmation({
                webAppUrl,
                customer: {
                    firstName: user.firstName,
                },
                globalBookingRequest: {
                    globalBookingRequestId: bookingRequestId,
                    occasion,
                    adults: adultParticipants,
                    children,
                    location: locationText,
                    date: dateTime.toDateString(),
                    time: moment(dateTime).format('LT'),
                    price: {
                        perPerson: priceResult?.pricePerPerson ?? 0,
                        total: priceResult?.totalAmountUser ?? 0,
                        currency: 'EUR',
                    },
                },
                chatMessage: message,
            }),
        );

        if (!customerEmailSuccess) logger.info('sending email failed');
    }

    await dataSourceAdapter.globalBookingRequestRepository.deleteOne({ globalBookingRequestId });

    return true;
}
