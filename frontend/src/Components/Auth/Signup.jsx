import React, { useState } from "react";
import "./Auth.css";
import logo from "../../assets/logo.png";
import axios from "axios";  

function Signup({ onSignupComplete }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setMessage(response.data.message); // Success message
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred!");
    }
    if (onSignupComplete) {
      onSignupComplete();
    }
  };

  return (
    <div className="outer-container">
      <img src={logo} alt="logo" />
      <div className="login-text">
        <span>Sign-Up</span>
      </div>
      <form onSubmit={handleSubmit}>
        <br />
        Name:
        <input
          className="username"
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        Email ID:
        <input
          className="email"
          type="email"
          name="email"
          placeholder="Enter Email ID"
          value={formData.email}
          onChange={handleChange}
          required
        />
        Password:
        <input
          className="pwd"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        Reconfirm Password:
        <input
          className="r-pwd"
          type="password"
          name="confirmPassword"
          placeholder="Reconfirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" className="signup-btn">
          Sign-Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
