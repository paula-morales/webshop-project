import React from "react";
import { Link } from "react-router-dom";

const compare_price = (product_a, product_b) => {
  return product_a.price - product_b.price;
};
const compare_popularity = (product_a, product_b) => {
  return product_b.popular - product_a.popular;
};
export default function ProductCard(props) {
  const { sortBy, products } = props;

  if (sortBy === "price") {
    products.sort(compare_price);
  } else {
    products.sort(compare_popularity);
  }

  return (
    <div className="flex-container">
      {products.map((product) => {
        return (
          <div key={product.id} className="flex-item">
            <img
              src={product.img}
              alt={product.name}
              style={{ width: "300px" }}
            />
            <p>
              <Link to={`/productpage/${product.id}`}>
                <strong>{product.name}</strong>
              </Link>
              {product.tags.map((tag) => {
                return (
                  <label className="Tag" key={tag}>
                    {tag}
                  </label>
                );
              })}
              <span>
                €{product.price} add to Cart:
                <button>+</button>
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
