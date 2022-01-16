export const selectCart = (state) => {
  return state.cart;
};

export const totalSelector = (state) => {
  const cart = state.cart;
  const products = state.products;

  let total = 0;
  cart.map((cartProductId) =>
    products.forEach((product) => {
      if (parseInt(cartProductId) === product.id) {
        return (total += product.price);
      }
    })
  );
  return total;
};
