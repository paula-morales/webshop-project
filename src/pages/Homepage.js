import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectTags } from "../store/products/selectors";
import { selectProducts } from "../store/products/selectors";
import { fetchProducts } from "../store/products/actions";
import Filters from "../components/Filters/Filters";
import ProductCards from "../components/ProductCards/ProductCards";
import Loading from "../components/Loading/Loading";

export default function Homepage() {
  const [sortBy, setSortBy] = useState("price");
  const [filters, setFilters] = useState({});
  const tags = useSelector(selectTags);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

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

  return (
    <div className="Homepage">
      {products ? (
        <>
          {" "}
          <Filters
            tags={tags}
            onClick={handleClick}
            handleOnChange={handleOnChange}
          />
          <ProductCards sortBy={sortBy} products={productsWithFilter} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
