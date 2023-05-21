function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomPositiveInteger(min = 0, max = 1) {
  const lower = Math.abs(Math.min(min, max));
  const upper = Math.abs(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { getRandomArrayElement, getRandomPositiveInteger, capitalizeFirstLetter };
