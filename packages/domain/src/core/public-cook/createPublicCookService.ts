import { type Authorization, type PublicCook } from '../..';
import { type Runtime } from '../Runtime';
import { type FindManyPublicCooksRequest } from './FindManyPublicCooksRequest';
import { type HeroCookGroup } from './HeroCookGroup';
import { checkAvailability } from './useCases/checkAvailability';
import { findHeroGroups } from './useCases/findHeroGroups';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';

export interface PublicCookService {
    findOne(context: Authorization.Context, cookId: string, checkPublic: boolean): Promise<PublicCook | undefined>;
    findMany(context: Authorization.Context, request: FindManyPublicCooksRequest): Promise<PublicCook[] | undefined>;
    findHeroGroups(context: Authorization.Context): Promise<HeroCookGroup[]>;
    checkAvailability(context: Authorization.Context, request: FindManyPublicCooksRequest): Promise<boolean>;
}

export function createPublicCookService({ dataSourceAdapter, logger }: Runtime): PublicCookService {
    return {
        findOne: (context: Authorization.Context, cookId: string, checkPublic: boolean) =>
            findOne({ dataSourceAdapter, logger, context, request: { cookId, checkPublic } }),
        findMany: (context: Authorization.Context, request: FindManyPublicCooksRequest) =>
            findMany({ dataSourceAdapter, logger, context, request }),
        findHeroGroups: (context: Authorization.Context) => findHeroGroups({ dataSourceAdapter, logger, context }),
        checkAvailability: (context: Authorization.Context, request: FindManyPublicCooksRequest) =>
            checkAvailability({ dataSourceAdapter, logger, context, request }),
    };
}
