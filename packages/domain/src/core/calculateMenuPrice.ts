export function calculateMenuPrice(
    adultParticipants: number,
    underagedParticipants: number,
    basePrice: number,
    basePriceCustomers: number,
    pricePerAdult: number,
    pricePerUnderaged?: number,
): number {
    if (adultParticipants + underagedParticipants <= basePriceCustomers) return basePrice;

    if (!pricePerUnderaged) return basePrice + (adultParticipants + underagedParticipants - basePriceCustomers) * pricePerAdult;

    if (adultParticipants - basePriceCustomers >= 0)
        return basePrice + (adultParticipants - basePriceCustomers) * pricePerAdult + underagedParticipants * pricePerUnderaged;

    return (underagedParticipants - basePriceCustomers - adultParticipants) * pricePerUnderaged + basePrice;
}
