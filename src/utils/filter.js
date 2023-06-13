import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(isToday);

import { FilterType } from '../const';

const filter = {
  [FilterType.EVERYTHING]: (events) => [...events],
  [FilterType.FUTURE]: (events) => events.filter((event) => dayjs(event.dateFrom).isAfter(dayjs())),
  [FilterType.PRESENT]: (events) => events.filter((event) => dayjs(event.dateFrom).isToday()),
  [FilterType.PAST]: (events) => events.filter((event) => dayjs(event.dateFrom).isBefore(dayjs())),
};

export { filter };
