const Question = require('mongoose').model('Question');
const User = require('mongoose').model('User');
const Business = require('mongoose').model('Business');
const async = require('async');

exports.getAll = (req, res) => {
  let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  Question.find(req.query.filter).select(hiddenFields).exec((err, questions) => {
    if (err) throw err;
    res.status(200).send(questions);
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
          Question.create({ user_id: req.decoded._id, ...req.body }, (err, question) => {
            if (err) return cb({ status: 500, data: { success: false, message: err.message } });
            cb(null, question);
          });
        }, (cb) => {
          response.business.question_count++;
          response.business.save((err, newBusiness) => {
            if (err) return cb({ status: 500, data: { success: false, message: err.message } });
            cb(null, newBusiness);
          });
        }
      ], (err, data) => {
        if (err) return cb(err);
        return cb(null, data);
      });
    }, (response, cb) => {
      cb(null, {
        user: req.decoded,
        business: response[1],
        question: response[0]
      });
    }
  ], (err, result) => {
    if (err) return res.status(err.status).send(err.data);
    res.status(200).send(result);
  });
}

exports.getReplies = (req, res) => {
  let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  const populatePaths = [{
    path: 'question_id',
    fields: ['reply_count', 'message']
  }, {
    path: 'user_id',
    fields: ['first_name', 'last_name', 'email']
  }];

  Question.getReplies(
    req.params.id,
    hiddenFields,
    populatePaths,
    req,
    (err, replies) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(replies);
    }
  );
}
