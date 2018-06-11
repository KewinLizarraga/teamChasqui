const ServicePlan = require('mongoose').model('ServicePlan');
const Product = require('mongoose').model('Product');

exports.getAll = (req, res) => {
  // FILTER HAS 'belongs_to' to know which service (plate, gold or platinium) it belongs
  ServicePlan.find(req.query.filter, (err, servicePlans) => {
    if (err) throw err;
    res.status(200).send(servicePlans);
  });
}

exports.create = (req, res) => {
  // IMPORTANT!!!! JUST CREATE BY TYPE OF PRODUCT, EXAMPLE: AN ARRAY OF SILVER | AN ARRAY OF GOLD, NOT AN ARRAY OF BOTH
  const data = Array.isArray(req.body) ? req.body : [req.body];
  const belongs_to = data[0].belongs_to;

  Product.findOne({ name: belongs_to }, (err, product) => {
    if (err) throw err;
    if (!product) return res.status(400).send({ success: false, message: 'Product related with this Plan has not found' });

    ServicePlan.create(req.body, (err, servicePlans) => {
      if (err) return res.status(500).send({ success: false, message: err.message });

      servicePlans.forEach(servicePlan => {
        product.plan_detail.service_plans.push(servicePlan._id);
      });

      product.save(err => {
        if (err) return res.status(500).send({ success: false, message: err.message });
        res.status(200).send(servicePlans);
      });
    });
  });
}
