const Product = require('mongoose').model('Product');

exports.getAll = (req, res) => {
  // filter -> type (to know if a product is either plan or ad)
  // filter -> name (to filter by name)

  let populatePath = '';
  const fields = req.query.fields || ['order', 'description'];

  if (req.query.mode === 'populated') {
    populatePath = 'plan_detail.service_plans';
  }

  Product.find(req.query.filter).populate(populatePath, fields).exec((err, products) => {
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
