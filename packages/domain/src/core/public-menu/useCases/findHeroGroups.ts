import { type Authorization, type DataSource, type Logger } from '../../..';
import { type DBCategory, type DBKitchen, type DBMenuCategory, type DBUser } from '../../../data-source';
import { geoDistance } from '../../../utils/geoDistance';
import packLocation from '../../packLocation';
import { heroCities, type FindManyRequest } from '../../shared';
import { type HeroMenuGroup } from '../HeroMenuGroup';

export interface FindManyPublicMenusInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

// const heroMenuIds: string[] = [
//     'lJUrAV6brdx44zF5UNKO',
//     'nL98QFBJq36s7YtIDhlV',
//     'U5ydHBxaEndVNhxVaQdl',
//     '5RPq3PvlS3IqajPuBBQE',
//     'smtOynj2WJmZKH2VNu36',
// ];

// eslint-disable-next-line max-statements
export async function findHeroGroups({ dataSourceAdapter }: FindManyPublicMenusInput): Promise<HeroMenuGroup[]> {
    const menus: DataSource.DBMenu[] | undefined = await dataSourceAdapter.menuRepository.findMany({});

    if (!menus) return [];

    const heroGroups: HeroMenuGroup[] = [];

    for (const heroCity of heroCities) {
        const heroGroup: HeroMenuGroup = {
            displayName: heroCity.displayName,
            menus: [],
        };

        for (const menu of menus) {
            if (!menu.isVisible) continue;

            const cook: DataSource.DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId: menu.cookId });

            if (!cook || cook.isLocked || !cook.isVisible) continue;

            const { latitude, longitude } = cook;
            const distance: number = geoDistance({ location1: heroCity.location, location2: { latitude, longitude } });
            if (cook.maximumTravelDistance && distance > cook.maximumTravelDistance) continue;

            const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: menu.cookId });

            if (!user) continue;

            const menuCategories: DBMenuCategory[] | undefined = await dataSourceAdapter.menuCategoryRepository.findMany({
                menuId: menu.menuId,
            });

            if (!menuCategories) continue;

            const categories: DBCategory[] = [];

            for (const menuCategory of menuCategories) {
                const category: DBCategory | undefined = await dataSourceAdapter.categoryRepository.findOne({
                    categoryId: menuCategory.categoryId,
                });
                // eslint-disable-next-line max-depth
                if (!category) continue;
                categories.push(category);
            }

            let kitchen: DBKitchen | undefined;

            if (menu.kitchenId) kitchen = await dataSourceAdapter.kitchenRepository.findOne({ kitchenId: menu?.kitchenId });

            heroGroup.menus.push({
                ...menu,
                cook: { ...packLocation(cook), user },
                categories,
                kitchen,
            });
        }

        if (heroGroup.menus.length > 0) heroGroups.push(heroGroup);
    }

    return heroGroups;
}
