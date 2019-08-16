const SiteTime = require('../models/siteTime');

module.exports = {
  create(req, res, next) {
    const siteTimeProps = req.body;
    SiteTime.create(siteTimeProps)
      .then(siteTime => res.send(siteTime))
      .catch(next);
  },
  edit(req, res, next) {
    const siteTimeId = req.params.id;
    const siteTimeProps = req.body;
    SiteTime.findByIdAndUpdate({ _id: siteTimeId }, siteTimeProps)
      .then(() =>
        SiteTime.findById({ _id: siteTimeId }).populate({
          path: 'site_id',
          model: 'Site'
        })
      )
      .then(siteTime => res.send(siteTime))
      .catch(next);
  },
  delete(req, res, next) {
    const siteTimeId = req.params.id;
    SiteTime.findByIdAndRemove({ _id: siteTimeId })
      .then(siteTime => res.status(204).send(siteTime))
      .catch(next);
  }
};
