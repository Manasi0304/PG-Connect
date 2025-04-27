import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaFilter, FaMapMarkerAlt, FaRupeeSign, FaCheck } from "react-icons/fa";
import "./PropertyList.css";

function PropertyList() {
    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    
    // Updated filters to match actual property data structure
    const [filters, setFilters] = useState({
        location: "", // Changed from locality array to location string
        maxPrice: "", // Changed from budget to maxPrice for clarity
        tenantType: "",
        services: []
    });

    // List of possible values for dropdown filters
    const locations = ["Akurdi", "Aundh", "Balewadi", "Baner", "Dhankawadi", "Kondhwa"];
    const tenantTypes = ["Family", "Bachelor", "Student", "Working Professional", "Girls", "Boys"];
    const servicesList = ["Wifi", "AC", "Laundry", "Parking", "Gym", "Food", "Security", "Cleaning"];
    
    // Price ranges for the price filter
    const priceRanges = [
        { label: "Under ₹5,000", value: 5000 },
        { label: "Under ₹10,000", value: 10000 },
        { label: "Under ₹15,000", value: 15000 },
        { label: "Under ₹20,000", value: 20000 },
        { label: "Any Price", value: "" }
    ];

    // Fetch properties from the backend
    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/properties");
            setProperties(response.data);
            setFilteredProperties(response.data); // Initialize filtered properties
        } catch (error) {
            console.error("❌ Error fetching properties:", error);
        }
    };

    // Handle filter changes
    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => {
            // Handle special case for services (multi-select)
            if (filterType === "services") {
                // Toggle selection of service
                const updatedServices = prevFilters.services.includes(value)
                    ? prevFilters.services.filter(service => service !== value)
                    : [...prevFilters.services, value];
                
                return { ...prevFilters, services: updatedServices };
            }
            
            // Handle all other filter types
            return { ...prevFilters, [filterType]: value };
        });
    };

    // Apply filters
    const applyFilters = () => {
        const filtered = properties.filter(property => {
            // Location filter
            if (filters.location && property.location.toLowerCase().indexOf(filters.location.toLowerCase()) === -1) {
                return false;
            }
            
            // Price filter
            if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) {
                return false;
            }
            
            // Tenant type filter
            if (filters.tenantType && property.tenantType !== filters.tenantType) {
                return false;
            }
            
            // Services filter (ensure property has all selected services)
            if (filters.services.length > 0) {
                // If property doesn't have services array, or doesn't have all selected services
                if (!property.services || !filters.services.every(service => 
                    property.services.some(propService => 
                        propService.toLowerCase().includes(service.toLowerCase())
                    )
                )) {
                    return false;
                }
            }
            
            return true;
        });
        
        setFilteredProperties(filtered);
        setShowFilters(false); // Hide filters after applying
    };

    // Reset filters
    const resetFilters = () => {
        setFilters({
            location: "",
            maxPrice: "",
            tenantType: "",
            services: []
        });
        setFilteredProperties(properties);
        setShowFilters(false); // Hide filters after resetting
    };

    // Handle search
    useEffect(() => {
        if (search.trim() === "") {
            // If search is empty, just apply the current filters
            applyFilters();
            return;
        }
        
        const searchLower = search.toLowerCase();
        const searchResults = properties.filter(property =>
            property.title.toLowerCase().includes(searchLower) ||
            property.location.toLowerCase().includes(searchLower) ||
            (property.description && property.description.toLowerCase().includes(searchLower))
        );
        
        setFilteredProperties(searchResults);
    }, [search]);

    return (
        <div className="property-list">
            <h1>🌆 Live Where You Love – Find a PG</h1>
            
            {/* Search and Filter Section */}
            <div className="search-filter-container">
                <div className="search-wrapper">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by property name or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-bar"
                    />
                </div>
                
                <button 
                    className="filter-toggle-btn"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <FaFilter /> {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
            </div>
            
            {/* Advanced Filters Dropdown */}
            {showFilters && (
                <div id="filters-panel" className="filters-dropdown">
                    <div className="filters-grid">
                        {/* Location Filter */}
                        <div className="filter-group">
                            <label htmlFor="location-filter">Location</label>
                            <select 
                                id="location-filter"
                                value={filters.location}
                                onChange={(e) => handleFilterChange("location", e.target.value)}
                            >
                                <option value="">Any Location</option>
                                {locations.map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Price Filter */}
                        <div className="filter-group">
                            <label htmlFor="price-filter">Max Price</label>
                            <select 
                                id="price-filter"
                                value={filters.maxPrice}
                                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                            >
                                {priceRanges.map((range, index) => (
                                    <option key={index} value={range.value}>{range.label}</option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Tenant Type Filter */}
                        <div className="filter-group">
                            <label htmlFor="tenant-filter">Tenant Type</label>
                            <select 
                                id="tenant-filter"
                                value={filters.tenantType}
                                onChange={(e) => handleFilterChange("tenantType", e.target.value)}
                            >
                                <option value="">Any Tenant Type</option>
                                {tenantTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    {/* Services Filter */}
                    <div className="services-filter">
                        <label>Services</label>
                        <div className="services-options">
                            {servicesList.map(service => (
                                <div key={service} className="service-option">
                                    <input
                                        type="checkbox"
                                        id={`service-${service}`}
                                        checked={filters.services.includes(service)}
                                        onChange={() => handleFilterChange("services", service)}
                                    />
                                    <label htmlFor={`service-${service}`}>{service}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Filter Action Buttons */}
                    <div className="filter-actions">
                        <button onClick={applyFilters} className="apply-filters-btn" id="apply-filters-button">Apply Filters</button>
                        <button onClick={resetFilters} className="reset-filters-btn" id="reset-filters-button">Reset Filters</button>
                    </div>
                </div>
            )}
            
            {/* Active Filters Display */}
            {(filters.location || filters.maxPrice || filters.tenantType || filters.services.length > 0) && (
                <div id="active-filters-display" className="active-filters">
                    <span className="active-filters-label">Active Filters:</span>
                    
                    {filters.location && (
                        <div className="filter-tag">
                            Location: {filters.location}
                            <button onClick={() => handleFilterChange("location", "")} className="filter-tag-remove">×</button>
                        </div>
                    )}
                    
                    {filters.maxPrice && (
                        <div className="filter-tag">
                            Max Price: ₹{filters.maxPrice}
                            <button onClick={() => handleFilterChange("maxPrice", "")} className="filter-tag-remove">×</button>
                        </div>
                    )}
                    
                    {filters.tenantType && (
                        <div className="filter-tag">
                            Tenant: {filters.tenantType}
                            <button onClick={() => handleFilterChange("tenantType", "")} className="filter-tag-remove">×</button>
                        </div>
                    )}
                    
                    {filters.services.map(service => (
                        <div key={service} className="filter-tag">
                            {service}
                            <button onClick={() => handleFilterChange("services", service)} className="filter-tag-remove">×</button>
                        </div>
                    ))}
                    
                    <button onClick={resetFilters} className="clear-all-btn" id="clear-all-filters">
                        Clear All
                    </button>
                </div>
            )}
            
            {/* Results Count */}
            <div id="results-counter" className="results-count">
                Found {filteredProperties.length} properties
            </div>
            
            {/* Property Grid */}
            <div className="property-grid">
                {filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                        <div className="property-card" key={property._id}>
                            <div className="verified-badge">
                                <img src="/verified.png" alt="Verified" />
                            </div>

                            <img 
                                src={`http://localhost:5000${property.images[0]}`} 
                                alt={property.title} 
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/property-placeholder.jpg";
                                }}
                            />
                            
                            <div className="property-info">
                                <div className="property-details">
                                    <h3 className="property-title">{property.title}</h3>
                                    
                                    <p className="property-location">
                                        <FaMapMarkerAlt className="icon" /> {property.location}
                                    </p>
                                    
                                    <p className="property-price">
                                        <FaRupeeSign className="icon" /> {property.price.toLocaleString('en-IN')}
                                    </p>
                                    
                                    {property.rentingOption && (
                                        <p className="property-renting-option">
                                            <strong>Renting Option:</strong> {property.rentingOption}
                                        </p>
                                    )}
                                    
                                    {property.description && (
                                        <p className="property-description">
                                            <strong>Description:</strong> {property.description}
                                        </p>
                                    )}
                                    
                                    {property.services && property.services.length > 0 && (
                                        <div className="property-services">
                                            <strong>Services:</strong>
                                            <div className="services-tags">
                                                {property.services.map((service, index) => (
                                                    <span key={index} className="service-tag">
                                                        <FaCheck className="check-icon" /> {service}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="button-group">
                                    <a href={`tel:${property.contact || '1234'}`} className="call-btn">Call Now</a>
                                    <Link to={`/property/${property._id}`} className="call-btn">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-properties">
                        <img src="/no-results.svg" alt="No results" className="no-results-image" />
                        <p>Sorry, no stays found. Try adjusting your filters or search.</p>
                        <button onClick={resetFilters} className="reset-search-btn">Reset All Filters</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PropertyList;