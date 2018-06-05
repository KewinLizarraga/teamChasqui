const District = require('mongoose').model('District');

exports.getAll = (req, res) => {
  District.find(req.query.filter).populate('province_id').exec((err, districts) => {
    if (err) throw err;
    res.status(200).send(districts);
  });
}
