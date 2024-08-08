export type NanoId = string;

export type Gender = 'DIVERSE' | 'FEMALE' | 'MALE' | 'NO_INFORMATION';

export type Platform = 'IOS' | 'ANDROID' | 'BROWSER' | 'NO_INFORMATION';

export type UserLanguage = 'GERMAN' | 'ENGLISH';

export type IdentityProvider = 'APPLE' | 'GOOGLE';

export type CookRank = 'HOBBY' | 'PROFESSIONAL';

export type MealType = 'SOUP' | 'MEAT' | 'FISH' | 'VEGETARIAN' | 'VEGAN' | 'DESSERT' | 'SPECIAL';

export type BookingRequestStatus = 'OPEN' | 'PENDING' | 'CANCELED' | 'COMPLETED';

export interface Location {
    latitude: number;
    longitude: number;
    text?: string;
}

export type PaymentProvider = 'STRIPE';

export type CurrencyCode = 'EUR' | 'USD';

export interface Price {
    amount: number;
    currencyCode: CurrencyCode;
}

export interface FindManyRequest {
    searchText?: string;
    skip?: number;
    take?: number;
}

export interface HeroCity {
    displayName: string;
    location: Location;
}

export const heroCities: HeroCity[] = [
    { displayName: 'Frankfurt', location: { latitude: 50.109958, longitude: 8.679098 } },
    { displayName: 'Berlin', location: { latitude: 52.519553, longitude: 13.404773 } },
    { displayName: 'München', location: { latitude: 48.134631, longitude: 11.582123 } },
    { displayName: 'Köln', location: { latitude: 50.936986, longitude: 6.959128 } },
    { displayName: 'Heidelberg', location: { latitude: 49.399671, longitude: 8.673215 } },
];
