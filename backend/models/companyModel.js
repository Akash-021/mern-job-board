const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  isVerified: { type: Boolean, default: false },
  emailVerificationToken: String,  // Token for email verification
  otp: String,  // OTP for mobile verification
});

module.exports = mongoose.model('Company', companySchema);
