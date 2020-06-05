const initialState = [];

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_PRODUCT": {
      return [...state, payload];
    }
    default: {
      return state;
    }
  }
};
