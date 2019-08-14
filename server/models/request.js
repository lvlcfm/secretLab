const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  approver: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  requestType: {
    type: String,
    enum: ['ROLE', 'SITE', 'OTHER'],
    default: 'OTHER'
  },
  status: {
    type: String,
    enum: ['APPROVED', 'PENDING', 'DENIED'],
    default: 'PENDING'
  },
  roleRequest: {
    type: String,
    enum: ['GUEST', 'MENTEE', 'MENTOR', 'SITE_LEADER', 'EXEC'],
    default: 'GUEST'
  },
  site_id: {
    type: Schema.Types.ObjectId,
    ref: 'Site'
  }
});
const Request = mongoose.model('request', RequestSchema);

module.exports = Request;
