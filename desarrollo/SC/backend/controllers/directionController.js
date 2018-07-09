const Direction = require('mongoose').model('Direction');

exports.getAll = (req, res) => {
	let hiddenFields = ['-updatedAt', '-__v'];
	if (req.query.details === 'true') {
		hiddenFields = [];
	}

	Direction.find(req.query.filter).select(hiddenFields).exec((err, directions) => {
		if (err) throw err;
		res.status(200).send(directions);
	});
}

exports.create = (req, res) => {
  const { _id } = req.decoded;
	Direction.create({ user_id: _id }, (err, directions) => {
		if (err) return res.status(500).send({ success: false, message: err.message });
		res.status(200).send(directions);
	});
}


exports.getLocations = (req, res) => {
  let hiddenFields = ['-updatedAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  const populatePaths = [{
    path: 'direction_id',
    fields: ['user_id', 'lat', 'lng']
  }];

  Direction.getLocations(
    req.params.id,
    hiddenFields,
    populatePaths,
    req,
    (err, locations) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(locations);
    }
  );
}
