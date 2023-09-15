export function random(min = 1e9, max = 9e9) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
