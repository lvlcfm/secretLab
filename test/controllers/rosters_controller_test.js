const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

const Roster = require('../../models/roster');

describe('Rosters controller', () => {
  it('Post to /api/rosters creates a new RosterEntry', done => {
    Roster.count().then(count => {
      request(app)
        .post('/api/rosters')
        .send({
          site_id: new mongoose.Types.ObjectId()
        })
        .end(() => {
          Roster.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });
  it('PUT to /api/rosters/id edits an existing Roster Entry', done => {
    const fakeSiteId = new mongoose.Types.ObjectId();
    const newFakeSiteId = new mongoose.Types.ObjectId();
    const newRosterEntry = new Roster({
      site_id: fakeSiteId
    });
    newRosterEntry.save().then(() => {
      request(app)
        .put(`/api/rosters/${newRosterEntry._id}`)
        .send({ site_id: newFakeSiteId })
        .end(() => {
          Roster.findOne({ site_id: newFakeSiteId }).then(updateRosterEntry => {
            assert(updateRosterEntry.site_id.equals(newFakeSiteId));
            done();
          });
        });
    });
  });
  it('DELETE to /api/rosters/id can delete a RosterEntry', done => {
    const fakeSiteId = new mongoose.Types.ObjectId();
    const rosterEntry = new Roster({ site_id: fakeSiteId });
    rosterEntry.save().then(() => {
      request(app)
        .delete(`/api/rosters/${rosterEntry._id}`)
        .end(() => {
          Roster.findOne({ site_id: fakeSiteId }).then(rosterEntry => {
            assert(rosterEntry === null);
            done();
          });
        });
    });
  });
});
