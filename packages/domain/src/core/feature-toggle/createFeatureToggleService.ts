import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type CreateOneFeatureToggleRequest, type FeatureToggle, type UpdateOneFeatureToggleRequest } from './FeatureToggle';
import { createOne } from './useCases/createOne';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';
import { updateOne } from './useCases/updateOne';

export interface FeatureToggleService {
    findOne(context: Authorization.Context, request: { key: string }): Promise<FeatureToggle | undefined>;
    findMany(context: Authorization.Context, request: { keys: string[] }): Promise<FeatureToggle[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneFeatureToggleRequest): Promise<boolean>;
    updateOne(context: Authorization.Context, request: UpdateOneFeatureToggleRequest): Promise<boolean>;
}

export function createFeatureToggleService(runtime: Runtime): FeatureToggleService {
    return {
        findOne: (context: Authorization.Context, request: { key: string }) => findOne({ runtime, context, request }),
        findMany: (context: Authorization.Context, request: { keys: string[] }) => findMany({ runtime, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneFeatureToggleRequest) => createOne({ runtime, context, request }),
        updateOne: (context: Authorization.Context, request: UpdateOneFeatureToggleRequest) => updateOne({ runtime, context, request }),
    };
}
