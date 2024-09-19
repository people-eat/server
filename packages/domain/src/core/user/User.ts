import { type Gender, type NanoId, type UserLanguage } from '../shared';

export interface User {
    userId: NanoId;
    hasPasswordSetUp: boolean;
    emailAddress?: string;
    phoneNumber?: string;
    firstName: string;
    lastName: string;
    language: UserLanguage;
    gender: Gender;
    birthDate?: string;
    profilePictureUrl?: string;
    acceptedPrivacyPolicy: Date;
    acceptedTerms: Date;
    createdAt: Date;
}
