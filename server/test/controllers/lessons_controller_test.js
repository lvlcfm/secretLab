const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Lesson = mongoose.model('lesson');

describe('Lessons controller', () => {
  it('Post to /api/Lessons creates a new Lesson', done => {
    Lesson.count().then(count => {
      request(app)
        .post('/api/lessons')
        .send({
          title: 'encinal'
        })
        .end(() => {
          Lesson.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });
  it('PUT to /api/Lessons/id edits an existing Lesson', done => {
    const newLesson = new Lesson({
      title: 'encinalTwo'
    });
    newLesson.save().then(() => {
      request(app)
        .put(`/api/lessons/${newLesson._id}`)
        .send({ title: 'notEncinal' })
        .end(() => {
          Lesson.findOne({ title: 'notEncinal' }).then(updateLesson => {
            assert(updateLesson.title === 'notEncinal');
            done();
          });
        });
    });
  });
  it('DELETE to /api/Lessons/id can delete a Lesson', done => {
    const newLesson = new Lesson({ title: 'LessonPlan' });
    newLesson.save().then(() => {
      request(app)
        .delete(`/api/lessons/${newLesson._id}`)
        .end(() => {
          Lesson.findOne({ title: 'LessonPlan' }).then(lesson => {
            assert(lesson === null);
            done();
          });
        });
    });
  });
});
