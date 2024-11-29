import React, { useState, useContext } from "react";
import { UserProvider, UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


axios.defaults.withCredentials=true;

import logo from "../../assets/logo.png";
import "./Auth.css";

const Login = () => {
  const { login } = useContext(UserContext); // Access login function
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(
        "http://localhost:3000/login",
        formData,
        {
          withCredentials:true,
        }
      );
      if(response.status===200){
        const result = response.data;
        console.log();
        console.log(response.data);
        login(result.user);
        navigate("/dashboard");
      }
    }catch(error){
      if(error.response){
        alert(error.response.data.message);
      }else{
        console.error("Login failed:",error.message);
        alert("An error occurred. Please try again.");
      }
    }

  };

  return (
    <div className="outer-container">
      <img src={logo} alt="logo" />
      <div className="login-text">
        <span>Login</span>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        Enter Email:
        <input
          type="email"
          name="email"
          className="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        Enter Password:
        <input
          type="password"
          name="password"
          className="pwd"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="submit-btn" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
