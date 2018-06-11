const Province = require('mongoose').model('Province');
const { setQueryOptions } = require('../services/mongo');

exports.getAll = (req, res) => {
  let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  let populatePaths = ['department_id', 'country_id', ''];
  const query = setQueryOptions(Province.find(req.query.filter), populatePaths, hiddenFields, req.query.mode)

  query.exec((err, provinces) => {
    if (err) throw err;
    res.status(200).send(provinces);
  });
}
