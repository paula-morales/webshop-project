import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartSelector, totalSelector } from "../store/cart/selectors";
import { selectProducts } from "../store/products/selectors";
import { addProductToCart, removeProductFromCart } from "../store/cart/actions";
import { count } from "../_config";
import { EMPTY_CART } from "../store/types";

export default function CartPage() {
  const cart = useSelector(cartSelector);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const cartQuantity = count(cart);
  const total = useSelector(totalSelector);

  const productsInCart = products.filter((product) => {
    return cart.find((id) => {
      return parseInt(id) === product.id;
    });
  });

  function findQuantity(productid) {
    for (const key in cartQuantity) {
      if (parseInt(key) === productid) {
        return cartQuantity[key];
      }
    }
  }
  function handlerClickEmptyCart() {
    dispatch({
      type: EMPTY_CART,
    });
  }

  function handlerClickAddProduct(event) {
    dispatch(addProductToCart(event.target.value));
  }

  function handlerClickRemoveProduct(event) {
    dispatch(removeProductFromCart(event.target.value));
  }
  return (
    <div>
      Your shopping cart:
      <div>
        {productsInCart.map((product) => {
          return (
            <p key={product.id}>
              {product.name}
              <button value={product.id} onClick={handlerClickAddProduct}>
                +
              </button>
              <button value={product.id} onClick={handlerClickRemoveProduct}>
                -
              </button>
              {findQuantity(product.id)}x€{product.price} ={" "}
              {findQuantity(product.id) * product.price}
            </p>
          );
        })}
        <p>Total:€{total}</p>
        <button onClick={handlerClickEmptyCart}>Empty cart</button>
      </div>
    </div>
  );
}
