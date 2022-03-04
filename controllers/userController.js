require("dotenv").config();
const { check, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../middleware");
const User = require("../models/userModel");

//@desc Register new user
//@route Post /user/registerd
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  //info from client
  const { email, password } = req.body;
  const email = email.toString().toLowerCase();
  //check for user in database
  const userExists = await User.findOne({ email });
  if (!userExists) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await new User({
      email,
      password: hash,
    });
    await user.save();
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
      success: "account created successfully ",
    });
  } else if (userExists) {
    res.json({ error: "user already exists" });
  }
});

//@desc Authenticate a user
//@route POST /user/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  //info from client
  const { email, password } = await req.body;
  //check for user in database
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
      success: "logged in successfully",
    });
  } else if (user && !(await bcrypt.compare(password, user.password))) {
    res.json({ error: "invalid password" });
  } else if (!user) {
    res.json({ error: "user does not exist" });
  } else {
    res.json({ error: "login failed, please try again" });
  }
});

//@desc Logout current user
//@route POST /user/logut
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
  const token = req.headers.authorization;
  res.json({ logoutSuccess: "you have successfully logged out" });
});

module.exports = { registerUser, loginUser, logoutUser };
