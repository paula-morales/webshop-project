import db from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import { FETCH_PRODUCT } from "../types";

export function productsFetched(payload) {
  return {
    type: FETCH_PRODUCT,
    payload,
  };
}

export async function fetchProducts(dispatch, getState) {
  const productsCol = collection(db, "products");
  const productsSnapshot = await getDocs(productsCol);
  const productsList = productsSnapshot.docs.map((doc) => doc.data());
  dispatch(productsFetched(productsList));
}
