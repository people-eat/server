import moment from 'moment';
import { Authorization, type Course, type MealOption, type PublicMenu } from '../../..';
import { type Context } from '../../../authorization';
import { type DBBookingRequest, type DBGiftCardPromoCode, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { calculateMenuPrice } from '../../calculateMenuPrice';
import { type ConfiguredMenuCourse } from '../../configured-menu';
import { findAllCourses } from '../../public-menu/useCases/findAllCourses';
import { findOne as findOnePublicMenu } from '../../public-menu/useCases/findOne';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import {
    isCreateOneMenuBookingRequestRequest,
    type CreateOneBookingRequestRequest,
    type CreateOneMenuBookingRequestRequest,
} from '../CreateOneBookingRequestRequest';

export interface CreateOneBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneBookingRequestRequest & { userId: NanoId };
}

async function persistMenuBookingRequest(
    runtime: Runtime,
    context: Context,
    bookingRequestId: NanoId,
    menuBookingRequest: CreateOneMenuBookingRequestRequest & { userId: NanoId },
    paymentData: { setupIntentId: string; clientSecret: string },
): Promise<boolean> {
    const { dataSourceAdapter, logger } = runtime;
    const {
        userId,
        cookId,
        location,
        dateTime,
        preparationTime,
        duration,
        adultParticipants,
        children,
        occasion,
        travelExpensesAmount,
        configuredMenu,
        giftCardPromoCodeId,
    } = menuBookingRequest;

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

    if (!publicMenu || !courses) return false;

    const menuPrice: number = calculateMenuPrice(
        adultParticipants,
        children,
        publicMenu.basePrice,
        publicMenu.basePriceCustomers,
        publicMenu.pricePerAdult,
        publicMenu.pricePerChild,
    );

    const giftCardPromoCode: DBGiftCardPromoCode | undefined = await dataSourceAdapter.giftCardPromoCodeRepository.findOne({
        giftCardPromoCodeId,
    });

    const bookingRequestWithPromoCode: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        userId,
        giftCardPromoCodeId,
    });

    const totalAmountUser: number =
        giftCardPromoCode && !bookingRequestWithPromoCode
            ? (menuPrice + menuPrice * 0.04 + travelExpensesAmount - giftCardPromoCode.amount + 25) / (1 - 0.015)
            : (menuPrice + menuPrice * 0.04 + travelExpensesAmount + 25) / (1 - 0.015);
    const totalAmountCook: number = Math.round(menuPrice * ((100 - 18) / 100)) + travelExpensesAmount;

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.insertOne({
        bookingRequestId,
        userId,
        cookId,
        userAccepted: true,
        cookAccepted: undefined,
        latitude: location.latitude,
        longitude: location.longitude,
        locationText: location.text ?? '',
        dateTime,
        preparationTime,
        duration,
        adultParticipants,
        children,
        totalAmountCook,
        totalAmountUser,
        currencyCode: 'EUR',
        fee: 22,
        occasion: occasion.trim(),
        createdAt: new Date(),
        giftCardPromoCodeId,
        paymentData: { ...paymentData, provider: 'STRIPE', confirmed: false, unlocked: false },
        travelExpensesAmount,
        // costBreakdown: {
        //     lineItems: [
        //         { type: 'MENU_PRICE', title: 'Menüpreis', price: { amount: menuPrice, currencyCode: 'EUR' } },
        //         { type: 'TRAVEL_EXPENSES', title: 'Reisekosten', price: { amount: travelExpensesAmount, currencyCode: 'EUR' } },
        //     ],
        //     totalPriceCook: { amount: totalAmountCook, currencyCode: 'EUR' },
        //     totalPriceUser: { amount: totalAmountUser, currencyCode: 'EUR' },
        // },
    });

    if (!success) return false;

    const configuredMenuCourses: ConfiguredMenuCourse[] = [];

    for (const configuredCourse of configuredMenu.courses) {
        const course: Course | undefined = courses.find((c: Course) => c.courseId === configuredCourse.courseId);
        if (!course) {
            logger.info("Didn't find course");
            return false;
        }

        const selectedMeal: MealOption | undefined = course.mealOptions?.find(
            (mealOption: MealOption) => mealOption.mealId === configuredCourse.mealId,
        );

        if (!selectedMeal) {
            logger.info("Didn't find selected meal");
            return false;
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

    if (!saveConfiguredMenuSuccess) return false;

    return true;
}

// eslint-disable-next-line max-statements
export async function createOne({ runtime, context, request }: CreateOneBookingRequestInput): Promise<{
    success: boolean;
    clientSecret: string;
    bookingRequestId: string;
}> {
    const fee: number = 22;
    const { dataSourceAdapter, paymentAdapter, logger } = runtime;
    const bookingRequestId: NanoId = createNanoId();
    const { userId, cookId, location, dateTime, preparationTime, duration, adultParticipants, children, occasion, message } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const daysUntilEventStart: number = moment(dateTime).diff(moment(), 'days');

    if (daysUntilEventStart < 1) return { success: false, clientSecret: '', bookingRequestId };

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId });

    if (!user) return { success: false, clientSecret: '', bookingRequestId };

    const cookUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cookId });

    if (!cookUser) return { success: false, clientSecret: '', bookingRequestId };

    const paymentData: { setupIntentId: string; clientSecret: string } | undefined = await paymentAdapter.STRIPE.createSetupIntent();

    if (!paymentData) return { success: false, clientSecret: JSON.stringify(paymentData), bookingRequestId };

    const { clientSecret } = paymentData;

    const persistSuccess: boolean = isCreateOneMenuBookingRequestRequest(request)
        ? await persistMenuBookingRequest(runtime, context, bookingRequestId, request, paymentData)
        : await dataSourceAdapter.bookingRequestRepository.insertOne({
              bookingRequestId,
              userId,
              cookId,
              userAccepted: true,
              cookAccepted: undefined,
              latitude: location.latitude,
              longitude: location.longitude,
              locationText: location.text ?? '',
              dateTime,
              preparationTime,
              duration,
              adultParticipants,
              children,
              totalAmountUser: request.price.amount + request.travelExpensesAmount,
              totalAmountCook: Math.round((request.price.amount * (100 - fee)) / 100) + request.travelExpensesAmount,
              travelExpensesAmount: request.travelExpensesAmount,
              currencyCode: 'EUR',
              fee: 22,
              occasion: occasion.trim(),
              kitchenId: request.kitchenId,
              createdAt: new Date(),
              paymentData: { ...paymentData, provider: 'STRIPE', confirmed: false, unlocked: false },
          });

    if (!persistSuccess) return { success: false, clientSecret, bookingRequestId };

    const messageSuccess: boolean = await dataSourceAdapter.chatMessageRepository.insertOne({
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: message.trim(),
        generated: false,
        createdBy: userId,
        createdAt: new Date(),
    });

    if (!messageSuccess) logger.info('creating message did fail');

    return { success: true, clientSecret, bookingRequestId };
}
