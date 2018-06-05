const Province = require('mongoose').model('Province');
const { getPopulateOptions } = require('../services/mongo');

exports.getAll = (req, res) => {
  let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  let populatePaths = ['department_id', 'country_id', ''];
  const populateOptions = getPopulateOptions(populatePaths, hiddenFields, req.query.mode)

  Province.find(req.query.filter)
    .populate(populateOptions)
    .select(hiddenFields)
    .exec((err, provinces) => {
      if (err) throw err;
      res.status(200).send(provinces);
    });
}
