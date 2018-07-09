const Location = require('mongoose').model('Location');

exports.getAll = (req, res) => {
	let hiddenFields = ['-updatedAt', '-__v'];
	if (req.query.details === 'true') {
		hiddenFields = [];
	}

	Location.find(req.query.filter).select(hiddenFields).exec((err, locations) => {
		if (err) throw err;
		res.status(200).send(locations);
	});
}

exports.create = (req, res) => {
	Location.create(req.body, (err, locations) => {
		if (err) return res.status(500).send({ success: false, message: err.message });
		res.status(200).send(locations);
	});
}
