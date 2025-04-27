// src/pages/NewPropertyDetails.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./NewPropertyDetails.css";

function NewPropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/property/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setProperty(response.data);
        setSelectedImage(response.data.images[0]); // Default to first image
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching property details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="npd-loading-container">
        <div className="npd-loader"></div>
        <p>Loading property details...</p>
      </div>
    );
  }

  if (!property) return <div className="npd-error-message">Property not found</div>;

  return (
    <div className="npd-container" id="property-details-page">
      <div className="npd-details">
        <div className="npd-header">
          <h1 className="npd-title">{property.title}</h1>
          <div className="npd-location">
            <span className="npd-location-icon">📍</span> {property.location}
          </div>
        </div>

        <div className="npd-images">
          <div className="npd-main-image-container">
            <img
              src={`http://localhost:5000${selectedImage}`}
              alt="Selected"
              className="npd-main-image"
            />
          </div>
          <div className="npd-thumbnails">
            {property.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:5000${img}`}
                alt="Property"
                className={`npd-thumbnail ${selectedImage === img ? "npd-active" : ""}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="npd-info">
          <div className="npd-price-badge">
            <span className="npd-price-icon">💰</span> ${property.price.toLocaleString()}
          </div>

          <div className="npd-info-section">
            <h2 className="npd-section-title">Description</h2>
            <p className="npd-description">{property.description}</p>
          </div>

          <div className="npd-details-grid">
            <div className="npd-detail-item">
              <h3 className="npd-detail-title">Tenant Type</h3>
              <p className="npd-detail-value">{property.tenantType}</p>
            </div>
            <div className="npd-detail-item">
              <h3 className="npd-detail-title">Renting Option</h3>
              <p className="npd-detail-value">{property.rentingOption}</p>
            </div>
          </div>

          <div className="npd-services-section">
            <h2 className="npd-section-title">Services Included</h2>
            {property.services.length > 0 ? (
              <ul className="npd-services-list">
                {property.services.map((service, index) => (
                  <li key={index} className="npd-service-item">
                    <span className="npd-service-icon">✓</span> {service}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="npd-no-services">No additional services included</p>
            )}
          </div>

          <div className="npd-action-buttons">
            <button className="npd-contact-button" id="contact-owner-btn">Contact Owner</button>
            <button className="npd-save-button" id="save-property-btn">Save Property</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPropertyDetails;