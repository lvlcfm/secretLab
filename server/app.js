require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/secretlabs', { useNewUrlParser: true });
}
const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);
app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(422).send({ error: err.message });
});

module.exports = app;
