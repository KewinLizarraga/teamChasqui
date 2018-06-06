const MoneyType = require('mongoose').model('MoneyType');

exports.getAll = (req, res) => {
  const hiddenFields = ['-updatedAt', 'createdAt', '__v'];

  MoneyType.find(req.query.filter).select(hiddenFields).exec((err, moneyTypes) => {
    if (err) throw err;
    res.status(200).send(moneyTypes);
  });
}
