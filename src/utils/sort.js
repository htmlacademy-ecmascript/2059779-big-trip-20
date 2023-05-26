import { getDateDiff } from './date';

function compareEventPrice(eventA, eventB) {
  return eventA.basePrice - eventB.basePrice;
}

function compareEventDuration(eventA, eventB) {
  const eventADuration = getDateDiff(eventA.dateFrom, eventA.dateTo).asSeconds();
  const eventBDuration = getDateDiff(eventB.dateFrom, eventB.dateTo).asSeconds();
  return eventADuration - eventBDuration;
}

export { compareEventPrice, compareEventDuration };
