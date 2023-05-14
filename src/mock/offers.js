import { OFFERS, PRICE_RANGE } from '../const';
import { getRandomArrayElement, getRandomPositiveInteger } from '../utils';


function getRandomOfferOption() {
  return {
    id: crypto.randomUUID(),
    title: getRandomArrayElement(OFFERS),
    price: getRandomPositiveInteger(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
  };
}

export { getRandomOfferOption };
