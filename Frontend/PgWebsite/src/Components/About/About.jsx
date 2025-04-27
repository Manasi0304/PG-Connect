import React from "react";
import "./About.css";
import about_img from "../../assets/aboutus.jpg";

const About = () => {
  return (
    <div className="about">
      <div className="about-left">
        <img src={about_img} alt="about_img" className="about-img" />
      </div>
      <div className="about-right">
        <h3>About <span className="highlight">Addpgname</span></h3>
        <h2>Your Home Away From Home</h2>
        <p>
          At <span className="highlight">Addpgname</span>, we provide a comfortable and secure living space for students,
          working professionals, and women. Our PG accommodations are designed to offer a perfect blend of
          convenience, affordability, and modern amenities.
        </p>

        <p>
          We prioritize your comfort with fully furnished rooms, high-speed WiFi, hygienic meals, and 24/7 security.
          Our locations are well-connected to major educational institutions, workplaces, and public transport.
        </p>

        <p>
          Whether you're a student looking for a study-friendly environment, a working professional seeking a hassle-free stay,
          or a woman looking for a secure and cozy place, <span className="highlight">Addpgname</span> is the ideal choice for you.
        </p>
      </div>
    </div>
  );
};

export default About;
