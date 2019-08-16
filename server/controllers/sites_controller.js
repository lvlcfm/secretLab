const Site = require('../models/site');
const SiteTime = require('../models/siteTime');

module.exports = {
  async create(req, res, next) {
    const siteProps = req.body.siteProps;
    const siteTimeProps = req.body.siteTimeProps;
    const newSite = new Site(siteProps);
    console.log(req.body);
    console.log(req.body.siteTimeProps);
    console.log('that was siteTimeProps');
    console.log(req.body.siteProps);
    console.log('that was siteProps');
    await newSite.save();
    var SITE_TIMES = [];
    for (let index = 0; index < siteTimeProps.length; index++) {
      const siteTimePropsItem = siteTimeProps[index];
      const siteTimeItem = new SiteTime(siteTimePropsItem);
      siteTimeItem.site_id = newSite._id;
      await siteTimeItem.save();
      SITE_TIMES.push(siteTimeItem._id);
    }
    Site.findByIdAndUpdate({ _id: newSite._id }, { siteTimes: SITE_TIMES })
      .then(site => res.send(site))
      .catch(next);
  },
  index(req, res, next) {
    Site.find()
      .then(sites => {
        res.send(sites);
      })
      .catch(next);
  },
  get(req, res, next) {
    const siteId = req.params.id;
    Site.findById({ _id: siteId })
      .then(site => {
        res.send(site);
      })
      .catch(next);
  },
  edit(req, res, next) {
    const siteId = req.params.id;
    const siteProps = req.body;
    Site.findByIdAndUpdate({ _id: siteId }, siteProps)
      .then(() => Site.findById({ _id: siteId }))
      .then(site => res.send(site))
      .catch(next);
  },
  delete(req, res, next) {
    const siteId = req.params.id;
    Site.findByIdAndRemove({ _id: siteId })
      .then(site => res.status(204).send(site))
      .catch(next);
  }
};
