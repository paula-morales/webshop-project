import { ADD_PRODUCT, REMOVE_PRODUCT } from "../types";

export function addProductToCart(id) {
  return {
    type: ADD_PRODUCT,
    payload: id,
  };
}

export function removeProductFromCart(id) {
  return {
    type: REMOVE_PRODUCT,
    payload: id,
  };
}
