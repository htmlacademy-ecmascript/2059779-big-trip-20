import { DESTINATIONS, DESTINATIONS_DESCRIPTIONS } from '../const';
import { getRandomArrayElement, getRandomInteger } from '../utils';

const destinations = [
  {
    id: crypto.randomUUID(),
    name: getRandomArrayElement(DESTINATIONS),
    description: getRandomArrayElement(DESTINATIONS_DESCRIPTIONS),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random${getRandomInteger(1, 20)}`,
        description: '...was built in measureless eons behind history by the vast, loathsome shapes that seeped down from the dark stars.',
      }
    ],
  }
];

export { destinations };
