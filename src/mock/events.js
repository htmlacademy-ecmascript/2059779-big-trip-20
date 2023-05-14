import { OFFER_TYPES, PRICE_RANGE } from '../const';
import { getRandomArrayElement, getRandomPositiveInteger } from '../utils';

function getRandomEvent(dates, destinationId, offersIds) {
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomPositiveInteger(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
    dateFrom: dates.startDate,
    dateTo: dates.finishDate,
    destination: destinationId,
    isFavorite: !!getRandomPositiveInteger(),
    offers: offersIds,
    type: getRandomArrayElement(OFFER_TYPES),
  };
}

export { getRandomEvent };
