const Company = require('../models/companyModel');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const nodemailer = require('nodemailer');
const transporter = require('../config/nodemailer');
const { v4: uuidv4 } = require('uuid'); // Generate unique verification token

// Register a company and send verification email
const registerCompany = async (req, res) => {
  const { name, email, password, phone } = req.body;
  console.log('Received registration data1:', req.body);
  
  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const emailVerificationToken = uuidv4(); // Generate token
    const company = new Company({ name, email, password: hashedPassword, phone, emailVerificationToken, });
    
    console.log('check1: ',company);
    await company.save();

    console.log('transporter: ', transporter);
    console.log("trans done::::")
    await transporter.sendMail({
      to: email,
      subject: 'Verify your Company Account',
      text: `Click the link to verify your account: https://mern-job-board.vercel.app/verify-email/${emailVerificationToken}`,
    });

    res.status(201).json({ message: 'Registration successful. Please verify your email.' });
  } catch (error) {
    console.error('Error during company registration:', error); // Log the full error
    res.status(500).json({ error: 'Error registering company' });
  }

};

// Verify email using the token
const verifyEmail = async (req, res) => {
    const { token } = req.params;
    console.log("recieved email verification token: ",token);
    try {
      const company = await Company.findOne({ emailVerificationToken: token });
  
      if (!company) return res.status(404).json({ message: 'Invalid token.' });
  
      company.isVerified = true;
      company.emailVerificationToken = undefined; // Clear the token after verification
      await company.save();
  
      res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Email verification failed.' });
    }
  };

// Login a company and generate a JWT token
const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login data1:', req.body);
  try {
    const company = await Company.findOne({ email });
    if (!company) return res.status(400).json({ message: 'Invalid email' });

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ companyId: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("token: ",token);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
})

const sendOTP = async (req, res) => {
  const { phone } = req.body;
  console.log("recieved number",phone);
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  
  try {
    const company = await Company.findOneAndUpdate({ phone }, { otp });
    console.log("random check");
    await vonage.sms.send({
          to: phone,
          from: "Vonage APIs",
          text: `Your OTP is ${otp}`,
        });

    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
};

const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const company = await Company.findOne({ phone, otp });

    if (!company) return res.status(400).json({ message: 'Invalid OTP.' });

    company.isVerified = true;
    company.otp = undefined; // Clear OTP after verification
    await company.save();

    res.status(200).json({ message: 'Phone number verified successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'OTP verification failed.' });
  }
};



module.exports = { registerCompany, loginCompany, verifyEmail, sendOTP, verifyOTP,};
