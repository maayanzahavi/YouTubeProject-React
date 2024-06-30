// Searchbar component
import React, { useRef } from 'react';
import './Sidebar/Sidebar.css';
import SearchIcon from '../../assets/icons/SearchIcon';

function SearchBar({ doSearch }) {
  // Handle searching
  const searchBox = useRef(null);
  const search = function () {
    if (doSearch) {
      doSearch(searchBox.current.value);
    }
  };

  return (
    <div className="search-bar-input">
      <input ref={searchBox} onKeyUp={search} type="text" placeholder="Search" className="search-bar" />
      <button className="search-button" onClick={search}>
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchBar;
