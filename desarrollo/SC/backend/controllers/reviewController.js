const Review = require('mongoose').model('Review');
const User = require('mongoose').model('User');
const Business = require('mongoose').model('Business');
const async = require('async');

exports.getAll = (req, res) => {
  let hiddenFields = ['-createdAt', '-updatedAt', '-__v', '-belongs_to'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  Review.find(req.query.filter).select(hiddenFields).exec((err, reviews) => {
    if (err) throw err;
    res.status(200).send(reviews);
  });
}

exports.create = (req, res) => {
  async.waterfall([
    (cb) => {
      User.findById(req.decoded._id, (err, user) => {
        if (err) throw err;
        if (!user) return cb({ status: 400, data: { success: false, message: 'User has not been found' } });
        cb(null, {
          user
        });
      });
    }, (response, cb) => {
      Business.findById(req.body.business_id, (err, business) => {
        if (err) throw err;
        if (!business) return cb({ status: 400, data: { success: false, message: 'Business has not been found' } });
        response.business = business;
        cb(null, response);
      });
    }, (response, cb) => {
      async.parallel([
        (cb) => {
          Review.create({ user_id: req.decoded._id, ...req.body }, (err, review) => {
            if (err) return cb({ status: 500, data: { success: false, message: err.message } });
            cb(null, review);
          });
        }, (cb) => {
          response.user.review_count++;
          response.user.save((err, newUser) => {
            if (err) return cb({ status: 500, data: { success: false, message: err.message } });
            cb(null, newUser);
          });
        }, (cb) => {
          const newStars = Business.getNewStars(response.business.stars, response.business.review_count, req.body.stars);
          response.business.stars = newStars;
          response.business.review_count++;
          response.business.save((err, newBusiness) => {
            if (err) return cb({ status: 500, data: { success: false, message: err.message } });
            cb(null, newBusiness);
          });
        }
      ], (err, data) => {
        if (err) return cb(err);
        return cb(null, data);
      })
    }, (response, cb) => {
      cb(null, {
        user: req.decoded,
        business: response[2],
        review: response[0]
      });
    }
  ], (err, result) => {
    if (err) return res.status(err.status).send(err.data);
    res.status(200).send(result);
  });
}

exports.update = (req, res) => {
  Review.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, review) => {
    if (err) return res.status(500).send({ success: false, message: err.message });
    Review.populate(review, { path: 'user_id' }, (err, populatedReview) => {
      if (err) return res.status(500).send({ success: false, message: err.message });
      return res.status(200).send(populatedReview);
    })
  });
}
