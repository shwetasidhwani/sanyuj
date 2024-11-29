const express = require("express");
const User=require("../models/userModel");

const {
  handleUserSignup,
  handleUserLogin,
  updateUserData,
} = require("../controller/userController");

const router = express.Router();

router.post("/signup", handleUserSignup);

router.post("/login", handleUserLogin);

// router.put("/update", async (req, res) => {
//   const { userId, updates } = req.body;
//   console.log(req.body);
//   try {
//     const user = await User.findByIdAndUpdate(userId, updates, { new: true });
//     if (!user) return res.status(404).json({ message: "User not found." });
//     res.status(200).json({ message: "Profile updated successfully!", user });
//   } catch (error) {
//     console.error("Error updating profile: ", error);
//     res.status(500).json({ message: "Server error while updating profile. " });
//   }
// });

module.exports = router;
