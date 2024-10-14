import { Authorization } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneFeatureToggleRequest } from '../FeatureToggle';

export interface CreateOneFeatureToggleInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneFeatureToggleRequest;
}

export async function createOne({
    runtime: { dataSourceAdapter, logger },
    context,
    request: { key, activityLevel },
}: CreateOneFeatureToggleInput): Promise<boolean> {
    const { adminId } = await Authorization.isAdmin({ dataSourceAdapter, logger, context });

    const featureToggleId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.featureToggleRepository.insertOne({
        featureToggleId,
        key,
        activityLevel,
        adminId,
        createdAt: new Date(),
    });

    return success;
}
