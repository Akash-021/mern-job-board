const Job = require('../models/jobModel');
const Company = require('../models/companyModel');

// Post a job by an authenticated company
const postJob = async (req, res) => {
  try {
    const companyId = req.companyId;

    // Check if the company is verified
    const company = await Company.findById(companyId);
    if (!company || !company.isVerified) {
        console.log("Your account is not verified. Verify your email and phone to post jobs.");
      return res.status(403).json({ message: 'Your account is not verified. Verify your email and phone to post jobs.' });
    }
    const { title, description, experienceLevel, endDate } = req.body;
    console.log("recieved job details",req.body);
    const job = new Job({ ...req.body, companyId: req.companyId });
    console.log("job:  ",job);
    await job.save();
    res.status(201).json({ message: 'Job posted successfully', job });
  } catch (error) {
    res.status(500).json({ error: 'Error posting job' });
  }
};

module.exports = { postJob };
