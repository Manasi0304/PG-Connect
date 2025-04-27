import React from "react";
import { Link } from "react-router-dom";
import "./RoommateFinderHome.css";

const RoommateFinderHome = () => {
  return (
    <div className="roommate-home-container">
      <h1>Roommate Finder</h1>
      <div className="roommate-home-buttons">
        <Link to="/roommate-finder/register" className="btn">➕ Register as Roommate</Link>
        <Link to="/roommate-finder/find" className="btn">Find Roommate</Link>
      </div>
    </div>
  );
};

export default RoommateFinderHome;
