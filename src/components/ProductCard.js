import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, removeProductFromCart } from "../store/cart/actions";
import { cartSelector } from "../store/cart/selectors";
import { count } from "../_config";

const compare_price = (product_a, product_b) => {
  return product_a.price - product_b.price;
};
const compare_popularity = (product_a, product_b) => {
  return product_b.popular - product_a.popular;
};

export default function ProductCard(props) {
  const { sortBy, products } = props;
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const cartQuantity = count(cart);
  if (sortBy === "price") {
    products.sort(compare_price);
  } else {
    products.sort(compare_popularity);
  }

  function handlerClick(e) {
    dispatch(addProductToCart(e.target.value));
  }

  function handlerClickRemoveProduct(event) {
    dispatch(removeProductFromCart(event.target.value));
  }

  function findQuantity(productid) {
    for (const key in cartQuantity) {
      if (parseInt(key) === productid) {
        return cartQuantity[key];
      }
    }
  }

  return (
    <div className="flex-container">
      {products.map((product) => {
        return (
          <div key={product.id} className="flex-item">
            <img
              src={product.img}
              alt={product.name}
              style={{ width: "200px", height: "200px" }}
            />
            <p>
              <Link to={`/productpage/${product.id}`}>
                <strong>{product.name}</strong>
              </Link>{" "}
              €{product.price}
            </p>
            <p>
              {product.tags.map((tag) => {
                return (
                  <label className="Tag" key={tag}>
                    {tag}
                  </label>
                );
              })}
            </p>
            <p>
              add to Cart:
              {cart.includes(product.id.toString()) ? (
                <p>
                  <button
                    value={product.id}
                    onClick={handlerClickRemoveProduct}
                  >
                    -
                  </button>{" "}
                  {findQuantity(product.id)} in cart
                  <button value={product.id} onClick={handlerClick}>
                    +{" "}
                  </button>
                </p>
              ) : (
                <button value={product.id} onClick={handlerClick}>
                  +{" "}
                </button>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
