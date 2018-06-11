const Service = require('mongoose').model('Service');

exports.getAll = (req, res) => {
  const hiddenFields = ['-updatedAt', '-createdAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = []
  }

  Service.find(req.query.filter).select(hiddenFields).exec((err, services) => {
    if (err) throw err;
    res.status(200).send(services);
  })
}

exports.create = (req, res) => {
  Service.create(req.body, (err, service) => {
    if (err) return res.status(500).send({ success: false, message: err.message });
    res.status(200).send(service);  
  })
}
