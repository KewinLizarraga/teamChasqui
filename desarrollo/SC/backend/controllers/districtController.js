const District = require('mongoose').model('District');
const { setQueryOptions } = require('../services/mongo');

exports.getAll = (req, res) => {
  let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  let populatePaths = ['province_id', 'department_id', 'country_id'];
  const query = setQueryOptions(District.find(req.query.filter), populatePaths, hiddenFields, req.query.mode);

  query.exec((err, districts) => {
    if (err) throw err;
    res.status(200).send(districts);
  });
}

exports.getOne = (req, res) => {
  let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  let populatePaths = ['province_id', 'department_id', 'country_id'];

  const query = setQueryOptions(District.findById(req.params.id), populatePaths, hiddenFields, req.query.mode);

  query.exec((err, district) => {
    if (err) throw err;
    if (!district) return res.status(500).send({ success: false, message: 'ID is not related with any District' });

    res.status(200).send(district);
  })
}


