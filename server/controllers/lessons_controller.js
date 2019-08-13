const Lesson = require('../models/lesson');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },
  create(req, res, next) {
    const lessonProps = req.body;
    Lesson.create(lessonProps)
      .then(lesson => res.send(lesson))
      .catch(next);
  },
  index(req, res, next) {
    Lesson.find()
      .then(lessons => {
        res.send(lessons);
      })
      .catch(next);
  },
  edit(req, res, next) {
    const lessonId = req.params.id;
    const lessonProps = req.body;
    Lesson.findByIdAndUpdate({ _id: lessonId }, lessonProps)
      .then(() => Lesson.findById({ _id: lessonId }))
      .then(lesson => res.send(lesson))
      .catch(next);
  },
  delete(req, res, next) {
    const lessonId = req.params.id;
    Lesson.findByIdAndRemove({ _id: lessonId })
      .then(lesson => res.status(204).send(lesson))
      .catch(next);
  }
};
