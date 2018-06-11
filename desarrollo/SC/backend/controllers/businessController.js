const Business = require('mongoose').model('Business');

exports.getAll = (req, res) => {
  const { filter } = req.query;

  let hiddenFields = [
    'name',
    'geo_location',
    'stars',
    'type',
    'photos',
    'review_count',
    'question_count',
    'deleted',
    'price'
  ];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  Business.find(filter).select(hiddenFields).exec((err, businesses) => {
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
  let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
  if (req.query.details ==='true') {
    hiddenFields = [];
  }

  const query = Business.findById(req.params.id);

  const populatePaths = [{
    path: 'money_types',
    fields: ['name']
  }, {
    path: 'user_id',
    fields: ['first_name', 'last_name', 'email']
  }, {
    path: 'hotel_detail.services',
    fields: ['name',  'deleted']
  }];
  if (req.query.mode == 'populated') {
    for (path of populatePaths) {
      console.log(path);
      query.populate({
        path: path.path,
        select: req.query.details === 'true' ? [] : path.fields
      });
    }
  }

  query.select(hiddenFields).exec((err, business) => {
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
