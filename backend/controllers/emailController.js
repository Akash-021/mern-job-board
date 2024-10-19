const transporter = require('../config/nodemailer');
require('dotenv').config();
const Company = require('../models/companyModel');

const sendJobAlert = async (req, res) => {

  try {
    const { jobDetails, candidateEmails } = req.body;
    const companyId = req.companyId;

    // Check if the company is verified
    const company = await Company.findById(companyId);
    if (!company || !company.isVerified) {
      return res.status(403).json({ message: 'Your account is not verified. Verify your email and phone to send job alerts.' });
    }
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: candidateEmails, // List of recipients
      subject: `New Job Alert: ${jobDetails.title}`,
      text: `
        Hi,

        A new job has been posted that may interest you:

        Title: ${jobDetails.title}
        Description: ${jobDetails.description}
        Experience Level: ${jobDetails.experienceLevel}
        Apply before: ${jobDetails.endDate}

        Best Regards,
        Akpco
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Job alerts sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send job alerts.' });
  }
};

module.exports = { sendJobAlert };
