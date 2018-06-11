const Business = require('mongoose').model('Business');

exports.getAll = (req, res) => {
  const { filter } = req.query;
  Business.find(filter, (err, businesses) => {
    if (err) throw err;
    if (!filter) {
      const orderedBusinesses = {
        hotel: [],
        restaurant: [],
        travel_agency: []
      };
      businesses.forEach(business => {
        if (orderedBusinesses[business.type] === undefined) {
          orderedBusinesses[business.type] = [business];
        } else {
          orderedBusinesses[business.type].push(business);
        }
      });
      return res.status(200).send(orderedBusinesses);
    }
    return res.status(200).send(businesses);
  });
}

exports.getOne = (req, res) => {
  Business.findById(req.params.id, (err, business) => {
    if (err || !business) return res.status(400).send({ success: false, message: `Business has not been found with ${req.params.id}` });
    res.status(200).send(business);
  })
}

exports.create = (req, res) => {
  Business.create(req.body, (err, newBusiness) => {
    res.send(newBusiness);
  });
}

exports.getReviews = (req, res) => {
  let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
  if (req.query.details === 'true') { 
    hiddenFields = [];
  }
  Business.getReviews(req.params.id, hiddenFields, (err, reviews) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(reviews);
  });
}

exports.getQuestions = (req, res) => {
  let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }
  Business.getQuestions(req.params.id, hiddenFields, (err, questions) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(questions);
  });
}
