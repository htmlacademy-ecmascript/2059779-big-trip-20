import { FilterType } from '../const';

const filter = {
  [FilterType.EVERYTHING]: (events) => [...events],
};

export { filter };
