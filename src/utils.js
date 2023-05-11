function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getRandomArrayElement, getRandomNumber };
