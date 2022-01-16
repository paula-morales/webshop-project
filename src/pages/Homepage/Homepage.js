import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectTags } from "../../store/products/selectors";
import { selectProducts } from "../../store/products/selectors";
import { fetchProducts } from "../../store/products/actions";
import Filters from "../../components/Filters/Filters";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loading from "../../components/Loading/Loading";
import { selectCart } from "../../store/cart/selectors";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../store/cart/actions";

const compare_price = (product_a, product_b) => {
  return product_a.price - product_b.price;
};
const compare_popularity = (product_a, product_b) => {
  return product_b.times_bought - product_a.times_bought;
};

export default function Homepage() {
  const [sortBy, setSortBy] = useState("price");
  const [filters, setFilters] = useState({});

  const tags = useSelector(selectTags);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts);
  }, [dispatch, products.length]);

  function handleClick(tag) {
    const chosenTag = tag;
    const newFilters = { ...filters, [chosenTag]: !filters[chosenTag] };
    setFilters(newFilters);
  }

  function handleOnChange(newSortBy) {
    setSortBy(newSortBy);
  }

  let productsWithFilter;
  const filterKeys = Object.keys(filters);
  const filterTags = filterKeys.filter((tag) => filters[tag]); //only returns keys with true value
  if (!filterTags.length) {
    productsWithFilter = products;
  } else {
    productsWithFilter = products.filter((product) => {
      return product.tags.some((tag) => filterTags.includes(tag));
    });
  }

  if (sortBy === "price") {
    products.sort(compare_price);
  } else {
    products.sort(compare_popularity);
  }

  function onClickProduct(productId) {
    if (cart.includes(productId)) {
      dispatch(removeProductFromCart(productId));
    } else {
      dispatch(addProductToCart(productId));
    }
  }

  return (
    <div className="Homepage">
      {products.length > 0 ? (
        <>
          {" "}
          <Filters
            tags={tags}
            onClick={handleClick}
            handleOnChange={handleOnChange}
          />
          <div className="ProductCards d-flex flex-wrap py-5">
            {productsWithFilter.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                productInCart={cart.includes(product.id)}
                handlerClick={onClickProduct}
              />
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
