const express = require('express');
const { registerCompany, loginCompany, verifyEmail, sendOTP, verifyOTP } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerCompany);
router.post('/login', loginCompany);
router.get('/verify-email/:token', verifyEmail); // Verify email
router.post('/send-otp', sendOTP); // Send OTP
router.post('/verify-otp', verifyOTP); // Verify OTP

module.exports = router;
