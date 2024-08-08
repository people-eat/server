import { type Authorization, type DataSource, type Logger } from '../../..';
import { type DBUser } from '../../../data-source';
import { geoDistance } from '../../../utils/geoDistance';
import packLocation from '../../packLocation';
import { heroCities } from '../../shared';
import { type HeroCookGroup } from '../HeroCookGroup';

export interface FindManyPublicCooksInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
}

export async function findHeroGroups({ dataSourceAdapter }: FindManyPublicCooksInput): Promise<HeroCookGroup[]> {
    const cooks: DataSource.DBCook[] | undefined = await dataSourceAdapter.cookRepository.findMany({});

    if (!cooks) return [];

    const heroGroups: HeroCookGroup[] = [];

    for (const heroCity of heroCities) {
        const heroGroup: HeroCookGroup = {
            displayName: heroCity.displayName,
            cooks: [],
        };

        for (const cook of cooks) {
            if (!cook.isVisible || cook.isLocked) continue;

            const { latitude, longitude } = cook;
            const distance: number = geoDistance({ location1: heroCity.location, location2: { latitude, longitude } });
            if (cook.maximumTravelDistance && distance > cook.maximumTravelDistance) continue;

            const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cook.cookId });

            if (!user) continue;

            heroGroup.cooks.push({ ...packLocation(cook), user });
        }

        if (heroGroup.cooks.length > 0) heroGroups.push(heroGroup);
    }

    return heroGroups;
}
