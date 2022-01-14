import React from "react";
import "./Filters.scss";

export default function Filters(props) {
  const { tags } = props;

  function onClickHandler(event) {
    props.onClick(event.target.value);
  }

  function handleOnChange(event) {
    props.handleOnChange(event.target.value);
  }

  function getTags(tag, i) {
    return (
      <div key={i + tag} className="form-check">
        <label className="form-check-label" htmlFor={i}>
          {tag}
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          id={i}
          value={tag}
          name={tag}
          onClick={onClickHandler}
        />
      </div>
    );
  }

  return (
    <div className="Filters d-flex justify-content-between flex-wrap mx-md-5 mx-3 my-2 my-md-4">
      <div className="Filters__tags col-12 col-md-9 d-flex align-items-center">
        <p className="col-2 mb-0">Filter by tag</p>
        <div className="d-flex flex-wrap Tags-container">
          {tags.map((tag, i) => getTags(tag, i))}
        </div>
      </div>
      <div className="Filters__sort-by col-12 col-md-3 d-flex align-items-center">
        <p className="col-4 mb-0 text-end">Sort by</p>
        <select onChange={handleOnChange} className="form-control">
          <option default value="price">
            Price
          </option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
    </div>
  );
}
