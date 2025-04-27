import React, { useRef, useEffect, useState } from "react";
import "./Testimonials.css";
import next_icon from "../../assets/next-icon.png";
import back_icon from "../../assets/back-icon.png";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";
import user4 from "../../assets/user1.png";

const testimonialsData = [
  {
    img: user3,
    name: "Priya Patil",
    location: "Kothrud, Pune",
    feedback:
      "The PG in Kothrud is well-maintained and offers a homely environment. The facilities and cleanliness are top-notch!",
  },
  {
    img: user2,
    name: "Siddharth Deshmukh",
    location: "Hinjewadi, Pune",
    feedback:
      "Great experience! The PG is close to my office, and the amenities provided make life so much easier.",
  },
  {
    img: user3,
    name: "Sameer Kulkarni",
    location: "Viman Nagar, Pune",
    feedback:
      "The best PG in Viman Nagar! The food, security, and management are excellent. Highly recommended.",
  },
  {
    img: user4,
    name: "Neha Joshi",
    location: "Baner, Pune",
    feedback:
      "I love the peaceful environment here. The Wi-Fi speed is great, and the overall experience has been amazing.",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const slider = useRef();

  const slideForward = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const slideBackward = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(slideForward, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="testimonials">
      <button className="nav-btn back-btn" onClick={slideBackward}>
        <img src={back_icon} alt="Back" />
      </button>

      <div className="slider">
        <ul ref={slider} style={{ transform: `translateX(-${index * 100}%)` }}>
          {testimonialsData.map((item, i) => (
            <li key={i} className={`slide ${index === i ? "active" : ""}`}>
              <div className="user-info">
                <img src={item.img} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <span>{item.location}</span>
                </div>
              </div>
              <p>{item.feedback}</p>
            </li>
          ))}
        </ul>
      </div>

      <button className="nav-btn next-btn" onClick={slideForward}>
        <img src={next_icon} alt="Next" />
      </button>
    </div>
  );
};

export default Testimonials;
