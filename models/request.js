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
    enum: ['GUEST', 'TEACHER', 'MENTEE', 'MENTOR', 'SITE LEADER', 'EXEC']
  },
  site_id: {
    type: Schema.Types.ObjectId,
    ref: 'Site'
  }
});
const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;
