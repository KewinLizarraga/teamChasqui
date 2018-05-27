const Role = require('mongoose').model('Role');

exports.create = (req, res) => {
  console.log(req.body);
  Role.create(req.body, (err, role) => {
    if (err) return res.status(500).send({ success: false, message: err.message });
    res.status(200).send(role);
  });
}
