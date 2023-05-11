import { EVENT_TYPES, LOCATIONS, PRICE_RANGE } from '../const';
import { getRandomArrayElement, getRandomInteger } from '../utils';
import { mockOffers } from './offers';

const mockEvents = [
  {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
    dateFrom: ,
    dateTo: ,
    destination: getRandomArrayElement(LOCATIONS),
    isFavorite: !!getRandomInteger(),
    offers: [],
    type: getRandomArrayElement(EVENT_TYPES),
  },
  {},
  {},
  {},
];
