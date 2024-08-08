import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLCourse,
    type GQLHeroMenuGroup,
    type GQLPrice,
    type GQLPublicMenu,
    type GQLPublicMenuQuery,
    type GQLPublicMenuQueryFindManyArgs,
    type GQLPublicMenuQueryFindOneArgs,
    type GQLPublicMenuTotalPriceArgs,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createPublicMenuResolvers(service: Service): Resolvers<'PublicMenu' | 'PublicMenuQuery'> {
    return {
        PublicMenu: {
            imageUrl: async ({ menuId }: GQLPublicMenu, _input: unknown, context: Authorization.Context): Promise<string | undefined> =>
                service.menu.findKeyMealOptionImageUrl(context, { menuId }),
            courses: async ({ menuId }: GQLPublicMenu, _input: unknown, context: Authorization.Context): Promise<GQLCourse[]> =>
                service.publicMenu.findAllCourses(context, { menuId }) as any,
            courseCount: async ({ menuId }: GQLPublicMenu, _input: unknown, context: Authorization.Context): Promise<number> => {
                const courses: GQLCourse[] | undefined = (await service.publicMenu.findAllCourses(context, { menuId })) as any;
                if (!courses) return 0;
                return courses.length;
            },
            totalPrice: async (
                { basePrice, basePriceCustomers, pricePerAdult, pricePerChild, currencyCode, cook }: GQLPublicMenu,
                { location, adults, children }: GQLPublicMenuTotalPriceArgs,
            ): Promise<GQLPrice> =>
                service.menu.calculateTotalPrice({
                    eventLocation: location,
                    cookLocation: cook.location,
                    cookTravelExpenses: cook.travelExpenses,

                    adults,
                    children,

                    basePrice,
                    basePriceCustomers,
                    pricePerAdult,
                    pricePerChild,
                    currencyCode,
                }),
        },
        PublicMenuQuery: {
            findOne: async (
                _parent: GQLPublicMenuQuery,
                { menuId }: GQLPublicMenuQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicMenu | undefined> => service.publicMenu.findOne(context, menuId) as any,

            findMany: async (
                _parent: GQLPublicMenuQuery,
                { request }: GQLPublicMenuQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicMenu[]> => service.publicMenu.findMany(context, request) as any,

            findHeroGroups: async (
                _parent: GQLPublicMenuQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLHeroMenuGroup[]> => service.publicMenu.findHeroGroups(context) as any,

            checkAvailability: async (
                _parent: GQLPublicMenuQuery,
                { request }: GQLPublicMenuQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.publicMenu.checkAvailability(context, request),
        },
    };
}
