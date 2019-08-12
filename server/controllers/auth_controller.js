const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },
  login(req, res, next) {
    const profileObj = req.body;
    User.findOne({ googleId: profileObj.googleId }, (err, retUser) => {
      if (err) {
        return next(err);
      }
      if (retUser) {
        jwt.sign(
          { id: retUser._id },
          process.env.JWT_SECRET,
          {
            expiresIn: '1d'
          },
          (err, token) => {
            if (err) {
              next(new Error('Invalid login'));
            } else {
              res.setHeader('authorization', token);
              res.status(200).json({ token, user: retUser });
            }
          }
        );
      } else {
        return res.status(422).send({ error: 'User not found' });
      }
    });
  },
  logout(req, res, next) {
    res.send({ payload: 'logout' });
  },
  google(req, res, next) {
    res.send({ payload: 'logout' });
  },
  signup(req, res, next) {
    const profileObj = req.body;
    User.findOne({ googleId: profileObj.googleId }, (err, retUser) => {
      if (err) {
        return next(err);
      }
      if (retUser) {
        return res.status(422).send({ error: 'Email is in use' });
      }
      const newUser = new User({
        email: profileObj.email,
        googleId: profileObj.googleId,
        firstName: profileObj.givenName,
        lastName: profileObj.familyName
      });
      newUser.save().then(() =>
        User.findById({ _id: newUser._id })
          .then(retUser => {
            jwt.sign(
              { id: retUser._id },
              process.env.JWT_SECRET,
              {
                expiresIn: '1d'
              },
              (err, token) => {
                if (err) {
                  next(new Error('Invalid login'));
                } else {
                  res.setHeader('authorization', token);
                  res.status(200).json({ token, user: retUser });
                }
              }
            );
          })
          .catch(next)
      );
    });
  }
};
