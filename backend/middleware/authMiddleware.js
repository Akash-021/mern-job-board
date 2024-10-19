require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];
    console.log("authentication token recieved:  ",token);
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.companyId = decoded.companyId;
    console.log("recieved company id for auth: ", req.companyId);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
