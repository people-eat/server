import { type Authorization } from '../../..';
import { type DBFeatureToggle } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type FeatureToggle } from '../FeatureToggle';

export interface FindOneFeatureToggleInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { key: string };
}

export async function findOne({
    runtime: { dataSourceAdapter },
    request: { key },
}: FindOneFeatureToggleInput): Promise<FeatureToggle | undefined> {
    const featureToggle: DBFeatureToggle | undefined = await dataSourceAdapter.featureToggleRepository.findOne({ key });
    return featureToggle;
}
