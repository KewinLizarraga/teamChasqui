const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');

const { config } = require('./config/keys');

const app = express();

mongoose.connect(config.mongoURI)
  .then(db => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send('Chasqui backend');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
