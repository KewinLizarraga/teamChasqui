const Chat = require('mongoose').model('Chat');

exports.getAll = (req, res) => {
  let hiddenFields = ['-createdAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  const query = Chat.find(req.query.filter);
  const populatePaths = [{
    path: 'user_id',
    fields: ['first_name', 'last_name', 'email', 'photo']
  }];
  if (req.query.mode == 'populated') {
    for (path of populatePaths) {
      query.populate({
        path: path.path,
        select: req.query.details === 'true' ? [] : path.fields
      });
    }
  }

  query.select(hiddenFields).exec((err, chats) => {
    if (err) throw err;
    res.status(200).send(chats);
  });
}

exports.getOne = (req, res) => {
  let hiddenFields = ['-createdAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  const query = Chat.findById(req.params.id);
  const populatePaths = [{
    path: 'user_id',
    fields: ['first_name', 'last_name', 'email', 'photo']
  }];
  if (req.query.mode == 'populated') {
    for (path of populatePaths) {
      query.populate({
        path: path.path,
        select: req.query.details === 'true' ? [] : path.fields
      });
    }
  }

  query.select(hiddenFields).exec((err, chat) => {
    if (err) throw err;
    res.status(200).send(chat);
  });
}

exports.create = (req, res) => {
  const user_id = req.decoded._id;
  const { business_id } = req.body;
  Chat.create({ user_id, business_id }, (err, chats) => {
    if (err) return res.status(500).send({ success: false, message: err.message });
    res.status(200).send(chats);
  });
}

exports.getMessages = (req, res) => {
  let hiddenFields = ['-updatedAt', '-__v'];
  if (req.query.details === 'true') {
    hiddenFields = [];
  }

  const populatePaths = [{
    path: 'from',
    fields: ['first_name', 'last_name', 'email']
  }, {
    path: 'to',
    fields: ['first_name', 'last_name', 'email']
  }];

  Chat.getMessages(
    req.params.id,
    hiddenFields,
    populatePaths,
    req,
    (err, messages) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(messages);
    }
  );
}
