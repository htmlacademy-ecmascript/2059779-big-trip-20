import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'hh:mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomPositiveInteger(min = 0, max = 1) {
  const lower = Math.abs(Math.min(min, max));
  const upper = Math.abs(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

function getEventDates() {
  const startDateDelay = getRandomPositiveInteger(1, 5);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + startDateDelay);
  const finishDateDelay = Math.random();
  const finishDate = new Date(currentDate.getTime() + finishDateDelay * 24 * 60 * 60 * 1000);
  const startDate = currentDate.toISOString();
  finishDate.toISOString();

  return {
    startDate: startDate,
    finishDate: finishDate
  };
}

export { DATE_FORMAT, TIME_FORMAT, getRandomArrayElement, getRandomPositiveInteger, getEventDates };
