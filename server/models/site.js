const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SiteSchema = new Schema({
  schoolName: {
    type: String,
    required: true
  },
  schoolAddress: {
    type: String
  },
  classroom: {
    type: String
  },
  style: {
    type: String
  },
  level: {
    type: String
  },
  semester: {
    type: String
  },
  year: {
    type: String
  },
  siteContactName: {
    type: String
  },
  siteContactEmail: {
    type: String
  },
  siteTimes: [{ type: Schema.Types.ObjectId, ref: 'SiteTime' }]
});

const Site = mongoose.model('Site', SiteSchema);

module.exports = Site;
