const Invoice = require('mongoose').model('Invoice');
const { setQueryOptions } = require('../services/mongo');

exports.getAll = (req, res) => {
	let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
	if (req.query.details === 'true') {
		hiddenFields = [];
  }
  
  const populatePaths = ['', '', ''];
  const query = setQueryOptions(Invoice.find(req.query.filter), populatePaths, hiddenFields, req.query.mode);

	query.exec((err, invoices) => {
		if (err) throw err;
		res.status(200).send(invoices);
  });
}

exports.create = (req, res) => {
	Invoice.create(req.body, (err, invoices) => {
		if (err) return res.status(500).send({ success: false, message: err.message });
		res.status(200).send(invoices);
	});
}
