const businessRoutes = require('./businessRoutes');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const roleRoutes = require('./roleRoutes');
const servicePlanRoutes = require('./servicePlanRoutes');
const productRoutes = require('./productRoutes');
const countryRoutes = require('./countryRoutes');
const departmentRoutes = require('./departmentRoutes');
const provinceRoutes = require('./provinceRoutes');
const districtRoutes = require('./districtRoutes');
const billingRoutes = require('./billingRoutes');
const moneyTypeRoutes = require('./moneyTypeRoutes');
const serviceRoutes = require('./serviceRoutes');

module.exports = (app) => {
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/businesses', businessRoutes);
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/roles', roleRoutes);
  app.use('/api/v1/service-plans', servicePlanRoutes);
  app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/countries', countryRoutes);
  app.use('/api/v1/departments', departmentRoutes);
  app.use('/api/v1/provinces', provinceRoutes);
  app.use('/api/v1/districts', districtRoutes);
  app.use('/api/v1/stripe', billingRoutes);
  app.use('/api/v1/money-types', moneyTypeRoutes);
  app.use('/api/v1/services', serviceRoutes);
}
