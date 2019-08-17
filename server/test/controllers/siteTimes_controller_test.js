const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

const SiteTime = require('../../models/siteTime');
const Site = require('../../models/site');

describe('SiteTimes controller', () => {
  it('Post to /api/sitetimes creates a new Site', done => {
    const newSite = new Site({
      schoolName: 'encinalTwo'
    });
    newSite.save().then(() => {
      SiteTime.count().then(count => {
        request(app)
          .post('/api/sitetimes')
          .send({
            day: 'Monday',
            startTime: Date.now(),
            endTime: Date.now(),
            siteNumber: 0,
            site_id: newSite._id
          })
          .end(() => {
            SiteTime.count().then(newCount => {
              assert(count + 1 === newCount);
              done();
            });
          });
      });
    });
  });

  it('PUT to /api/sitetimes/:id edits an existing site', done => {
    const newSite = new Site({
      schoolName: 'gw'
    });

    newSite.save().then(() => {
      const newSiteTime = new SiteTime({
        day: 'Monday',
        startTime: Date.now(),
        endTime: Date.now(),
        siteNumber: 0,
        site_id: newSite._id
      });
      newSiteTime.save().then(() => {
        request(app)
          .put(`/api/sitetimes/${newSiteTime._id}`)
          .send({ day: 'Tuesday' })
          .end(() => {
            SiteTime.findOne({ _id: newSiteTime._id })
              .populate({ path: 'site_id', ref: 'Site' })
              .then(updateSiteTime => {
                assert(updateSiteTime.day === 'Tuesday');
                done();
              });
          });
      });
    });
  });
  xit('DELETE to /api/sitetimes/:id can delete a site', done => {
    const site = new SiteTime({ schoolName: 'testSchool' });
    site.save().then(() => {
      request(app)
        .delete(`/api/sitetimes/${site._id}`)
        .end(() => {
          SiteTime.findOne({ schoolName: 'testSchool' }).then(site => {
            assert(site === null);
            done();
          });
        });
    });
  });
});
