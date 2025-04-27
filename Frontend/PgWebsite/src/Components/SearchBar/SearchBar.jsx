// SearchBar.jsx
import React from "react";
import "./SearchBar.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const SearchBar = ({ placeholder, onSearch }) => {
  return (
    <div className="search-bar1">
      <FaMapMarkerAlt className="location-icon1" />
      <input 
        type="text" 
        placeholder={placeholder || "Enter location"} 
        className="search-input1"
      />
      <button className="search-button1" onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
