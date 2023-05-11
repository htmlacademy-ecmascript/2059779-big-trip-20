import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'hh:mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(min = 0, max = 1) {
  const lower = Math.abs(Math.min(min, max));
  const upper = Math.abs(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

const startDateDelay = getRandomInteger(1, 5);
const currentDate = new Date();
const startDate = currentDate.setDate(currentDate.getDate() + startDateDelay);

export { DATE_FORMAT, TIME_FORMAT, getRandomArrayElement, getRandomInteger };
