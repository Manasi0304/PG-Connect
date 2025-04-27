import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MatchedRoommates.css";

const MatchedRoommates = () => {
  const { userId } = useParams();
  const [matchedRoommates, setMatchedRoommates] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/matched-roommates/${userId}`)
      .then((res) => res.json())
      .then((data) => setMatchedRoommates(data))
      .catch((error) => console.error("Error fetching matched roommates:", error));
  }, [userId]);

  return (
    <div className="matched-roommates-container">
      <h2>Matched Roommates</h2>
      {matchedRoommates.length === 0 ? (
        <p>No matching roommates found.</p>
      ) : (
        <div className="roommate-list">
          {matchedRoommates.map((roommate) => (
            <div key={roommate._id} className="roommate-card">
              <img src={`http://localhost:5000/${roommate.profilePhoto}`} alt={roommate.name} className="roommate-photo" />
              <h3>{roommate.name}, {roommate.age}</h3>
              <p><strong>Location:</strong> {roommate.location}</p>
              <p><strong>Budget:</strong> ${roommate.budget}</p>
              <button onClick={() => window.location.href = `/roommate/${roommate._id}`}>
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchedRoommates;
