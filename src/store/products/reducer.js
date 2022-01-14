import { FETCH_PRODUCT } from "../types";

const initialState = [];

export const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCT: {
      return [...state, ...payload];
    }
    default: {
      return state;
    }
  }
};
