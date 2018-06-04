const businessRoutes = require('./businessRoutes');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const roleRoutes = require('./roleRoutes');
const servicePlanRoutes = require('./servicePlanRoutes');
const productRoutes = require('./productRoutes');

module.exports = (app) => {
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/businesses', businessRoutes);
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/roles', roleRoutes);
  app.use('/api/v1/service-plans', servicePlanRoutes);
  app.use('/api/v1/products', productRoutes);
}
