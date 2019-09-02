require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');
const morgan = require('morgan');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'development') {
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@${process.env.MONGO_ENDPOINT}`,
    { useNewUrlParser: true }
  );
} else if (process.env.NODE_ENV !== 'test') {
  console.log('i guess our process environment is here?');
  console.log(process.env.NODE_ENV);
  mongoose.connect('mongodb://localhost/secretlabs', { useNewUrlParser: true });
}

const app = express();
app.use(morgan('combined'));
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
