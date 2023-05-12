import { EVENT_TYPES, LOCATIONS, PRICE_RANGE } from '../const';
import { getRandomArrayElement, getRandomPositiveInteger, getEventDates } from '../utils';
import { mockOffers } from './offers';

function getEvent() {
  const dates = getEventDates();
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomPositiveInteger(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
    dateFrom: dates.startDate,
    dateTo: dates.finishDate,
    destination: getRandomArrayElement(LOCATIONS),
    isFavorite: !!getRandomPositiveInteger(),
    offers: [],
    type: getRandomArrayElement(EVENT_TYPES),
  };
}

export { getEvent };
