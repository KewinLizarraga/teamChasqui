const express = require('express');
const mongoose = require('mongoose');

const { config } = require('./config/keys');

mongoose.connect(config.mongoURI)
  .then(db => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const app = express();

app.get('/', (req, res) => {
  res.send('Chasqui backend');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
