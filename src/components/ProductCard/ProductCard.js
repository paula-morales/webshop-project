import React, { useState } from "react";

import "./ProductCard.scss";

export default function ProductCards(props) {
  const { product, productInCart } = props;
  const [anim, setAnim] = useState(false);

  function handlerClick(productId) {
    props.handlerClick(productId);
    setAnim(true);
    setTimeout(() => {
      setAnim(false);
    }, 1000);
  }

  return (
    <div className="col-lg-4 col-md-6 col-12 px-2 d-flex flex-column ProductCard position-relative mb-5">
      <p
        className={`ProductCard__badge text-white text-uppercase fw-bolder ${
          anim ? "visible" : "hidden"
        }`}
      >
        {productInCart ? "Added! 😄" : "Removed! 😞"}
      </p>

      <div className="ProductCard__add position-absolute fw-bolder">
        <button
          className="px-3 py-2 bg-white border-0 ButtonAdd"
          onClick={() => handlerClick(product.id)}
          disabled={anim}
        >
          <i className={productInCart ? "bi bi-dash" : "bi bi-plus"}></i>
        </button>
      </div>
      <div className="ProductCard__image">
        <img src={product.picture_url} alt={product.title} />
        <p className="ProductCard__price bg-white  px-3 py-2">
          €{product.price}
        </p>
      </div>
      <div className="d-flex align-items-center m-3 justify-content-between ">
        <p
          className={`ProductCard__title fw-bold text-uppercase mb-0 ${
            anim ? "bounce" : ""
          }`}
        >
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
