const Business = require('mongoose').model('Business');
const Review = require('mongoose').model('Review');
const async = require('async');

exports.isOwner = (req, res, next) => {
  async.parallel([
    (cb) => {
      Review.findById(req.params.id, (err, review) => {
        if (err) throw err;
        if (!review) return cb({ status: 400, data: { success: false, message: 'Review has not been found' } });
        cb(null, review.business_id);
      })
    }, (cb) => {
      Business.findOne({ user_id: req.decoded._id }, (err, business) => {
        if (err) throw err;
        if (!business) return cb({ status: 400, data: { success: false, message: 'User is only allowed to modify his own Business' } });
        cb(null, business._id);
      });
    }
  ], (err, result) => {
    if (err) return res.status(err.status).send(err.data);
    if (result[0].toString() !== result[1].toString()) return res.status(400).send({
      success: false,
      message: 'User is only allowed to modify his own Business.'
    });
    next();
  });
}
