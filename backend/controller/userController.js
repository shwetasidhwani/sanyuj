const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { userId: user._id },
      "7668ab46fdd91c515c3b066fbe33205ecc9dab03eba46ba5e5b3f59b677307f4",
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      // maxAge: 24 * 60 * 60 * 1000,
      // sameSite: "lax",
    });

    res.status(200).json({ message: "Login successful!", user });
    console.log("Try block of handleUserLogin in controller.");
  } catch (error) {
    console.error("Error during login: ", error.message);
    res.status(500).json({ message: "Server error." });
    console.log("Catch block of handleUserLogin in controller.");
  }
}

async function handleUserSignup(req, res) {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });
    console.log(user);
    return res
      .status(201)
      .json({ message: "User created successfully!", user });
  } catch (error) {
    // return res.status(500).json({message: error.message})
    console.log("Error in controller", error.message);
    return res.status(500).json({ message: "Error occurred in controller!" });
  }
}

async function updateUserData(req, res) {
  try {
    const { userId, updates } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    );

    if(!updatedUser){
      return res.status(400).json({message: "User not found."});
    }

    res.status(200).json({message: "User data updated successfully!"});
  } catch (error) {
    console.error("Error updating user data: ",error.message);
    res.status(500).json({message: "Server error. "});
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  updateUserData,
};
