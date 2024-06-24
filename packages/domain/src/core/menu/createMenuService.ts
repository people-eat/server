import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type CurrencyCode, type FindManyRequest, type Location, type NanoId, type Price } from '../shared';
import { type CreateOneMenuRequest } from './CreateOneMenuRequest';
import { type Menu } from './Menu';
import { calculateTotalPrice } from './useCases/calculateTotalPrice';
import { createOne } from './useCases/createOne';
import { deleteOne } from './useCases/deleteOne';
import { findImageUrls } from './useCases/findImageUrls';
import { findKeyMealOptionImageUrl } from './useCases/findKeyMealOptionImageUrl';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';
import { updateBasePrice } from './useCases/updateBasePrice';
import { updateBasePriceCustomers } from './useCases/updateBasePriceCustomers';
import { updateCurrencyCode } from './useCases/updateCurrencyCode';
import { updateDescription } from './useCases/updateDescription';
import { updateGreetingFromKitchen } from './useCases/updateGreetingFromKitchen';
import { updateIsVisible } from './useCases/updateIsVisible';
import { updateKeyMealOption } from './useCases/updateKeyMealOption';
import { updateKitchenId } from './useCases/updateKitchenId';
import { updatePreparationTime } from './useCases/updatePreparationTime';
import { updatePricePerAdult } from './useCases/updatePricePerAdult';
import { updatePricePerChild } from './useCases/updatePricePerChild';
import { updateTitle } from './useCases/updateTitle';

export interface MenuService {
    findOne(context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId }): Promise<Menu | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest & { cookId: NanoId }): Promise<Menu[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneMenuRequest & { cookId: NanoId }): Promise<boolean>;
    deleteOne(context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId }): Promise<boolean>;

    findImageUrls(context: Authorization.Context, request: { menuId: NanoId }): Promise<string[]>;
    findKeyMealOptionImageUrl(context: Authorization.Context, request: { menuId: NanoId }): Promise<string | undefined>;
    calculateTotalPrice(request: {
        eventLocation?: Location;
        cookLocation: Location;
        cookTravelExpenses: number;

        adults: number;
        children: number;

        basePrice: number;
        basePriceCustomers: number;
        pricePerAdult: number;
        pricePerChild?: number;
        currencyCode: CurrencyCode;
    }): Promise<Price>;

    updateKeyMealOption(
        context: Authorization.Context,
        request: { cookId: NanoId; menuId: NanoId; keyMealOption?: { courseId: NanoId; index: number } },
    ): Promise<boolean>;
    updateIsVisible(context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId; isVisible: boolean }): Promise<boolean>;
    updateTitle(context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId; title: string }): Promise<boolean>;
    updateDescription(context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId; description: string }): Promise<boolean>;
    updatePreparationTime(
        context: Authorization.Context,
        request: { cookId: NanoId; menuId: NanoId; preparationTime: number },
    ): Promise<boolean>;
    updateKitchenId(context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId; kitchenId?: NanoId }): Promise<boolean>;
    updateGreetingFromKitchen(
        context: Authorization.Context,
        request: { cookId: NanoId; menuId: NanoId; greetingFromKitchen?: string },
    ): Promise<boolean>;
    updateBasePrice(context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId; basePrice: number }): Promise<boolean>;
    updateBasePriceCustomers(
        context: Authorization.Context,
        request: { cookId: NanoId; menuId: NanoId; basePriceCustomers: number },
    ): Promise<boolean>;
    updatePricePerAdult(
        context: Authorization.Context,
        request: { cookId: NanoId; menuId: NanoId; pricePerAdult: number },
    ): Promise<boolean>;
    updatePricePerChild(
        context: Authorization.Context,
        request: { cookId: NanoId; menuId: NanoId; pricePerChild?: number },
    ): Promise<boolean>;
    updateCurrencyCode(
        context: Authorization.Context,
        request: { cookId: NanoId; menuId: NanoId; currencyCode: CurrencyCode },
    ): Promise<boolean>;
}

export function createMenuService({ dataSourceAdapter, logger }: Runtime): MenuService {
    return {
        findOne: (context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId }) =>
            findOne({ dataSourceAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest & { cookId: NanoId }) =>
            findMany({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneMenuRequest & { cookId: NanoId }) =>
            createOne({ dataSourceAdapter, logger, context, request }),
        deleteOne: (context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId }) =>
            deleteOne({ dataSourceAdapter, logger, context, request }),

        findImageUrls: (context: Authorization.Context, request: { menuId: NanoId }) =>
            findImageUrls({ dataSourceAdapter, logger, context, request }),

        findKeyMealOptionImageUrl: (context: Authorization.Context, request: { menuId: NanoId }) =>
            findKeyMealOptionImageUrl({ dataSourceAdapter, logger, context, request }),

        calculateTotalPrice: (request: {
            eventLocation?: Location;
            cookLocation: Location;
            cookTravelExpenses: number;

            adults: number;
            children: number;

            basePrice: number;
            basePriceCustomers: number;
            pricePerAdult: number;
            pricePerChild?: number;
            currencyCode: CurrencyCode;
        }) => calculateTotalPrice({ request }),

        updateKeyMealOption: (
            context: Authorization.Context,
            request: { cookId: NanoId; menuId: NanoId; keyMealOption: { courseId: NanoId; index: number } },
        ) => updateKeyMealOption({ dataSourceAdapter, logger, context, request }),
        updateIsVisible: (context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId; isVisible: boolean }) =>
            updateIsVisible({ dataSourceAdapter, logger, context, request }),
        updateTitle: (context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId; title: string }) =>
            updateTitle({ dataSourceAdapter, logger, context, request }),
        updateDescription: (context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId; description: string }) =>
            updateDescription({ dataSourceAdapter, logger, context, request }),
        updatePreparationTime: (context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId; preparationTime: number }) =>
            updatePreparationTime({ dataSourceAdapter, logger, context, request }),
        updateKitchenId: (context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId; kitchenId?: NanoId }) =>
            updateKitchenId({ dataSourceAdapter, logger, context, request }),
        updateGreetingFromKitchen: (
            context: Authorization.Context,
            request: { cookId: NanoId; menuId: NanoId; greetingFromKitchen?: string },
        ) => updateGreetingFromKitchen({ dataSourceAdapter, logger, context, request }),
        updateBasePrice: (context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId; basePrice: number }) =>
            updateBasePrice({ dataSourceAdapter, logger, context, request }),
        updateBasePriceCustomers: (
            context: Authorization.Context,
            request: { cookId: NanoId; menuId: NanoId; basePriceCustomers: number },
        ) => updateBasePriceCustomers({ dataSourceAdapter, logger, context, request }),
        updatePricePerAdult: (context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId; pricePerAdult: number }) =>
            updatePricePerAdult({ dataSourceAdapter, logger, context, request }),
        updatePricePerChild: (context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId; pricePerChild?: number }) =>
            updatePricePerChild({ dataSourceAdapter, logger, context, request }),
        updateCurrencyCode: (context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId; currencyCode: CurrencyCode }) =>
            updateCurrencyCode({ dataSourceAdapter, logger, context, request }),
    };
}
