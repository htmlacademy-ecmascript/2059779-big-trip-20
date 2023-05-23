import { filter } from '../utils/filter';

function generateFilter() {
  return Object.entries(filter).map(([filterType]) => ({
    type: filterType,
  }),
  );
}

export { generateFilter };
