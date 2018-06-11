const VisitorType = require('mongoose').model('VisitorType');

exports.getAll = (req, res) => {
	let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
	if (req.query.details === 'true') {
		hiddenFields = [];
	}

	VisitorType.find(req.query.filter).select(hiddenFields).exec((err, visitorTypes) => {
		if (err) throw err;
		res.status(200).send(visitorTypes);
	});
}

exports.create = (req, res) => {
	VisitorType.create(req.body, (err, visitorTypes) => {
		if (err) return res.status(500).send({ success: false, message: err.message });
		res.status(200).send(visitorTypes);
	});
}
