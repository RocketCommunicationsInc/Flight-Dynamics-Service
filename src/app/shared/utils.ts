export const capitalize = (str: string) => {
  if (!str) return;
  let arr = str.split('-');
  let capitalized = arr.map(
    (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
  );
  return capitalized.join(' ');
};
