const Department = require('mongoose').model('Department');

exports.getAll = (req, res) => {
  Department.find(req.query.filter, (err, departments) => {
    if (err) throw err;
    res.status(200).send(departments);
  });
}
