const express = require("express");
const ChatUsers = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await ChatUsers.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ mesage: "user already exist!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = new ChatUsers({ username, password: hashedPassword });
    await result.save();

    const token = jwt.sign({ id: result._id }, JWT_SECRET, {
      expiresIn: "4h",
    });
    res.status(201).json({ message: "user created", token, username });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await ChatUsers.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "server error while login",
      error: error.message,
    });
  }
});

module.exports = router;
