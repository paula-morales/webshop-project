export const selectProducts = (state) => {
  return state.products;
};

//get list of tags
export const selectTags = (state) => {
  const arrayOfTags = state.products.map((product) => {
    return product.tags;
  });
  return [...new Set(arrayOfTags.flat(1))];
};
