const District = require('mongoose').model('District');
const { getPopulateOptions } = require('../services/mongo');

exports.getAll = (req, res) => {
  let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  let populatePaths = ['province_id', 'department_id', 'country_id'];
  const populateOptions = getPopulateOptions(populatePaths, hiddenFields, req.query.mode);

  District.find(req.query.filter).populate(populateOptions).select(hiddenFields).exec((err, districts) => {
    if (err) throw err;
    res.status(200).send(districts);
  });
}
