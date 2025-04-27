import React, { useState } from "react";
import "./PropertyFilters.css";

function PropertyFilters({ filters, setFilters, onApplyFilters }) {
    const [showLocality, setShowLocality] = useState(false);
    const [showTenantType, setShowTenantType] = useState(false);
    const [showAmenities, setShowAmenities] = useState(false);

    const allLocalities = ["Akurdi", "Aundh", "Balewadi", "Baner", "Dhankawadi"];
    const allTenantTypes = ["Girls", "Boys", "Family", "Working Professionals"];
    const allAmenities = ["Mess", "Gym", "Swimming Pool", "Security"];

    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const handleBudgetChange = (e) => {
        const value = Math.max(0, e.target.value);
        handleFilterChange("budget", value);
    };

    const handleApply = () => {
        onApplyFilters(filters);
    };

    const handleClearFilters = () => {
        const cleared = {
            locality: [],
            budget: "",
            tenantType: [],
            services: [],
        };
        setFilters(cleared);
        onApplyFilters({});
    };

    return (
        <>
        
            <div className="filter-section">
                {/* Locality Filter */}
                <div className={`filter-box ${showLocality ? "active" : ""}`}>
                    <div className="filter-header" onClick={() => setShowLocality(!showLocality)}>
                        Locality <span>{showLocality ? "▲" : "▼"}</span>
                    </div>
                    {showLocality && (
                        <div className="filter-body">
                            {allLocalities.map((locality, index) => (
                                <div key={index} className="filter-option">
                                    <input
                                        type="checkbox"
                                        id={`locality-${index}`}
                                        checked={filters?.locality?.includes(locality)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                handleFilterChange("locality", [...(filters.locality || []), locality]);
                                            } else {
                                                handleFilterChange(
                                                    "locality",
                                                    filters.locality.filter((loc) => loc !== locality)
                                                );
                                            }
                                        }}
                                    />
                                    <label htmlFor={`locality-${index}`}>{locality}</label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tenant Type Filter */}
                <div className={`filter-box ${showTenantType ? "active" : ""}`}>
                    <div className="filter-header" onClick={() => setShowTenantType(!showTenantType)}>
                        Tenant Type <span>{showTenantType ? "▲" : "▼"}</span>
                    </div>
                    {showTenantType && (
                        <div className="filter-body">
                            {allTenantTypes.map((type, index) => (
                                <div key={index} className="filter-option">
                                    <input
                                        type="checkbox"
                                        id={`tenant-${index}`}
                                        checked={filters?.tenantType?.includes(type)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                handleFilterChange("tenantType", [...(filters.tenantType || []), type]);
                                            } else {
                                                handleFilterChange(
                                                    "tenantType",
                                                    filters.tenantType.filter((t) => t !== type)
                                                );
                                            }
                                        }}
                                    />
                                    <label htmlFor={`tenant-${index}`}>{type}</label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Budget Input */}
                <div className="filter-box ">
                    <input
                        type="number"
                        placeholder="Max Budget (₹)"
                        min="0"
                        value={filters?.budget || ""}
                        onChange={handleBudgetChange}
                        className="budget-input"
                    />
                </div>

                {/* Amenities Filter */}
                <div className={`filter-box ${showAmenities ? "active" : ""}`}>
                    <div className="filter-header" onClick={() => setShowAmenities(!showAmenities)}>
                        Amenities <span>{showAmenities ? "▲" : "▼"}</span>
                    </div>
                    {showAmenities && (
                        <div className="filter-body">
                            {allAmenities.map((amenity, index) => (
                                <div key={index} className="filter-option">
                                    <input
                                        type="checkbox"
                                        id={`amenity-${index}`}
                                        checked={filters?.services?.includes(amenity)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                handleFilterChange("services", [...(filters.services || []), amenity]);
                                            } else {
                                                handleFilterChange(
                                                    "services",
                                                    filters.services.filter((a) => a !== amenity)
                                                );
                                            }
                                        }}
                                    />
                                    <label htmlFor={`amenity-${index}`}>{amenity}</label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Buttons BELOW filter section */}
            <div className="filter-button-wrapper">
                <button className="apply-button" onClick={handleApply}>
                    Apply Filters
                </button>
                <button className="clear-button" onClick={handleClearFilters}>
                    Clear Filters
                </button>
            </div>
        </>
    );
}

export default PropertyFilters;
