const Product = require('mongoose').model('Product');
const { setQueryOptions } = require('../services/mongo');

exports.getAll = (req, res) => {
  // filter -> type (to know if a product is either plan or ad)
  // filter -> name (to filter by name)

  let hiddenFields = ['-createdAt', '-updatedAt', '-__v', '-belongs_to'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  const populatePath = ['plan_detail.service_plans', '', ''];

  const query = setQueryOptions(Product.find(req.query.filter), populatePath, hiddenFields, req.query.mode);

  query.exec((err, products) => {
    if (err) throw err;
    res.status(200).send(products);
  });
}

exports.create = (req, res) => {
  Product.create(req.body, (err, product) => {
    if (err) return res.status(500).send({ success: false, message: err.message });
    res.status(200).send(product);
  })
}
