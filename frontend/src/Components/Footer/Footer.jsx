import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"; // Corrected import
import "./Footer.css";
import footer from "../../assets/footer-logo.png"
function Footer() {
  return (
    <div className="footer-container">
    <div className="footer-logo">
    <img src={footer} alt="company logo" />
    </div>
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            We are a vibrant community of alumni who stay connected through events, mentorship, and social networks.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: contact@alumni.com</p>
          <p>Phone: +123 456 7890</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={30} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={30} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={30} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub size={30} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
