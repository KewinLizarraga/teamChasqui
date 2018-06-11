const Reply = require('mongoose').model('Reply');
const Question = require('mongoose').model('Question');
const User = require('mongoose').model('User');
const async = require('async');
const { isInArray } = require('../services/array');

exports.getAll = (req, res) => {
  let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  Reply.find(req.query.filter).select(hiddenFields).exec((err, replies) => {
    if (err) throw err;
    res.status(200).send(replies);
  });
}

exports.create = (req, res) => {
  async.waterfall([(cb) => {
    User.findById(req.decoded._id, (err, user) => {
      if (err) throw err;
      if (!user) return cb({ status: 400, data: { success: false, message: 'User has not been found' } });
      cb(null, {
        user
      });
    });
  }, (response, cb) => {
    Question.findById(req.body.question_id, (err, question) => {
      if (err) throw err;
      if (!question) return cb({ status: 400, data: { success: false, message: 'Question has not been found' } });
      response.question = question;
      return cb(null, response);
    })
  }, (response, cb) => {
    async.parallel([(cb) => {
      Reply.create({ user_id: req.decoded._id, ...req.body }, (err, reply) => {
        if (err) return cb({ status: 500, data: { success: false, message: err.message } });
        cb(null, reply);
      });
    }, (cb) => {
      response.question.reply_count++;
      response.question.save((err, newQuestion) => {
        if (err) return cb({ status: 500, data: { success: false, message: err.message } });
        cb(null, newQuestion);
      });
    }], (err, data) => {
      if (err) return cb(err);
      return cb(null, data);
    });
  }, (response, cb) => {
    cb(null, {
      user: req.decoded,
      question: response[1],
      reply: response[0]
    })
  }], (err, result) => {
    if (err) return res.status(err.status).send(err.data);
    return res.send(result);
  });
}

exports.update = (req, res) => {
  const { method } = req.query;
  Reply.findById(req.params.id, (err, reply) => {
    if (err) throw err;
    if (!reply) return res.status(400).send({ success: false, message: 'Reply has not been found' });
    if (method === 'like' || method === 'dislike') {
      if (isInArray(req.decoded._id, reply.vote_users)) {
        if (req.decoded.type !== 'admin') return res.status(500).send({ success: false, message: 'You only can vote once' });
      } else {
        reply.vote_users.push(req.decoded._id);
      }
      reply[`${method}s_count`]++;
    } else {
      reply.message = req.body.message;
    }
    reply.save((err, reply) => {
      if (err) return res.status(500).send({ success: false, message: err.message });
      res.status(200).send(reply);
    })
    
  });

}
