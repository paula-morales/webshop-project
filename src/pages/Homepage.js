import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectTags } from "../store/products/selectors";
import { selectProducts } from "../store/products/selectors";
import { fetchProducts } from "../store/products/actions";
import Filters from "../components/Filters/Filters";
import ProductCard from "../components/ProductCard/ProductCard";

export default function Homepage() {
  const [sortBy, setSortBy] = useState("price");
  const [filters, setFilters] = useState({});
  const tags = useSelector(selectTags);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts);
  }, [dispatch]);

  function handleClick(tag) {
    console.log("on click ", tag);

    const tagChosen = tag;
    const newFilters = { ...filters, [tagChosen]: !filters[tagChosen] };
    setFilters(newFilters);
  }

  function handleOnChange(newSortBy) {
    setSortBy(newSortBy);
    console.log("on change ", newSortBy);
  }

  let productsWithFilter;
  const filterKeys = Object.keys(filters); //all the keys of the object filters
  const filterTags = filterKeys.filter((tag) => filters[tag]); //only returns keys with true value
  if (!filterTags.length) {
    productsWithFilter = products;
  } else {
    productsWithFilter = products.filter((product) => {
      return product.tags.some((tag) => filterTags.includes(tag));
    });
  }

  return (
    <div className="homepage">
      <Filters
        tags={tags}
        onClick={handleClick}
        handleOnChange={handleOnChange}
      />
      <ProductCard sortBy={sortBy} products={productsWithFilter} />
    </div>
  );
}
