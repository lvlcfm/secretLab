const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  site_id: {
    type: Schema.Types.ObjectId,
    ref: 'Site'
  },
  siteTime_id: {
    type: Schema.Types.ObjectId,
    ref: 'SiteTime'
  }
});

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;
