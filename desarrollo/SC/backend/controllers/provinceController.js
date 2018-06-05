const Province = require('mongoose').model('Province');

exports.getAll = (req, res) => {
  Province.find(req.query.filter, (err, provinces) => {
    if (err) throw err;
    res.status(200).send(provinces);
  });
}
