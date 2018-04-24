const businessRouter = require('./businessRoute');

module.exports = (app) => {
  app.use('/api/v1/business', businessRouter);
}
