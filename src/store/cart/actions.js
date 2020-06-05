export function addProductToCart(id) {
  return {
    type: "ADD_PRODUCT",
    payload: id,
  };
}
