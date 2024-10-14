import { type Authorization } from '../../..';
import { type DBFeatureToggle } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type FeatureToggle } from '../FeatureToggle';

export interface FindManyFeatureToggleInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { keys: string[] };
}

export async function findMany({
    runtime: { dataSourceAdapter },
    request: { keys },
}: FindManyFeatureToggleInput): Promise<FeatureToggle[] | undefined> {
    if (keys.length === 0) return [];
    const featureToggles: DBFeatureToggle[] | undefined = await dataSourceAdapter.query(
        `SELECT * FROM FeatureToggles WHERE key IN (${keys.join(',')})`,
    );
    return featureToggles;
}
