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
  const startDateDelay = getRandomPositiveInteger(1, 15);
  const currentDate = new Date();
  const finishDateDelay = Math.random();
  const startDate = new Date(currentDate.getTime());
  startDate.setDate(currentDate.getDate() + startDateDelay);
  const startHour = getRandomPositiveInteger(0, 23);
  const startMinute = getRandomPositiveInteger(0, 59);
  const startSecond = getRandomPositiveInteger(0, 59);
  startDate.setHours(startHour, startMinute, startSecond);
  const finishDate = new Date(startDate.getTime() + finishDateDelay * 24 * 60 * 60 * 1000);
  const startDateISO = startDate.toISOString();
  const finishDateISO = finishDate.toISOString();

  return {
    startDate: startDateISO,
    finishDate: finishDateISO
  };
}

function formatDate(date, format) {
  return dayjs(date).format(format);
}

function getDateDiff(date1, date2) {
  const diff = dayjs.duration(dayjs(date1).diff(dayjs(date2)));
  const days = diff.days();
  const hours = diff.hours();
  const minutes = diff.minutes();
  let result = '';
  if (days > 0) {
    result += `${days}D `;
  }
  if (hours > 0) {
    result += `${hours}H `;
  }
  result += `${minutes}M`;
  return result;
}

export { DATE_FORMAT, TIME_FORMAT, getRandomArrayElement, getRandomPositiveInteger, getEventDates, formatDate, getDateDiff };
