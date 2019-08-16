const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteTimeSchema = new Schema({
  day: {
    type: String
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  siteNumber: {
    type: Number
  }
});

const SiteTime = mongoose.model('SiteTime', siteTimeSchema);

module.exports = SiteTime;
