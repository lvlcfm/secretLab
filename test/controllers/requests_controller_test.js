const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../../app');

const Request = require('../../models/request');

describe('Requests controller', () => {
  it('Post to /api/requests creates a new Request', done => {
    Request.count().then(count => {
      request(app)
        .post('/api/requests')
        .send({
          requestType: 'SITE'
        })
        .end(() => {
          Request.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });
  xit('PUT to /api/requests/id edits an existing Request', done => {
    const newRequest = new Request({
      requestType: 'SITE'
    });
    newRequest.save().then(() => {
      request(app)
        .put(`/api/requests/${newRequest._id}`)
        .send({
          requestProps: { status: 'APPROVED' },
          requestType: 'ROLE'
        })
        .end(() => {
          Request.findOne({ requestType: 'ROLE' }).then(updateRequest => {
            assert(updateRequest.requestType === 'ROLE');
            done();
          });
        });
    });
  });
  it('DELETE to /api/requests/id can delete a Request', done => {
    const newRequest = new Request({ requestType: 'SITE' });
    newRequest.save().then(() => {
      request(app)
        .delete(`/api/requests/${newRequest._id}`)
        .end(() => {
          Request.findById({ _id: newRequest._id }).then(request => {
            assert(request === null);
            done();
          });
        });
    });
  });
});
