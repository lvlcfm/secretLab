const User = require('../models/user');

module.exports = {
  create(req, res, next) {
    const userProps = req.body;

    User.create(userProps)
      .then(user => res.send(user))
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
        console.log(retUser);
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
