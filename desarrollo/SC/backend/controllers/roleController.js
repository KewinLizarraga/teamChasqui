const Role = require('mongoose').model('Role');

exports.getAll = (req, res) => {
  const { belong_to } = req.query.filter || '';
  let filter = {};
  if (belong_to) {
    filter = { belong_to };
  }

  let hiddenFields = ['-createdAt', '-updatedAt', '-__v', '-belongs_to'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  Role.find(filter).select(hiddenFields).exec((err, roles) => {
    if (err) throw err;
    res.status(200).send(roles);
  })
}

exports.create = (req, res) => {
  Role.create(req.body, (err, role) => {
    if (err) return res.status(500).send({ success: false, message: err.message });
    res.status(200).send(role);
  });
}
