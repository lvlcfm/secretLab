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
  role: {
    type: String,
    required: true,
    default: 'GUEST'
  },
  sites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Site'
    }
  ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
