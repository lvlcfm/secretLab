const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

const Site = require('../../models/site');

describe('Sites controller', () => {
  xit('Post to /api/sites creates a new Site', done => {
    Site.count().then(count => {
      request(app)
        .post('/api/sites')
        .send({
          schoolName: 'encinal'
        })
        .end(() => {
          Site.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });
  xit('PUT to /api/sites/id edits an existing site', done => {
    const newSite = new Site({
      schoolName: 'encinalTwo'
    });
    newSite.save().then(() => {
      request(app)
        .put(`/api/sites/${newSite._id}`)
        .send({ schoolName: 'notEncinal' })
        .end(() => {
          Site.findOne({ schoolName: 'notEncinal' }).then(updateSite => {
            assert(updateSite.schoolName === 'notEncinal');
            done();
          });
        });
    });
  });
  it('DELETE to /api/sites/id can delete a site', done => {
    const site = new Site({ schoolName: 'testSchool' });
    site.save().then(() => {
      request(app)
        .delete(`/api/sites/${site._id}`)
        .end(() => {
          Site.findOne({ schoolName: 'testSchool' }).then(site => {
            assert(site === null);
            done();
          });
        });
    });
  });
});
