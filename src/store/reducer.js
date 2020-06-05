import { combineReducers } from "redux";
import { productSlider } from "./products/reducer";
import { cartReducer } from "./cart/reducer";

const reducer = combineReducers({
  products: productSlider,
  cart: cartReducer,
});

export default reducer;
