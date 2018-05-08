const Business = require('mongoose').model('Business')

exports.getAll = (req, res) => {
  const { filter } = req.query;
  Business.find(filter, (err, businesses) => {
    if (err) throw err;
    return res.status(200).send(businesses);
  });
}
