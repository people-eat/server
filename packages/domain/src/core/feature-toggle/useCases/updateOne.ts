import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type UpdateOneFeatureToggleRequest } from '../FeatureToggle';

export interface FindOneFeatureToggleInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: UpdateOneFeatureToggleRequest;
}

export async function updateOne({
    runtime: { dataSourceAdapter, logger },
    context,
    request: { featureToggleId, key, activityLevel },
}: FindOneFeatureToggleInput): Promise<boolean> {
    await Authorization.isAdmin({ dataSourceAdapter, logger, context });

    const success: boolean = await dataSourceAdapter.featureToggleRepository.updateOne({ featureToggleId }, { key, activityLevel });

    return success;
}
