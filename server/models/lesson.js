const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { siteTimeSchema } = require('./siteTime');

const LessonSchema = new Schema({
  title: {
    type: String
  },
  summary: {
    type: String
  },
  content: {
    type: String
  },
  media: {
    type: String
  },
  week: {
    type: String
  },
  exitTicket: {
    type: String
  },
  siteTime: [siteTimeSchema],
  site_id: {
    type: Schema.Types.ObjectId,
    ref: 'Site'
  }
});

const Lesson = mongoose.model('lesson', LessonSchema);

module.exports = Lesson;
