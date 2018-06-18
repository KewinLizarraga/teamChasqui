const FoodType = require('mongoose').model('FoodType');

exports.getAll = (req, res) => {
	let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
	if (req.query.details === 'true') {
		hiddenFields = [];
	}

	FoodType.find(req.query.filter).select(hiddenFields).exec((err, foodTypes) => {
		if (err) throw err;
		res.status(200).send(foodTypes);
	});
}

exports.create = (req, res) => {
	FoodType.create(req.body, (err, foodTypes) => {
		if (err) return res.status(500).send({ success: false, message: err.message });
		res.status(200).send(foodTypes);
	});
}
