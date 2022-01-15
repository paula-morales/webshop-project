import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../store/cart/actions";
import { cartSelector } from "../../store/cart/selectors";
import "./ProductCards.scss";

const compare_price = (product_a, product_b) => {
  return product_a.price - product_b.price;
};
const compare_popularity = (product_a, product_b) => {
  return product_b.times_bought - product_a.times_bought;
};

export default function ProductCards(props) {
  const { sortBy, products } = props;
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);

  if (sortBy === "price") {
    products.sort(compare_price);
  } else {
    products.sort(compare_popularity);
  }

  function handlerClick(productId) {
    if (cart.includes(productId.toString())) {
      dispatch(removeProductFromCart(productId));
    } else {
      dispatch(addProductToCart(productId));
    }
  }

  function getCard(product) {
    return (
      <div
        key={product.id}
        className="col-lg-4 col-md-6 col-12 px-2 d-flex flex-column ProductCard__wrapper position-relative mb-5"
      >
        <div className="ProductCard__add position-absolute fw-bolder">
          <button
            className="px-3 py-2 bg-white  border-0 ButtonAdd"
            onClick={() => handlerClick(product.id)}
          >
            <i
              className={
                cart.includes(product.id.toString())
                  ? "bi bi-dash"
                  : "bi bi-plus"
              }
            ></i>
          </button>
        </div>
        <div className="ProductCard__image">
          <img src={product.picture_url} alt={product.title} />
          <p className="ProductCard__price bg-white  px-3 py-2">
            €{product.price}
          </p>
        </div>
        <div className="d-flex align-items-center m-3 justify-content-between ">
          <p className="ProductCard__title  fw-bold text-uppercase mb-0">
            {product.title}
          </p>
          <div className="Tags__wrapper ms-3">
            {product.tags.map((tag) => {
              return (
                <label className="Tag" key={tag}>
                  {tag}
                </label>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ProductCard d-flex flex-wrap py-5">
      {products.map((product) => getCard(product))}
    </div>
  );
}
