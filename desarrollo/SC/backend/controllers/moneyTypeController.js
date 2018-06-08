const MoneyType = require('mongoose').model('MoneyType');

exports.getAll = (req, res) => {
  const hiddenFields = ['-updatedAt', '-createdAt', '-__v'];

  MoneyType.find(req.query.filter).select(hiddenFields).exec((err, moneyTypes) => {
    if (err) throw err;
    res.status(200).send(moneyTypes);
  });
}

exports.create = (req, res) => {
  MoneyType.create(req.body, (err, moneyType) => {
    if (err) return res.status(500).send({ success: false, message: err.message });
    res.status(200).send(moneyType);
  })
}
