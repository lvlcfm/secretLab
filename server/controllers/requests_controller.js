const Request = require('../models/request');

module.exports = {
  index(req, res, next) {
    Request.find()
      .then(retRequests => res.send(retRequests))
      .catch(next);
  },
  create(req, res, next) {
    const requestProps = req.body;
    Request.create(requestProps)
      .then(request => res.send(request))
      .catch(next);
  },
  edit(req, res, next) {
    const requestId = req.params.id;
    const requestProps = req.body;
    Request.findByIdAndUpdate({ _id: requestId }, requestProps)
      .then(() => Request.findById({ _id: requestId }))
      .then(retRequest => res.send(retRequest))
      .catch(next);
  },
  delete(req, res, next) {
    const requestId = req.params.id;
    Request.findByIdAndRemove({ _id: requestId })
      .then(request => res.status(204).send(request))
      .catch(next);
  }
};
