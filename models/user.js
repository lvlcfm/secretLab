const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  preferredName: {
    type: String
  },
  bio: {
    type: String
  },
  pronouns: { type: String },
  role: {
    type: String,
    required: true,
    enum: ['GUEST', 'TEACHER', 'MENTEE', 'MENTOR', 'SITE LEADER', 'EXEC'],
    default: 'GUEST'
  },
  sites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Site'
    }
  ],
  siteTimes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SiteTime'
    }
  ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
