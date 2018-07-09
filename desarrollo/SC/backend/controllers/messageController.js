const Message = require('mongoose').model('Message');

exports.getAll = (req, res) => {
  let hiddenFields = ['-createdAt', '-updatedAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  Message.find(req.query.filter).select(hiddenFields).exec((err, messages) => {
    if (err) throw err;
    res.status(200).send(messages);
  });
}

exports.create = (req, res) => {
  Message.create(req.body, (err, message) => {
    if (err) return res.status(500).send({ success: false, message: err.message });
    Message.addToChat(message, (err, chat) => {
      if (err) return res.status(err.status).send(err.message);
      const populatedChat = chat.populate({ path: 'user_id', fields: ['first_name', 'last_name', 'photo', 'email']})
      res.status(200).send({ chat, message });
    });
  });
}
