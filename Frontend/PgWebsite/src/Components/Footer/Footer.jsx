import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-column">
        <p><b>© {new Date().getFullYear()} YourPGWebsite.com. All rights reserved.</b></p>
        <ul>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-of-use">Terms of Use</a></li>
          <li><a href="/disclaimer">Disclaimer</a></li>
        </ul>
      </div>

      <div className="footer-column footer-contact">
        <p><strong>Contact Us:</strong></p>
        <p>📞 +91 98765-43210</p>
        <p>📧 <a href="mailto:contact@yourpgwebsite.com">contact@yourpgwebsite.com</a></p>
        <p>📍 123, ABC Road, Pune, Maharashtra, India</p>
      </div>

      <div className="footer-column footer-social">
        <p><strong>Follow Us:</strong></p>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>

      <div className="footer-column footer-map">
        <div className="footer-map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.5947847682124!2d73.85674327513114!3d18.516726682574087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c088342a15e5%3A0x6a1b32d3e2a1f3d5!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1631683654475!5m2!1sen!2sin" 
            width="100%" 
            height="200" 
            style={{ border: "0" }} 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;