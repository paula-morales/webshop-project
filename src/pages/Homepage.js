import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { selectTags } from "../store/products/selectors";
import { useSelector } from "react-redux";
import { selectProducts } from "../store/products/selectors";
import Axios from "axios";

export default function Homepage() {
  const [sortBy, setSortBy] = useState("price");
  const [filters, setFilters] = useState({});
  const tags = useSelector(selectTags);
  const products = useSelector(selectProducts);

  function handleClick(e) {
    const tagChosen = e.target.value;
    const newFilters = { ...filters, [tagChosen]: !filters[tagChosen] };
    setFilters(newFilters);
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

  // async function getProducts() {
  //   const url =
  //     "https://my-json-server.typicode.com/paula-morales/API-webshop-project";
  //   const response = await Axios.get(url);
  //   console.log(response.data);
  // }
  // getProducts();

  return (
    <div>
      <div className="wrap-filters">
        <div>
          filter by tag:
          {tags.map((tag, i) => {
            return (
              <span key={i}>
                <label className="Tag">{tag}</label>
                <input
                  type="checkbox"
                  value={tag}
                  name={tag}
                  onClick={handleClick}
                />{" "}
              </span>
            );
          })}
        </div>
        <div>
          sort by:
          <select
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option default value="price">
              Price
            </option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>
      <ProductCard sortBy={sortBy} products={productsWithFilter} />
    </div>
  );
}
