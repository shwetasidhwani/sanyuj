//user data is saved in the local storage and on reload, pprogram checks local storage for the user data. 

import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    profileImage: null, // Initially no profile image
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };


  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const updateProfileImage = (newImage) => {
    const updatedUser = { ...user, profileImage: newImage };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const updateName = (newName) => {
    const updatedUser = { ...user, name: newName };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };


  return (
    <UserContext.Provider value={{ user, login, logout, updateProfileImage, updateName }}>
      {children}
    </UserContext.Provider>
  );
};
