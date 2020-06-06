import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartSelector, totalSelector } from "../store/cart/selectors";
import { selectProducts } from "../store/products/selectors";

function count(arr) {
  return arr.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );
}

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
  function handlerClick() {
    dispatch({
      type: "EMPTY_CART",
    });
  }

  return (
    <div>
      Your shopping cart:
      <div>
        {productsInCart.map((product) => {
          return (
            <p key={product.id}>
              {product.name} {findQuantity(product.id)}x€{product.price} ={" "}
              {findQuantity(product.id) * product.price}
            </p>
          );
        })}
        <p>Total:€{total}</p>
        <button onClick={handlerClick}>Empty cart</button>
      </div>
    </div>
  );
}
