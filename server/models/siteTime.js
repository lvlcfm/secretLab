const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteTimeSchema = new Schema({
  day: {
    type: String
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  }
});

module.exports.siteTimeSchema = siteTimeSchema;
