const express = require("express");
const User = require("../model/userSchema");

const router = express.Router();

//static router
router.get("/", (req, res) => {
  res.send("Backend is running sucessfully");
});

//SignUp router

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Fill all the fields");
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send("User already exists");
  }

  const newUser = await User.create({ name, email, password });

  res.status(200).json({
    message: "User registered successfully",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    },
  });
});

//Login Router

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send("User not found");
  }

  if (user.password !== password) {
    return res.status(400).send("Invalid credentials");
  }

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

module.exports = router;
