import React from "react";
import "./Category.css";
import img1 from '../../assets/program1.jpg'
import img2 from '../../assets/program2.jpg'
import img3 from '../../assets/program3.jpg'
import { FaArrowRight } from "react-icons/fa";

const Category = () => {
  return (
    <div className="category-container container">
      <div className="category-content">
        <div className="image-section">
          <div className="image-wrapper main-image">
            <img src={img1} alt="Main view" className="hover-image" />
            <div className="hover-caption">
              <span>Student Modern Living</span>
              <FaArrowRight className="arrow-icon" />
            </div>
          </div>

          <div className="sub-images">
            <div className="image-wrapper">
              <img src={img2} alt="Room view 1" className="hover-image" />
              <div className="hover-caption">
                <span>Working Professionals</span>
                <FaArrowRight className="arrow-icon" />
              </div>
            </div>
            <div className="image-wrapper">
              <img src={img3} alt="Room view 2" className="hover-image" />
              <div className="hover-caption">
                <span>Women Only PGs</span>
                <FaArrowRight className="arrow-icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-section">
          <h3 className="category-heading">Find the Perfect Stay</h3>
          <h1 className="category-title">Accommodation for Every Lifestyle</h1>
          <p className="category-description">
            Our platform connects you to the most reliable and comfortable PG options. With a focus on safety, convenience, and affordability, we aim to make your search for a new home seamless and stress-free.
          </p>

          <div className="info-box">
            <div className="info-icon">🏠</div>
            <div>
              <h4 className="info-heading">Verified and Trusted Listings</h4>
              <p className="info-description">
                Every PG on our platform is verified to meet quality and safety standards, ensuring peace of mind.
              </p>
            </div>
          </div>

          <div className="info-box">
            <div className="info-icon">🏠</div>
            <div>
              <h4 className="info-heading">Affordable Options</h4>
              <p className="info-description">
                Explore budget-friendly accommodations without compromising on essential amenities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
