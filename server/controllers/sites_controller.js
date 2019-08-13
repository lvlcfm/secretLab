const Site = require('../models/site');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },
  create(req, res, next) {
    const siteProps = req.body;
    Site.create(siteProps)
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
