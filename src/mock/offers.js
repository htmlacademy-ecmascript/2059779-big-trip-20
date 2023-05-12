import { EVENT_TYPES, OFFERS, PRICE_RANGE } from '../const';
import { getRandomArrayElement, getRandomPositiveInteger } from '../utils';

const mockOffers = [
  {
    type: getRandomArrayElement(EVENT_TYPES),
    offers: {
      id: crypto.randomUUID(),
      title: getRandomArrayElement(OFFERS),
      price: getRandomPositiveInteger(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
    }
  },
];

export { mockOffers };
