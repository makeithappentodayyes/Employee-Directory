import React, { useContext } from "react";
import UserContext from "../utils/userContext";
import "../styles/SearchBox.css";

function SearchBox() {
  const { handleSearchChange, handleDOBSort } = useContext(UserContext);
  return (
    <div className="searchbox">
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={e => handleSearchChange(e)}
        />
        <button className="btn my-2 my-sm-0" type="submit" onClick={e => handleDOBSort(e)}>
          Search
        </button>
      </form>
    </div>
  );
};
export default SearchBox;
