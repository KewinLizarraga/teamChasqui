const businessRouter = require('./businessRoute');
const userRouter = require('./userRouter');

module.exports = (app) => {
  app.use('/api/v1/business', businessRouter);
  app.use('/api/v1', userRouter);
}
