import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  // Load Google Translate Script
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
        script.async = true;
        document.body.appendChild(script);
      }
    };

    // Define Google Translate Initialization Function
    window.googleTranslateInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );
    };

    addGoogleTranslateScript();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="dark-nav">
      <img src="/PG-Connect logo.png" alt="LOGO" className="logo" />

      {/* Mobile Menu Icon */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-property">List Your Hostel/PG</Link>
        </li>
        <li>
          <Link to="/properties">Find PG</Link>
        </li>

        {/* Dropdown Menu for Explore */}
        <li
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
          onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown on mobile
        >
          Explore ▼
          <ul className={dropdownOpen ? "dropdown-menu active" : "dropdown-menu"}>
            <li>
              <Link to="/register-roommate">Register as Roommate</Link>
            </li>
            <li>
              <Link to="/find-roommates">Find Roommates</Link>
            </li>
          </ul>
        </li>

        <li>
          {isAuthenticated ? (
            <button className="btn1" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn1">
              Login/SignUp
            </Link>
          )}
        </li>
      </ul>

      {/* Google Translate Element */}
      <div id="google_translate_element"></div>
    </nav>
  );
};

export default Navbar;
