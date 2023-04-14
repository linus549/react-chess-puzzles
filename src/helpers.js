export function getRandomElements(array, count) {
  const source = [...array];
  const result = [];

  if (count > source.length) {
    count = source.length;
  }

  while (result.length < count) {
    const randomIndex = Math.floor(Math.random() * source.length);
    result.push(source[randomIndex]);
    source.splice(randomIndex, 1);
  }

  return result;
}

export function range(start, end) {
  const result = [];

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
}

export function inRange(value, min, max) {
  return value >= min && value <= max;
}
