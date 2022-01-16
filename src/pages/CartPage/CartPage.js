import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, totalSelector } from "../../store/cart/selectors";
import { selectProducts } from "../../store/products/selectors";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../store/cart/actions";
import { EMPTY_CART } from "../../store/types";
import "./CartPage.scss";
import { Link } from "react-router-dom";

export default function CartPage() {
  const cart = useSelector(selectCart);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const total = useSelector(totalSelector);

  const productsInCart = products.filter((product) => {
    return cart.find((id) => {
      return parseInt(id) === product.id;
    });
  });

  function findQuantity(productId, price) {
    const quantity = cart.filter((v) => v === productId).length;
    return `${quantity} x €${price} = €${quantity * price}`;
  }

  function handlerClickEmptyCart() {
    dispatch({
      type: EMPTY_CART,
    });
  }

  function handlerClickAddProduct(productId) {
    dispatch(addProductToCart(productId));
  }

  function handlerClickRemoveProduct(productId) {
    dispatch(removeProductFromCart(productId));
  }

  return (
    <div className="CartPage d-flex mt-5 mb-4 flex-wrap">
      <div className="col-12 justify-content-end d-flex px-3 mb-3">
        <button
          className="btn btn-primary"
          onClick={handlerClickEmptyCart}
          disabled={productsInCart.length === 0}
        >
          <i className="bi bi-cart-x-fill"></i> Empty cart
        </button>
      </div>

      <p className=" col-3 d-flex justify-content-end px-4 mt-2">
        {productsInCart.length > 0 && "Your shopping cart"}
      </p>

      <div className="col-9">
        {productsInCart.map((product) => {
          return (
            <p key={product.id}>
              {product.name}
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => handlerClickRemoveProduct(product.id)}
              >
                <i className="bi bi-dash-lg"></i>
              </button>
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => handlerClickAddProduct(product.id)}
              >
                <i className="bi bi-plus-lg"></i>
              </button>
              <span>{findQuantity(product.id, product.price)}</span>
            </p>
          );
        })}
        {productsInCart.length === 0 ? (
          <p>
            Your shopping cart is empty. <Link to="/">Let's buy!</Link>
          </p>
        ) : (
          <p>Total:€{total}</p>
        )}
      </div>
    </div>
  );
}
