const mongoose = require('mongoose');
require('dotenv').config();
const myURI = "mongodb://localhost:27017/";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || myURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};
module.exports = connectDB;