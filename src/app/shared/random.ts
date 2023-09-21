export function randomNum(min = 1e9, max = 9e9) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomId(length = 10) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}
