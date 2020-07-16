export function count(arr) {
  return arr.reduce(
    // eslint-disable-next-line
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );
}
