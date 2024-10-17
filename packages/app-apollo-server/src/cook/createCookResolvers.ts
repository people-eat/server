import { type Authorization, type Meal, type Menu, type Service } from '@people-eat/server-domain';
import { type CookVisitStatistics } from '../../../domain/src/core/cook-visit/CookVisitStatistics';
import {
    type GQLCook,
    type GQLCookMutation,
    type GQLCookMutationAddOneLanguageArgs,
    type GQLCookMutationBookingRequestsArgs,
    type GQLCookMutationCreateOneArgs,
    type GQLCookMutationMealsArgs,
    type GQLCookMutationMenusArgs,
    type GQLCookMutationRemoveOneLanguageArgs,
    type GQLCookMutationUpdateBiographyArgs,
    type GQLCookMutationUpdateHasStripePayoutMethodActivatedArgs,
    type GQLCookMutationUpdateIsLockedArgs,
    type GQLCookMutationUpdateIsVisibleArgs,
    type GQLCookMutationUpdateLocationArgs,
    type GQLCookMutationUpdateMaximumParticipantsArgs,
    type GQLCookMutationUpdateMaximumPriceArgs,
    type GQLCookMutationUpdateMaximumTravelDistanceArgs,
    type GQLCookMutationUpdateMinimumParticipantsArgs,
    type GQLCookMutationUpdateMinimumPriceArgs,
    type GQLCookMutationUpdateRankArgs,
    type GQLCookMutationUpdateTravelExpensesArgs,
    type GQLCookQuery,
    type GQLCookQueryBookingRequestsArgs,
    type GQLCookQueryFindManyArgs,
    type GQLCookQueryFindOneArgs,
    type GQLCookQueryGetStripeDashboardUrlArgs,
    type GQLCookQueryGetStripeOnboardingUrlArgs,
    type GQLCookQueryGlobalBookingRequestsArgs,
    type GQLCookQueryMealsArgs,
    type GQLCookQueryMenusArgs,
    type GQLCookVisitStatistics,
    type GQLLanguage,
    type GQLMeal,
    type GQLMenu,
    type GQLUser,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createCookResolvers(service: Service): Resolvers<'Cook' | 'CookMutation' | 'CookQuery'> {
    return {
        Cook: {
            user: async ({ cookId }: GQLCook, _input: unknown, context: Authorization.Context): Promise<GQLUser> =>
                service.user.findOneByUserId(context, { userId: cookId }) as any,
            languages: async ({ cookId }: GQLCook, _input: unknown, context: Authorization.Context): Promise<GQLLanguage[]> =>
                service.cookLanguage.findAll(context, { cookId }) as any,
            meals: async ({ cookId }: GQLCook, _input: unknown, context: Authorization.Context): Promise<GQLMeal[]> =>
                service.meal.findMany(context, { cookId }) as any,
            mealCount: async ({ cookId }: GQLCook, _input: unknown, context: Authorization.Context): Promise<number> => {
                const meals: Meal[] | undefined = await service.meal.findMany(context, { cookId });
                return meals?.length ?? 0;
            },
            menus: async ({ cookId }: GQLCook, _input: unknown, context: Authorization.Context): Promise<GQLMenu[]> =>
                service.menu.findMany(context, { cookId }) as any,
            menuCount: async ({ cookId }: GQLCook, _input: unknown, context: Authorization.Context): Promise<number> => {
                const menus: Menu[] | undefined = await service.menu.findMany(context, { cookId });
                return menus?.length ?? 0;
            },
            ratingAverage: () => 15,
            ratingCount: () => 0,
            visitStatistics: async (
                { cookId }: GQLCook,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLCookVisitStatistics> => {
                const stats: CookVisitStatistics = await service.cookVisitService.findStatistics(context, { cookId });
                return stats as any;
            },
        },
        CookMutation: {
            createOne: async (
                _parent: GQLCookMutation,
                { cookId, request }: GQLCookMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.createOne(context, cookId, request),

            updateIsLocked: async (
                _parent: GQLCookMutation,
                { cookId, isLocked }: GQLCookMutationUpdateIsLockedArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateIsLocked(context, cookId, isLocked),

            updateIsVisible: async (
                _parent: GQLCookMutation,
                { cookId, isVisible }: GQLCookMutationUpdateIsVisibleArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateIsVisible(context, cookId, isVisible),

            updateLocation: async (
                _parent: GQLCookMutation,
                { cookId, location }: GQLCookMutationUpdateLocationArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateLocation(context, cookId, location),

            updateRank: async (
                _parent: GQLCookMutation,
                { cookId, rank }: GQLCookMutationUpdateRankArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateRank(context, cookId, rank),

            updateBiography: async (
                _parent: GQLCookMutation,
                { cookId, biography }: GQLCookMutationUpdateBiographyArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateBiography(context, cookId, biography),

            updateTravelExpenses: async (
                _parent: GQLCookMutation,
                { cookId, travelExpenses }: GQLCookMutationUpdateTravelExpensesArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateTravelExpenses(context, cookId, travelExpenses),

            updateMaximumTravelDistance: async (
                _parent: GQLCookMutation,
                { cookId, maximumTravelDistance }: GQLCookMutationUpdateMaximumTravelDistanceArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateMaximumTravelDistance(context, cookId, maximumTravelDistance),

            updateMinimumPrice: async (
                _parent: GQLCookMutation,
                { cookId, minimumPrice }: GQLCookMutationUpdateMinimumPriceArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateMinimumPrice(context, cookId, minimumPrice),

            updateMaximumPrice: async (
                _parent: GQLCookMutation,
                { cookId, maximumPrice }: GQLCookMutationUpdateMaximumPriceArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateMaximumPrice(context, cookId, maximumPrice),

            updateMinimumParticipants: async (
                _parent: GQLCookMutation,
                { cookId, minimumParticipants }: GQLCookMutationUpdateMinimumParticipantsArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateMinimumParticipants(context, cookId, minimumParticipants),

            updateMaximumParticipants: async (
                _parent: GQLCookMutation,
                { cookId, maximumParticipants }: GQLCookMutationUpdateMaximumParticipantsArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateMaximumParticipants(context, cookId, maximumParticipants),

            updateHasStripePayoutMethodActivated: async (
                _parent: GQLCookMutation,
                { cookId }: GQLCookMutationUpdateHasStripePayoutMethodActivatedArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateHasStripePayoutMethodActivated(context, cookId),

            addOneLanguage: async (
                _parent: GQLCookMutation,
                { cookId, languageId }: GQLCookMutationAddOneLanguageArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cookLanguage.createOne(context, { cookId, languageId }),

            removeOneLanguage: async (
                _parent: GQLCookMutation,
                { cookId, languageId }: GQLCookMutationRemoveOneLanguageArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cookLanguage.deleteOne(context, { cookId, languageId }),

            meals: (_parent: GQLCookMutation, { cookId }: GQLCookMutationMealsArgs) => ({ cookId } as any),
            menus: (_parent: GQLCookMutation, { cookId }: GQLCookMutationMenusArgs) => ({ cookId } as any),
            bookingRequests: (_parent: GQLCookMutation, { cookId }: GQLCookMutationBookingRequestsArgs) => ({ cookId } as any),
        },
        CookQuery: {
            findOne: async (
                _parent: GQLCookQuery,
                { cookId }: GQLCookQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLCook | undefined> => service.cook.findOne(context, cookId) as any,

            findMany: async (
                _parent: GQLCookQuery,
                { request }: GQLCookQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLCook[]> => service.cook.findMany(context, request) as any,

            getStripeOnboardingUrl: async (
                _parent: GQLCookQuery,
                { cookId, returnBookingId }: GQLCookQueryGetStripeOnboardingUrlArgs,
                context: Authorization.Context,
            ): Promise<string | undefined> => service.cook.getStripeOnboardingUrl(context, cookId, returnBookingId) as any,

            getStripeDashboardUrl: async (
                _parent: GQLCookQuery,
                { cookId }: GQLCookQueryGetStripeDashboardUrlArgs,
                context: Authorization.Context,
            ): Promise<string | undefined> => service.cook.getStripeDashboardUrl(context, cookId) as any,

            meals: (_parent: GQLCookQuery, { cookId }: GQLCookQueryMealsArgs) => ({ cookId } as any),
            menus: (_parent: GQLCookQuery, { cookId }: GQLCookQueryMenusArgs) => ({ cookId } as any),
            globalBookingRequests: (_parent: GQLCookQuery, { cookId }: GQLCookQueryGlobalBookingRequestsArgs) => ({ cookId } as any),
            bookingRequests: (_parent: GQLCookQuery, { cookId }: GQLCookQueryBookingRequestsArgs) => ({ cookId } as any),
        },
    };
}
