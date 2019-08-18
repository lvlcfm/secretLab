const User = require('../models/user');
const Roster = require('../models/roster');

module.exports = {
  create(req, res, next) {
    const userProps = req.body;

    User.create(userProps)
      .then(user => res.send(user))
      .catch(next);
  },
  joinSiteTime(req, res, next) {
    const siteTimeProps = req.body;
    User.findByIdAndUpdate(
      { _id: siteTimeProps.userId },
      { $push: { siteTimes: siteTimeProps.siteTimeId } }
    )
      .then(retUser => {
        Roster.create({
          user_id: siteTimeProps.userId,
          siteTime_id: siteTimeProps.siteTimeId,
          site_id: siteTimeProps.siteId
        }).then(rosterEntry => {
          res.send(rosterEntry);
        });
      })
      .catch(next);
  },
  leaveSiteTime(req, res, next) {
    const siteTimeProps = req.body;
    User.findById({ _id: siteTimeProps.userId })
      .then(retUser => {
        retUser.siteTimes.pull(siteTimeProps.siteTimeId);
        retUser.save().then(retUpdateUser => {
          Roster.findOneAndDelete({
            $and: [
              { user_id: siteTimeProps.userId },
              { siteTime_id: siteTimeProps.siteTimeId }
            ]
          }).then(retRosterEntry => {
            res.send(retRosterEntry);
          });
        });
      })
      .catch(next);
  },
  getUserById(req, res, next) {
    const userId = req.params.id;
    User.findById({ _id: userId })
      .populate({
        path: 'sites',
        model: 'Site'
      })
      .then(retUser => {
        res.send(retUser);
      })
      .catch(next);
  },
  getUserSiteTimes(req, res, next) {
    const userId = req.params.id;
    User.findById({ _id: userId })
      .populate({
        path: 'siteTimes',
        model: 'SiteTime'
      })
      .then(retUser => {
        res.send(retUser);
      })
      .catch(next);
  },
  edit(req, res, next) {
    const userId = req.params.id;
    const userProps = req.body;
    User.findByIdAndUpdate({ _id: userId }, userProps)
      .then(() => User.findById({ _id: userId }))
      .then(user => res.send(user))
      .catch(next);
  },
  delete(req, res, next) {
    const userId = req.params.id;
    User.findByIdAndRemove({ _id: userId })
      .then(user => res.status(204).send(user))
      .catch(next);
  }
};
