const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const { config } = require('./config/keys');

require('./models');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);


mongoose.connect(config.mongoURI)
  .then(db => console.log('Connected to MongoDB'))
  .catch(err => console.log('Not connected to database', err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));

require('./socket')(io);

app.get('/', (req, res) => {
  res.send('Chasqui backend');
});

require('./routes')(app);

const PORT = process.env.PORT || 8000;
server.listen(PORT, (err) => console.log(`Listening on port ${PORT}`));
