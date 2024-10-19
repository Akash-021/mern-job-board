const express = require('express');
const { sendJobAlert } = require('../controllers/emailController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/send-job-alert', authenticate, sendJobAlert); // Protect with JWT middleware

module.exports = router;
