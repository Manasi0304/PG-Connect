import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMars, FaVenus, FaRupeeSign, FaMapMarkerAlt, FaFilter, FaSearch } from "react-icons/fa";
import "./FindRoommates.css";

const FindRoommates = () => {
  const [roommates, setRoommates] = useState([]);
  const [filteredRoommates, setFilteredRoommates] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    gender: "",
    minAge: "",
    maxAge: "",
    minBudget: "",
    maxBudget: "",
    smoking: "",
    drinking: "",
    vegetarian: "",
    pets: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/find-roommate")
      .then((res) => res.json())
      .then((data) => {
        setRoommates(data);
        setFilteredRoommates(data);
      })
      .catch((error) => console.error("Error fetching roommates:", error));
  }, []);

  const applyFilters = () => {
    let filtered = roommates.filter((roommate) => {
      return (
        (!filters.location || roommate.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.gender || roommate.gender === filters.gender) &&
        (!filters.minAge || roommate.age >= Number(filters.minAge)) &&
        (!filters.maxAge || roommate.age <= Number(filters.maxAge)) &&
        (!filters.minBudget || roommate.budget >= Number(filters.minBudget)) &&
        (!filters.maxBudget || roommate.budget <= Number(filters.maxBudget)) &&
        (!filters.smoking || roommate.smoking === filters.smoking) &&
        (!filters.drinking || roommate.drinking === filters.drinking) &&
        (!filters.vegetarian || roommate.vegetarian === filters.vegetarian) &&
        (!filters.pets || roommate.pets === filters.pets)
      );
    });

    setFilteredRoommates(filtered);
    if (window.innerWidth < 800) {
      setIsFilterVisible(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      gender: "",
      minAge: "",
      maxAge: "",
      minBudget: "",
      maxBudget: "",
      smoking: "",
      drinking: "",
      vegetarian: "",
      pets: "",
    });
    setFilteredRoommates(roommates);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="fr-roommates-page">
      <div className="fr-roommates-container">
        <div className="fr-page-header">
          <h2>Find Housemates & Roommates in Pune, Maharashtra</h2>
          <p className="fr-subtitle">Connect with compatible roommates in your preferred location</p>
        </div>

        <div className="fr-search-bar">
          <div className="fr-search-input">
            <FaSearch className="fr-search-icon" />
            <input 
              type="text" 
              name="location" 
              placeholder="Search by location..." 
              value={filters.location} 
              onChange={handleFilterChange} 
            />
          </div>
          <button className="fr-filter-toggle" onClick={toggleFilterVisibility}>
            <FaFilter /> {isFilterVisible ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {isFilterVisible && (
          <div className="fr-filters-container">
            <div className="fr-filters">
              <div className="fr-filter-row">
                <div className="fr-filter-group">
                  <label>Gender</label>
                  <select name="gender" value={filters.gender} onChange={handleFilterChange}>
                    <option value="">Any</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="fr-filter-group fr-age-group">
                  <label>Age Range</label>
                  <div className="fr-filter-range">
                    <input type="number" name="minAge" placeholder="Min" value={filters.minAge} onChange={handleFilterChange} />
                    <span>to</span>
                    <input type="number" name="maxAge" placeholder="Max" value={filters.maxAge} onChange={handleFilterChange} />
                  </div>
                </div>

                <div className="fr-filter-group fr-budget-group">
                  <label>Budget (₹)</label>
                  <div className="fr-filter-range">
                    <input type="number" name="minBudget" placeholder="Min" value={filters.minBudget} onChange={handleFilterChange} />
                    <span>to</span>
                    <input type="number" name="maxBudget" placeholder="Max" value={filters.maxBudget} onChange={handleFilterChange} />
                  </div>
                </div>
              </div>

              <div className="fr-filter-row">
                <div className="fr-filter-group">
                  <label>Smoking</label>
                  <select name="smoking" value={filters.smoking} onChange={handleFilterChange}>
                    <option value="">Any</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Occasionally">Occasionally</option>
                  </select>
                </div>

                <div className="fr-filter-group">
                  <label>Drinking</label>
                  <select name="drinking" value={filters.drinking} onChange={handleFilterChange}>
                    <option value="">Any</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Occasionally">Occasionally</option>
                  </select>
                </div>

                <div className="fr-filter-group">
                  <label>Vegetarian</label>
                  <select name="vegetarian" value={filters.vegetarian} onChange={handleFilterChange}>
                    <option value="">Any</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="fr-filter-group">
                  <label>Pets</label>
                  <select name="pets" value={filters.pets} onChange={handleFilterChange}>
                    <option value="">Any</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="fr-filter-buttons">
              <button className="fr-apply-btn" onClick={applyFilters}>Apply Filters</button>
              <button className="fr-clear-btn" onClick={clearFilters}>Clear All</button>
            </div>
          </div>
        )}

        <div className="fr-results-info">
          <p>{filteredRoommates.length} potential roommates found</p>
        </div>

        <div className="fr-roommate-list">
          {filteredRoommates.length === 0 ? (
            <div className="fr-no-results">
              <h3>No matching roommates found</h3>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            filteredRoommates.map((roommate) => (
              <div key={roommate._id} className="fr-roommate-card">
                <div className="fr-card-left">
                  <img
                    src={`http://localhost:5000/${roommate.profilePhoto}`}
                    alt={roommate.name}
                    className="fr-roommate-photo"
                    onError={(e) => { e.target.src = "/profile.png"; }}
                  />
                </div>
                <div className="fr-card-right">
                  <div className="fr-roommate-header">
                    <h3>{roommate.name}</h3>
                    <div className="fr-roommate-identifiers">
                      <span className="fr-roommate-age">{roommate.age} years</span>
                      <span className="fr-roommate-gender">
                        {roommate.gender === "Male" ? <FaMars className="fr-gender-icon-male" /> : <FaVenus className="fr-gender-icon-female" />}
                        {roommate.gender}
                      </span>
                    </div>
                  </div>
                  
                  <div className="fr-roommate-details">
                    <p className="fr-roommate-budget">
                      <FaRupeeSign className="fr-rupee-icon" />
                      Budget: ₹{roommate.budget}
                    </p>
                    <p className="fr-roommate-location">
                      <FaMapMarkerAlt className="fr-location-icon" />
                      {roommate.location}
                    </p>
                  </div>
                  
                  <p className="fr-roommate-bio">{roommate.bio}</p>
                  
                  <div className="fr-card-footer">
                    <Link to={`/roommate/${roommate._id}`} className="fr-profile-link">
                      View Full Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FindRoommates;