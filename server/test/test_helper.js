const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/secretlabs_test', {
    useNewUrlParser: true
  });
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', error);
    });
});

beforeEach(done => {
  const {
    users,
    sites,
    lessons,
    requests,
    sitetimes,
    rosters
  } = mongoose.connection.collections;
  users
    .drop()
    .then(() =>
      sites
        .drop()
        .then(() =>
          lessons
            .drop()
            .then(() =>
              requests
                .drop()
                .then(() =>
                  sitetimes.drop().then(() => rosters.drop().then(() => done()))
                )
            )
        )
    )
    .catch(() => done());
});
