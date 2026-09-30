// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateOTP, sendOTP } = require('../utils/sendOTP');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      email,
      password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        message: 'User registered successfully'
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP valid for 10 minutes

    // Save OTP to user
    user.otp = {
      code: otp,
      expiresAt: otpExpiry
    };
    await user.save();

    // Send OTP email
    const sent = await sendOTP(user.email, otp);
    if (!sent) {
      return res.status(500).json({ message: 'Failed to send OTP' });
    }

    res.status(200).json({ 
      message: 'OTP sent to your email',
      userId: user._id 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify OTP and complete login
exports.verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP exists and is valid
    if (!user.otp || !user.otp.code || !user.otp.expiresAt) {
      return res.status(400).json({ message: 'No OTP requested' });
    }

    // Check if OTP is expired
    if (new Date() > new Date(user.otp.expiresAt)) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // Check if OTP matches
    if (user.otp.code !== otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    // Clear OTP
    user.otp = undefined;
    user.isVerified = true;
    await user.save();

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      _id: user._id,
      email: user.email,
      token
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};