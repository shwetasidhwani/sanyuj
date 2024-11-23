import React from "react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <a href="/">
            <img src="../../assets/logo.png" alt="" />
          </a>
        </li>
        <li>
          <a className="nav-link" href="/">
            Home
          </a>
        </li>
        <li>
          <a className="nav-link" href="/about">
            About
          </a>
        </li>
        <li>
          <a className="nav-link" href="/contact">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
