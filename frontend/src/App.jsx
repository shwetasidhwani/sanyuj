import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {UserProvider} from "./context/UserContext";

import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Components/LandingPage/LandingPage";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Dashboard from "./Components/Dashboard/Dashboard";
import Connect from "./Components/Connect/Connect";


import "./App.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/connect" element={<Connect/>}/>
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
