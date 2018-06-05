const Country = require('mongoose').model('Country');

exports.getAll = (req, res) => {
  let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  // hacer que el populate funciona usando mode=populated

  Country.find({}).select(hiddenFields).exec((err, countries) => {
    if (err) throw err;
    res.status(200).send(countries);
  });
}
