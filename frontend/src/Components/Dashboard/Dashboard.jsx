import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { UserContext } from "../../context/UserContext";
import default_user_logo from "../../assets/default-user.png";

function Dashboard() {
  const { user, updateProfileImage } = useContext(UserContext);  // Access user and updateProfileImage from context
  const [profile, setProfile] = useState({
    name: "John Doe",
    designation: "UI/UX Designer",
    bio: "I love creating amazing user experiences!",
    skills: ["React", "Node.js"],
    workExperience: "3 years of experience in web and mobile app design.",
    education: "Bachelor's in Design, XYZ University",
  });
  
  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit mode
  const [formData, setFormData] = useState({ ...profile }); // Form state

  const [newImage, setNewImage] = useState(null); // Store the selected image before saving

  useEffect(() => {
    if (!user) return; // If user is not available, exit early.
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${user.id}`);
        const data = await response.json();
        if (response.ok) {
          setProfile(data.user);
        } else {
          console.error("Error fetching profile: ", data.message);
        }
      } catch (error) {
        console.log("Error fetching profile: ", error);
      }
    };

    fetchUserProfile();
  }, [user]); // Depend on user object to trigger fetching when it changes

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setNewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const updateUserData = async (userId, updates) => {
    try {
      const response = await fetch("http://localhost:3000/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, updates }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("User data updated successfully!", data.user);
      } else {
        console.error("Error updating user data:", data.message);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleSaveImage = async () => {
    if (newImage) {
      try {
        await updateUserData(user.id, { profileImage: newImage });
        updateProfileImage(newImage);
        setNewImage(null);
      } catch (error) {
        console.error("Error saving profile image: ", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const updates = { ...formData };
      await updateUserData(user.id, updates);
      setProfile(updates);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile: ", error);
    }
  };

  const handleEdit = () => {
    setFormData({ ...profile }); // Pre-fill form with current data
    setIsEditing(true); // Enter edit mode
  };

  if (!user) {
    return <div>Loading...</div>; // Handle case when user is not available
  }

  return (
    <div className="dashboard-container">
      <div className="profile-section">
        <h4>User Profile</h4>
        <label htmlFor="profile-upload" className="profile-circle">
          <img
            src={user.profileImage || default_user_logo}
            alt="Profile"
            className="profile-image"
          />
        </label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        {newImage && (
          <div>
            <button onClick={handleSaveImage}>Save Profile Image</button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="dashboard-form">
          <h2>Edit Your Profile</h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Your Role"
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write your bio"
          ></textarea>
          <textarea
            name="workExperience"
            value={formData.workExperience}
            onChange={handleChange}
            placeholder="Work Experience"
          ></textarea>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="Education"
          ></textarea>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="dashboard">
          <div className="dashboard-main-profile">
            <h2>{profile.name}</h2>
            <h3>{profile.designation}</h3>
          </div>
          <div className="dashboard-bio">
            <h2>This is me!</h2>
            <p>{profile.bio}</p>
          </div>
          <div className="dashboard-work-experience">
            <h2>Work Experience</h2>
            <p>{profile.workExperience}</p>
            <h2>Education</h2>
            <p>{profile.education}</p>
          </div>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;