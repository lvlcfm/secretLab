const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const User = require('../../models/user');

describe('Users controller', () => {
  it('Post to /api/users creates a new user', done => {
    User.count().then(count => {
      request(app)
        .post('/api/users')
        .send({ googleId: '1234', email: 'test@test.com' })
        .end(() => {
          User.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });
  it('PUT to /api/users/id edits an existing user', done => {
    const user = new User({
      googleId: '12345',
      email: 'a@a.com',
      firstName: 'test',
      lastName: 'passes'
    });
    user.save().then(() => {
      request(app)
        .put(`/api/users/${user._id}`)
        .send({ firstName: 'friend' })
        .end(() => {
          User.findOne({ email: 'a@a.com' }).then(user => {
            assert(user.firstName === 'friend');
            done();
          });
        });
    });
  });
  it('DELETE to /api/users/id can delete a user', done => {
    const user = new User({ googleId: '1234', email: 'toocool@forschool.com' });
    user.save().then(() => {
      request(app)
        .delete(`/api/users/${user._id}`)
        .end(() => {
          User.findOne({ email: 'toocool@forschool.com' }).then(user => {
            assert(user === null);
            done();
          });
        });
    });
  });
});
