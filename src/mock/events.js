import { EVENT_TYPES, CITIES, OFFERS, LOCATION_DESCRIPTIONS, PRICE_RANGE } from "../const";
import { getRandomArrayElement, getRandomNumber, getRandomBoolean } from "../utils";

const mockEvents = [
  {
    id: crypto.randomUUID(),
    basePrice: getRandomNumber(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
    dateFrom: ,
    dateTo: ,
    destination: getRandomArrayElement(CITIES),
    isFavorite: !!getRandomNumber(),
    offers: [],
    type: getRandomArrayElement(EVENT_TYPES),
  },
  {},
  {},
  {},
];
