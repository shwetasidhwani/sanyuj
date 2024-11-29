import React, { useState } from "react";
import "./LoginModal.css"; // Add your modal styles here
import Signup from "../Signup";
import Login from "../Login";

const LoginModal = ({ onClose }) => {
  const [isSignup, setIsSignup] = useState(false); // Tracks whether to show Login or Sign-Up

  // Switch to Login view
  const switchToLogin = () => setIsSignup(false);

  // Toggle between Login and Sign-Up (only for manual toggling)
  const toggleForm = () => setIsSignup((prev) => !prev);

  // Handle signup submission and automatically switch to login
  const handleSignupComplete = () => {
    alert("Signup successful! Please log in."); // Optional notification
    switchToLogin();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        {/* Render Login or Sign-Up based on state */}
        {isSignup ? (
          <Signup onSignupComplete={handleSignupComplete} />
        ) : (
          <Login />
        )}

        {/* Toggle only when in Login view */}
        {!isSignup && (
          <div className="toggle-container">
            <button onClick={toggleForm}>Switch to Sign-Up</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
