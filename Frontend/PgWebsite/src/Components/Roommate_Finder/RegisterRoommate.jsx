import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterRoommate.css";

const RegisterRoommate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    profilePhoto: null,
    occupation: "",
    location: "",
    currentStay: "",
    preferredGender: "Any",
    budget: "",
    stayDuration: "Flexible",
    smoking: "No",
    drinking: "No",
    vegetarian: "No",
    pets: "No",
    workFromHome: false,
    email: "",
    phone: "",
    instagram: "",
    linkedin: "",
    languagesSpoken: "",
    hobbies: "",
    aboutMe: "",
  });
  
  // For error display
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    // Create FormData for file upload
    const form = new FormData();
    
    // Add all form fields to FormData
    form.append("name", formData.name);
    form.append("age", formData.age); // Send as string, backend will parse
    form.append("gender", formData.gender);
    if (formData.profilePhoto) {
      form.append("profilePhoto", formData.profilePhoto);
    }
    form.append("occupation", formData.occupation);
    form.append("location", formData.location);
    form.append("currentStay", formData.currentStay);
    form.append("preferredGender", formData.preferredGender);
    form.append("budget", formData.budget); // Send as string, backend will parse
    form.append("stayDuration", formData.stayDuration);
    form.append("smoking", formData.smoking);
    form.append("drinking", formData.drinking);
    form.append("vegetarian", formData.vegetarian);
    form.append("pets", formData.pets);
    form.append("workFromHome", formData.workFromHome); // Send boolean directly
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("instagram", formData.instagram || "");
    form.append("linkedin", formData.linkedin || "");
    
    // Convert comma-separated strings to arrays as expected by backend
    form.append("languagesSpoken", formData.languagesSpoken);
    form.append("hobbies", formData.hobbies);
    form.append("aboutMe", formData.aboutMe);

    try {
      // Add withCredentials for cookie handling if needed
      const response = await axios.post("http://localhost:5000/register-roommate", form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      
      console.log("Registration successful:", response.data);
      alert("Roommate added successfully!");

      // Delay navigation to ensure alert is seen
      setTimeout(() => {
        navigate("/find-roommates");
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      
      if (error.response) {
        // The server responded with an error status code
        const errorMessage = error.response.data.error || "Failed to register. Please check your inputs.";
        setError(errorMessage);
        console.log("Server error response:", error.response.data);
        alert("Failed to register roommate: " + errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        const errorMessage = "No response from server. Please check your connection.";
        setError(errorMessage);
        alert("Connection issue: " + errorMessage);
      } else {
        // Something happened in setting up the request
        const errorMessage = "Error: " + error.message;
        setError(errorMessage);
        alert("Error: " + errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to display selected filename
  const getFileName = () => {
    if (formData.profilePhoto) {
      return formData.profilePhoto.name;
    }
    return "No file chosen";
  };

  return (
    <div className="roommate-register-page">
      <div className="roommate-register-container">
        <div className="roommate-register-header">
          <h2>Register as a Roommate</h2>
          <p className="roommate-register-subtitle">
            Fill in your details to find the perfect roommate match
          </p>
        </div>
        
        {error && (
          <div className="roommate-error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="roommate-register-form">
          {/* No changes to the form UI, keeping it as is */}
          <div className="roommate-form-section">
            <h3 className="roommate-section-title">Personal Information</h3>
            
            <div className="roommate-input-group">
              <div className="roommate-input-field">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your full name" 
                  value={formData.name}
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="roommate-input-field">
                <label htmlFor="age">Age</label>
                <input 
                  type="number" 
                  id="age" 
                  name="age" 
                  placeholder="Your age" 
                  value={formData.age}
                  min="18"
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="roommate-input-group">
              <div className="roommate-input-field">
                <label htmlFor="gender">Gender</label>
                <select 
                  id="gender" 
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange} 
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="roommate-input-field">
                <label htmlFor="occupation">Occupation</label>
                <input 
                  type="text" 
                  id="occupation" 
                  name="occupation" 
                  placeholder="Your occupation"
                  value={formData.occupation}
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div className="roommate-input-field roommate-file-upload">
              <label htmlFor="profilePhoto">Profile Photo</label>
              <div className="roommate-file-input-wrapper">
                <input 
                  type="file" 
                  id="profilePhoto" 
                  name="profilePhoto" 
                  accept="image/*" 
                  onChange={handleChange} 
                />
                <div className="roommate-file-button">Choose Photo</div>
                <span className="roommate-file-name">{getFileName()}</span>
              </div>
            </div>
          </div>

          <div className="roommate-form-section">
            <h3 className="roommate-section-title">Location Preferences</h3>
            
            <div className="roommate-input-group">
              <div className="roommate-input-field">
                <label htmlFor="location">Current Location</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  placeholder="City, Area"
                  value={formData.location}
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="roommate-input-field">
                <label htmlFor="currentStay">Current Stay</label>
                <input 
                  type="text" 
                  id="currentStay" 
                  name="currentStay" 
                  placeholder="PG, Rented Apartment, etc."
                  value={formData.currentStay}
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="roommate-input-group">
              <div className="roommate-input-field">
                <label htmlFor="budget">Monthly Budget (₹)</label>
                <input 
                  type="number" 
                  id="budget" 
                  name="budget" 
                  placeholder="Your budget"
                  value={formData.budget}
                  min="1000"
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="roommate-input-field">
                <label htmlFor="stayDuration">Stay Duration</label>
                <select 
                  id="stayDuration" 
                  name="stayDuration"
                  value={formData.stayDuration}
                  onChange={handleChange}
                >
                  <option value="Flexible">Flexible</option>
                  <option value="Short-term">Short-term</option>
                  <option value="Long-term">Long-term</option>
                </select>
              </div>
            </div>
          </div>

          <div className="roommate-form-section">
            <h3 className="roommate-section-title">Preferences & Lifestyle</h3>
            
            <div className="roommate-input-group">
              <div className="roommate-input-field">
                <label htmlFor="preferredGender">Preferred Roommate Gender</label>
                <select 
                  id="preferredGender" 
                  name="preferredGender"
                  value={formData.preferredGender}
                  onChange={handleChange} 
                  required
                >
                  <option value="Any">Any</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            
            <div className="roommate-lifestyle-grid">
              <div className="roommate-lifestyle-item">
                <label htmlFor="smoking">Smoking</label>
                <select 
                  id="smoking" 
                  name="smoking"
                  value={formData.smoking}
                  onChange={handleChange} 
                  required
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                  <option value="Occasionally">Occasionally</option>
                </select>
              </div>
              
              <div className="roommate-lifestyle-item">
                <label htmlFor="drinking">Drinking</label>
                <select 
                  id="drinking" 
                  name="drinking"
                  value={formData.drinking}
                  onChange={handleChange} 
                  required
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                  <option value="Occasionally">Occasionally</option>
                </select>
              </div>
              
              <div className="roommate-lifestyle-item">
                <label htmlFor="vegetarian">Vegetarian</label>
                <select 
                  id="vegetarian" 
                  name="vegetarian"
                  value={formData.vegetarian}
                  onChange={handleChange} 
                  required
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              
              <div className="roommate-lifestyle-item">
                <label htmlFor="pets">Pets</label>
                <select 
                  id="pets" 
                  name="pets"
                  value={formData.pets}
                  onChange={handleChange} 
                  required
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
            
            <div className="roommate-checkbox-field">
              <label htmlFor="workFromHome" className="roommate-checkbox-label">
                <input 
                  type="checkbox" 
                  id="workFromHome" 
                  name="workFromHome"
                  checked={formData.workFromHome}
                  onChange={handleChange} 
                />
                <span className="roommate-checkbox-text">I work from home</span>
              </label>
            </div>
          </div>

          <div className="roommate-form-section">
            <h3 className="roommate-section-title">Contact Information</h3>
            
            <div className="roommate-input-group">
              <div className="roommate-input-field">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="roommate-input-field">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="roommate-input-group">
              <div className="roommate-input-field">
                <label htmlFor="instagram">Instagram (optional)</label>
                <input 
                  type="text" 
                  id="instagram" 
                  name="instagram" 
                  placeholder="Your Instagram handle"
                  value={formData.instagram}
                  onChange={handleChange} 
                />
              </div>
              
              <div className="roommate-input-field">
                <label htmlFor="linkedin">LinkedIn (optional)</label>
                <input 
                  type="text" 
                  id="linkedin" 
                  name="linkedin" 
                  placeholder="Your LinkedIn profile"
                  value={formData.linkedin}
                  onChange={handleChange} 
                />
              </div>
            </div>
          </div>

          <div className="roommate-form-section">
            <h3 className="roommate-section-title">About You</h3>
            
            <div className="roommate-input-field">
              <label htmlFor="languagesSpoken">Languages Spoken</label>
              <input 
                type="text" 
                id="languagesSpoken" 
                name="languagesSpoken" 
                placeholder="English, Hindi, etc. (comma separated)"
                value={formData.languagesSpoken}
                onChange={handleChange} 
              />
            </div>
            
            <div className="roommate-input-field">
              <label htmlFor="hobbies">Hobbies & Interests</label>
              <input 
                type="text" 
                id="hobbies" 
                name="hobbies" 
                placeholder="Reading, Cooking, etc. (comma separated)"
                value={formData.hobbies}
                onChange={handleChange} 
              />
            </div>
            
            <div className="roommate-input-field">
              <label htmlFor="aboutMe">Tell us about yourself</label>
              <textarea 
                id="aboutMe" 
                name="aboutMe" 
                placeholder="Share a bit about yourself, your personality, and what you're looking for in a roommate..."
                value={formData.aboutMe}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="roommate-form-actions">
            <button 
              type="submit" 
              className="roommate-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register as Roommate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterRoommate;