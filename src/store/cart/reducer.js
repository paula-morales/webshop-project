import { ADD_PRODUCT, EMPTY_CART, REMOVE_PRODUCT } from "../types";

const initialState = [];

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCT: {
      return [...state, payload];
    }
    case EMPTY_CART: {
      return [];
    }
    case REMOVE_PRODUCT: {
      let newState = [...state];
      newState = newState.filter((productId) => productId !== payload);
      return newState;
    }
    default: {
      return state;
    }
  }
};
