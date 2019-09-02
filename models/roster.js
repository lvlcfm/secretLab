const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rosterSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  siteTime_id: { type: Schema.Types.ObjectId, ref: 'SiteTime' },
  site_id: {
    type: Schema.Types.ObjectId,
    ref: 'Site'
  }
});

const Roster = mongoose.model('Roster', rosterSchema);

module.exports = Roster;
