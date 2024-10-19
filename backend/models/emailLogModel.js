const mongoose = require('mongoose');
const emailLogSchema = new mongoose.Schema({
  to: [String],
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model('EmailLog', emailLogSchema);