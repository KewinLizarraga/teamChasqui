const Business = require('mongoose').model('Business')

exports.getAll = (req, res) => {
  const { filter } = req.query;
  Business.find(filter, (err, businesses) => {
    if (err) throw err;
    if (!filter) {
      const orderedBusinesses = {};
      businesses.forEach(business => {
        if (orderedBusinesses[business.type] === undefined) {
          orderedBusinesses[business.type] = [business];
        } else {
          orderedBusinesses[business.type].push(business);
        }
      });
      return res.status(200).send(orderedBusinesses);
    }
    return res.status(200).send(businesses);
  });
}

exports.create = (req, res) => {
  const { type } = req.body;
  Business.create(req.body, (err, newBusiness) => {
    res.send(newBusiness);
  });
}
