const Site = require('../models/site');
const SiteTime = require('../models/siteTime');

module.exports = {
  async create(req, res, next) {
    const siteProps = req.body.siteProps;
    const siteTimeProps = req.body.siteTimeProps;
    const newSite = new Site(siteProps);
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
      .populate({ path: 'siteTimes', model: 'SiteTime' })
      .then(site => {
        res.send(site);
      })
      .catch(next);
  },
  async edit(req, res, next) {
    const siteId = req.params.id;
    const siteProps = req.body;
    const siteTimeProps = siteProps.siteTimes;
    var newSiteTimes = [];
    var allSiteTimes = [];
    for (let index = 0; index < siteTimeProps.length; index++) {
      const siteTimeEl = siteTimeProps[index];
      if (siteTimeEl.hasOwnProperty('siteType')) {
        newSiteEl = new SiteTime({
          day: siteTimeEl.day,
          startTime: siteTimeEl.startTime,
          endTime: siteTimeEl.endTime,
          siteNumber: siteTimeEl.siteNumber
        });
        const newSiteElRet = await newSiteEl.save();
        newSiteTimes.push(newSiteElRet);
      }
    }
    for (let index = 0; index < siteTimeProps.length; index++) {
      const originalSiteElement = siteTimeProps[index];
      if (originalSiteElement.hasOwnProperty('_id')) {
        allSiteTimes.push(originalSiteElement);
      }
    }
    for (let index = 0; index < newSiteTimes.length; index++) {
      const newSiteElement = newSiteTimes[index];
      allSiteTimes.push(newSiteElement);
    }

    siteProps.siteTimes = allSiteTimes;
    Site.findByIdAndUpdate({ _id: siteId }, siteProps)
      .then(() => Site.findById({ _id: siteId }))
      .then(site => {
        res.send(site);
      })
      .catch(next);
  },
  delete(req, res, next) {
    const siteId = req.params.id;
    Site.findByIdAndRemove({ _id: siteId })
      .then(site => res.status(204).send(site))
      .catch(next);
  }
};
