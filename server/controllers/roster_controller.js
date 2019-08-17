const Roster = require('../models/roster');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },
  create(req, res, next) {
    const rosterProps = req.body;
    Roster.create(rosterProps)
      .then(rosterItem => res.send(rosterItem))
      .catch(next);
  },
  index(req, res, next) {
    Roster.find()
      .then(roster => {
        res.send(roster);
      })
      .catch(next);
  },
  getRosterEntriesBySite(req, res, next) {
    const rosterProps = req.body;
    Roster.find({ site_id: rosterProps.siteId })
      .populate({
        path: 'siteTime_id',
        model: 'SiteTime'
      })
      .populate({ path: 'site_id', model: 'Site' })
      .populate({ path: 'user_id', model: 'User' })
      .then(rosterEntries => {
        res.send(rosterEntries);
      })
      .catch(next);
  },
  getRosterEntriesBySiteTime(req, res, next) {
    const rosterProps = req.body;
    Roster.find({ siteTime_id: rosterProps.siteTimeId })
      .populate({
        path: 'siteTime_id',
        model: 'SiteTime'
      })
      .populate({ path: 'site_id', model: 'Site' })
      .populate({ path: 'user_id', model: 'User' })
      .then(rosterEntries => {
        res.send(rosterEntries);
      })
      .catch(next);
  },
  edit(req, res, next) {
    const rosterId = req.params.id;
    const rosterProps = req.body;
    Roster.findByIdAndUpdate({ _id: rosterId }, rosterProps)
      .then(() => Roster.findById({ _id: rosterId }))
      .then(rosterItem => res.send(rosterItem))
      .catch(next);
  },
  delete(req, res, next) {
    const rosterId = req.params.id;
    Roster.findByIdAndRemove({ _id: rosterId })
      .then(roster => res.status(204).send(roster))
      .catch(next);
  }
};
