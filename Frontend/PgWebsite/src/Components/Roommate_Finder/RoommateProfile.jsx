import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RoommateProfile.css";

const RoommateProfile = () => {
  const { id } = useParams();
  const [roommate, setRoommate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/roommate/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch roommate data");
        }
        return res.json();
      })
      .then((data) => {
        setRoommate(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching roommate:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="roommate-loading">Loading profile...</div>;
  if (error) return <div className="roommate-error">Error: {error}</div>;
  if (!roommate) return <div className="roommate-error">Roommate not found</div>;

  return (
    <div className="roommate-profile-container">
      <div className="roommate-profile-header">
        <div className="roommate-profile-photo-container">
          <img
            src={`http://localhost:5000/${roommate.profilePhoto}`}
            alt={roommate.name}
            className="roommate-profile-photo"
          />
        </div>
        <div className="roommate-basic-info">
          <h1 className="roommate-name">{roommate.name}, <span className="roommate-age">{roommate.age}</span></h1>
          <div className="roommate-location-badge">
            <i className="roommate-icon location-icon"></i> {roommate.location}
          </div>
          <div className="roommate-occupation-badge">
            <i className="roommate-icon work-icon"></i> {roommate.occupation}
          </div>
        </div>
      </div>

      <div className="roommate-profile-body">
        <div className="roommate-section" id="roommate-about">
          <h2 className="roommate-section-title">About Me</h2>
          <p className="roommate-about-text">{roommate.aboutMe}</p>
        </div>

        <div className="roommate-section" id="roommate-preferences">
          <h2 className="roommate-section-title">Housing Details</h2>
          <div className="roommate-preferences-grid">
            <div className="roommate-preference-item">
              <span className="preference-label">Current Stay</span>
              <span className="preference-value">{roommate.currentStay}</span>
            </div>
            <div className="roommate-preference-item">
              <span className="preference-label">Budget</span>
              <span className="preference-value">${roommate.budget}</span>
            </div>
            <div className="roommate-preference-item">
              <span className="preference-label">Preferred Gender</span>
              <span className="preference-value">{roommate.preferredGender}</span>
            </div>
          </div>
        </div>

        <div className="roommate-section" id="roommate-lifestyle">
          <h2 className="roommate-section-title">Lifestyle</h2>
          <div className="roommate-lifestyle-grid">
            <div className="roommate-lifestyle-item">
              <span className="lifestyle-label">Smoking</span>
              <span className="lifestyle-value">{roommate.smoking}</span>
            </div>
            <div className="roommate-lifestyle-item">
              <span className="lifestyle-label">Drinking</span>
              <span className="lifestyle-value">{roommate.drinking}</span>
            </div>
            <div className="roommate-lifestyle-item">
              <span className="lifestyle-label">Vegetarian</span>
              <span className="lifestyle-value">{roommate.vegetarian}</span>
            </div>
            <div className="roommate-lifestyle-item">
              <span className="lifestyle-label">Pets</span>
              <span className="lifestyle-value">{roommate.pets}</span>
            </div>
            <div className="roommate-lifestyle-item">
              <span className="lifestyle-label">Work From Home</span>
              <span className="lifestyle-value">{roommate.workFromHome ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>

        <div className="roommate-section" id="roommate-personal">
          <h2 className="roommate-section-title">Personal</h2>
          <div className="roommate-personal-item">
            <span className="personal-label">Languages</span>
            <div className="personal-value language-pills">
              {roommate.languagesSpoken.map((language, index) => (
                <span key={index} className="language-pill">{language}</span>
              ))}
            </div>
          </div>
          <div className="roommate-personal-item">
            <span className="personal-label">Hobbies</span>
            <div className="personal-value hobby-pills">
              {roommate.hobbies.map((hobby, index) => (
                <span key={index} className="hobby-pill">{hobby}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="roommate-section" id="roommate-contact">
          <h2 className="roommate-section-title">Contact</h2>
          <div className="roommate-contact-methods">
            <a href={`mailto:${roommate.email}`} className="roommate-contact-button email-button">
              Email
            </a>
            <a href={`tel:${roommate.phone}`} className="roommate-contact-button phone-button">
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoommateProfile;