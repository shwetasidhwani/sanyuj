import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { UserContext } from "../../context/UserContext";
import "./Connect.css";
import edit_logo from "../../assets/connect-edit.png";
import default_user from "../../assets/default-user.png";

function Connect() {
  const { user } = useContext(UserContext); // Access user data from context
  const navigate = useNavigate();

  // Redirect if the user is not logged in
  if (!user) {
    navigate("/login"); // Redirect to the login page
    return null; // Prevent rendering
  }

  return (
    <div className="connect-outer-container">
      <div className="connect-my-details">
        <div className="connect-profile-edit">
          <img src={edit_logo} alt="edit logo" onClick={() => navigate("/dashboard")}/>
        </div>
        <div className="connect-user-profile">
          <img
            src={user.profileImage || default_user}
            alt="default user picture"
          />
          <div className="connect-username">{user.name}</div>
        </div>
        <div className="connections-and-posts">
          <div className="connections">Connections: 0</div>
          <div className="posts">Posts: 0</div>
        </div>
      </div>
      <div className="connect-posts"></div>
      <div className="connect-people">People you may know:</div>
    </div>
  );
}

export default Connect;
