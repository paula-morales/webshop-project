export const selectProducts = (state) => {
  return state.products;
};

export const selectTags = (state) => {
  const allTags = state.products.map((product) => product.tags);
  return [...new Set(allTags.flat(1))];
};
