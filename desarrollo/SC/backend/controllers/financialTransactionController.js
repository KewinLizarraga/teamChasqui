const FinancialTransaction = require('mongoose').model('FinancialTransaction');

exports.getAll = (req, res) => {
	let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
	if (req.query.details === 'true') {
		hiddenFields = [];
	}

	FinancialTransaction.find(req.query.filter).select(hiddenFields).exec((err, financialTransactions) => {
		if (err) throw err;
		res.status(200).send(financialTransactions);
	});
}

exports.create = (req, res) => {
	FinancialTransaction.create(req.body, (err, financialTransactions) => {
		if (err) return res.status(500).send({ success: false, message: err.message });
		res.status(200).send(financialTransactions);
	});
}
