const initialState = [];

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_PRODUCT": {
      return [...state, payload];
    }
    case "EMPTY_CART": {
      return [];
    }
    case "REMOVE_PRODUCT": {
      const newState = [...state];
      newState.splice(newState.indexOf(payload), 1);
      return newState;
    }
    default: {
      return state;
    }
  }
};
