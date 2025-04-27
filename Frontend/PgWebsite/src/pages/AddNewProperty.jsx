// src/pages/AddNewProperty.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddNewProperty.css";

function AddNewProperty() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    images: [],
    tenantType: "",
    rentingOption: "",
    services: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "images") {
      const files = [...e.target.files];
      setFormData({
        ...formData,
        images: files,
      });
      
      // Create preview URLs for images
      const previews = files.map(file => URL.createObjectURL(file));
      setPreviewImages(previews);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const data = new FormData();
    
    for (let key in formData) {
      if (key === "images") {
        formData.images.forEach((image) => data.append("images", image));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const token = localStorage.getItem("token");
      
      // Check if token is expired
      if (!token || checkTokenExpiry(token)) {
        console.log("🚨 Token expired! Please log in again.");
        alert("❌ Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      
      await axios.post("http://localhost:5000/api/properties", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": token,
        },
      });
      
      alert("✅ Property added successfully!");
      navigate("/");
    } catch (error) {
      console.error("❌ Error adding property:", error);
      alert("❌ Failed to add property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const checkTokenExpiry = (token) => {
    if (!token) return true; // Token is missing
    
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode payload
    const expiry = decodedToken.exp; // Expiration timestamp
    const now = Math.floor(Date.now() / 1000); // Current timestamp
    
    return expiry < now; // Returns true if expired
  };
  
  const handleCancel = () => {
    navigate("/");
  };
  
  return (
    <div className="add-property-container" id="add-property-page">
      <div className="content-wrapper">
        {/* Text Section */}
        <div className="background-text">
          <h1 className="title-heading">List Your Property</h1>
          <p className="subtitle-text">Turn your space into a profitable rental opportunity</p>
          <div className="benefits-list">
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span>Reach thousands of potential tenants</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span>Manage bookings efficiently</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span>Secure payment processing</span>
            </div>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="form-container">
          <form onSubmit={handleSubmit} className="add-property-form">
            <h2 className="form-title">Add Your Property Details</h2>
            
            <div className="form-group">
              <label htmlFor="title">Property Title</label>
              <input 
                type="text" 
                id="title"
                name="title" 
                placeholder="e.g. Cozy Downtown Apartment" 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea 
                id="description"
                name="description" 
                placeholder="Describe your property..." 
                onChange={handleChange} 
                required
              ></textarea>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Rent/Month</label>
                <div className="input-with-icon">
                  <span className="input-icon"></span>
                  <input 
                    type="number" 
                    id="price"
                    name="price" 
                    placeholder="Amount" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="tenantType">Tenant Type</label>
                <select 
                  id="tenantType"
                  name="tenantType" 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select type</option>
                  <option value="Students">Students</option>
                  <option value="Families">Families</option>
                  <option value="Professionals">Professionals</option>
                  <option value="Anyone">Anyone</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="rentingOption">Renting Option</label>
                <select 
                  id="rentingOption"
                  name="rentingOption" 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select option</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input 
                type="text" 
                id="location"
                name="location" 
                placeholder="Address" 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="services">Services</label>
              <input 
                type="text" 
                id="services"
                name="services" 
                placeholder="e.g. WiFi, Parking, Laundry (comma-separated)" 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="images">Property Images</label>
              <div className="file-upload-container">
                <label htmlFor="images" className="file-upload-label">
                  <span className="upload-icon">📷</span>
                  <span>Choose Files</span>
                </label>
                <input 
                  type="file" 
                  id="images"
                  name="images" 
                  multiple 
                  accept="image/*" 
                  onChange={handleChange} 
                  required 
                  className="file-input"
                />
              </div>
              
              {previewImages.length > 0 && (
                <div className="image-preview-container">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="preview-image">
                      <img src={preview} alt={`Preview ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button" 
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding Property...' : 'Add Property'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewProperty;