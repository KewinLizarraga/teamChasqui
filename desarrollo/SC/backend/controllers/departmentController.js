const Department = require('mongoose').model('Department');

exports.getAll = (req, res) => {
  let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  let populatePath = '';
  if (req.query.mode === 'populated') {
    populatePath = 'country_id';
  }

  Department.find(req.query.filter)
    .populate(populatePath, hiddenFields)
    .select(hiddenFields)
    .exec((err, departments) => {
      if (err) throw err;
      res.status(200).send(departments);
    });
}
