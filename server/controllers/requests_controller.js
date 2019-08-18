const Request = require('../models/request');
const User = require('../models/user');

module.exports = {
  index(req, res, next) {
    Request.find()
      .populate({
        path: 'requester',
        model: 'User'
      })
      .populate({
        path: 'site_id',
        model: 'Site'
      })
      .populate({
        path: 'approver',
        model: 'User'
      })
      .then(retRequests => res.send(retRequests))
      .catch(next);
  },
  getUserRoleRequests(req, res, next) {
    const userId = req.params.id;
    Request.find({
      $and: [
        { requester: userId },
        { requestType: 'ROLE' },
        { status: 'PENDING' }
      ]
    })
      .then(retRequests => res.send(retRequests))
      .catch(next);
  },
  getUserSiteRequests(req, res, next) {
    const userId = req.params.id;
    Request.find({
      $and: [
        { requester: userId },
        { requestType: 'SITE' },
        { status: 'PENDING' }
      ]
    })
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
    const requestProps = req.body.requestProps;
    const requestType = req.body.requestType;
    if (requestType === 'SITE') {
      if (requestProps.status === 'APPROVED') {
        Request.findByIdAndUpdate({ _id: requestId }, requestProps)
          .then(() => Request.findById({ _id: requestId }))
          .then(retRequest => {
            User.findByIdAndUpdate(
              { _id: retRequest.requester },
              { $push: { sites: retRequest.site_id } }
            )
              .then(retUser => {
                res.send(retRequest);
              })
              .catch(next);
          })
          .catch(next);
      } else {
        Request.findByIdAndUpdate({ _id: requestId }, requestProps)
          .then(() => Request.findById({ _id: requestId }))
          .then(retRequest => res.send(retRequest))
          .catch(next);
      }
    } else if (requestType === 'ROLE') {
      if (requestProps.status === 'APPROVED') {
        Request.findByIdAndUpdate({ _id: requestId }, requestProps)
          .then(() => Request.findById({ _id: requestId }))
          .then(retRequest => {
            User.findByIdAndUpdate(
              { _id: retRequest.requester },
              { role: retRequest.roleRequest }
            )
              .then(retUser => {
                res.send(retRequest);
              })
              .catch(next);
          })
          .catch(next);
      } else {
        Request.findByIdAndUpdate({ _id: requestId }, requestProps)
          .then(() => Request.findById({ _id: requestId }))
          .then(retRequest => res.send(retRequest))
          .catch(next);
      }
    } else {
      console.log('MMMmmMMM');
    }
  },
  delete(req, res, next) {
    const requestId = req.params.id;
    Request.findByIdAndRemove({ _id: requestId })
      .then(request => res.status(204).send(request))
      .catch(next);
  }
};
