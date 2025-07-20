const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../model/User");
const checkAuth = require("../middleware/checkAuth");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

router.post(
  "/signup",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("role")
      .optional()
      .isIn(["USER", "ADMIN", "VENDOR"])
      .withMessage("Invalid user role"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, role } = req.body;

      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, msg: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        email: email,
        password: hashedPassword,
        role: role || "USER",
      });

      await newUser.save();

      // Generate Email Verification Token (valid for 24 hours)
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      try {
        await sendVerificationEmail(newUser, token);
      } catch (emailErr) {
        console.error("Failed to send verification email:", emailErr);
        await User.deleteOne({ _id: newUser._id });
        return res
          .status(500)
          .json({ success: false, msg: "Could not send verification email" });
      }

      res.status(201).json({
        success: true,
        msg: "You got registered successfully. Verification email sent to your registered email.",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: "Invalid token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user and update email verification status
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.status = true;
    user.emailVerified = true;
    await user.save();

    res.json({ msg: "Email verified successfully. You can now login." });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid or expired token" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(200).json({
      success: false,
      msg: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email });

    // Avoid user enumeration by using a generic error message
    if (!user || !user.status) {
      return res.status(200).json({
        success: false,
        msg: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(200).json({
        success: false,
        msg: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!refreshSecret) {
      console.error("Missing JWT_REFRESH_SECRET");
      return res.status(200).json({
        success: false,
        msg: "Authentication server error",
      });
    }

    const refreshToken = jwt.sign(
      { userId: user._id },
      refreshSecret,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      success: true,
      name: user.name,
      email: user.email,
      role: user.role,
      userId: user._id,
      token,
      refreshToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(200).json({
      success: false,
      msg: "Internal server error",
    });
  }
});

router.post("/token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, msg: "Refresh token required" });
  }

  try {
    // Optional: Verify refresh token exists in DB
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || "defaultRefreshSecret"
    );
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(403)
        .json({ success: false, msg: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, token: newAccessToken });
  } catch (err) {
    console.error("Token refresh error:", err);
    res
      .status(403)
      .json({ success: false, msg: "Invalid or expired refresh token" });
  }
});

router.get("/userdetails", checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password -refreshToken");
    
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

router.post("/logout", async (req, res) => {
  const { userId } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
    res.status(200).json({ success: true, msg: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error during logout" });
  }
});

module.exports = router;
