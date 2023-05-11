import { EVENT_TYPES, OFFERS, PRICE_RANGE } from '../const';
import { getRandomArrayElement, getRandomInteger } from '../utils';

const mockOffers = [
  {
    type: getRandomArrayElement(EVENT_TYPES),
    offers: {
      id: crypto.randomUUID(),
      title: getRandomArrayElement(OFFERS),
      price: getRandomInteger(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
    }
  },
];

export { mockOffers };
