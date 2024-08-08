import { type Authorization, type PublicMenu, type Service } from '@people-eat/server-domain';
import {
    type GQLHeroCookGroup,
    type GQLLanguage,
    type GQLPublicCook,
    type GQLPublicCookQuery,
    type GQLPublicCookQueryFindManyArgs,
    type GQLPublicCookQueryFindOneArgs,
    type GQLPublicMenu,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createPublicCookResolvers(service: Service): Resolvers<'PublicCook' | 'PublicCookQuery'> {
    return {
        PublicCook: {
            languages: async ({ cookId }: GQLPublicCook, _input: unknown, context: Authorization.Context): Promise<GQLLanguage[]> =>
                service.cookLanguage.findAll(context, { cookId }) as any,
            menus: async ({ cookId }: GQLPublicCook, _input: unknown, context: Authorization.Context): Promise<GQLPublicMenu[]> =>
                service.publicMenu.findManyByCookId(context, { cookId }) as any,
            menuCount: async ({ cookId }: GQLPublicCook, _input: unknown, context: Authorization.Context): Promise<number> => {
                const publicMenus: PublicMenu[] | undefined = await service.publicMenu.findManyByCookId(context, { cookId });
                if (!publicMenus) return 0;
                return publicMenus.length;
            },
        },
        PublicCookQuery: {
            findOne: async (
                _parent: GQLPublicCookQuery,
                { cookId }: GQLPublicCookQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicCook | undefined> => service.publicCook.findOne(context, cookId, true) as any,

            findMany: async (
                _parent: GQLPublicCookQuery,
                { request }: GQLPublicCookQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicCook[]> => service.publicCook.findMany(context, request) as any,

            findHeroGroups: async (
                _parent: GQLPublicCookQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLHeroCookGroup[]> => service.publicCook.findHeroGroups(context) as any,

            checkAvailability: async (
                _parent: GQLPublicCookQuery,
                { request }: GQLPublicCookQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.publicCook.checkAvailability(context, request),
        },
    };
}
