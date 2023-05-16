import { PRICE_RANGE } from '../const';
import { getRandomPositiveInteger } from '../utils';

function getRandomEvent(dates, destinationName, type, options) {
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomPositiveInteger(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
    dateFrom: dates.startDate,
    dateTo: dates.finishDate,
    destination: destinationName,
    isFavorite: !!getRandomPositiveInteger(),
    offers: options,
    type: type,
  };
}

export { getRandomEvent };
