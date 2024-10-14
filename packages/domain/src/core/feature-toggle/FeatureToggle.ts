import { type NanoId } from '../shared';

export interface FeatureToggle {
    featureToggleId: NanoId;
    key: string;
    activityLevel: number;
    adminId: NanoId;
    createdAt: Date;
}

export type CreateOneFeatureToggleRequest = Pick<FeatureToggle, 'key' | 'activityLevel'>;
export type UpdateOneFeatureToggleRequest = Pick<FeatureToggle, 'featureToggleId' | 'key' | 'activityLevel'>;
