const User = require('mongoose').model('User');

const tokenService = require('../services/token');

exports.getAll = (req, res) => {
  const { filter } = req.query;

  User.find({ filter }).select('-hashed_password').exec((err, users) => {
    if (err) throw err;
    return res.status(200).send(users);
  });
}

exports.updateUser = (req, res) => {
  const { id } = req.params;
  if (req.body.password) {
    User.findById(id, (err, user) => {
      if (err) throw err;

      if (!user) return res.json({ success: false, message: 'Authentication failed. User not found.' });

      user.password = req.body.password;
      user.updatedAt = Date.now();
      user.save((err, savedUser) => {
        if (err) return res.status(500).send({ success: false, message: err.message });

        // mandar token a lista negra solo si se cambia password
        const { token, payload } = tokenService.generate(savedUser);
        return res.json({
          success: true,
          token,
          user: payload
        });
      });
    });
  } else {
    User.findOne({ email: req.body.email }, (err, foundUser) => {
      if (err) throw err;

      if (user) return res.status(400).send({ success: false, message: 'The email address is already associated with another account.' });

      User.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true }, (err, updatedUser) => {
        if (err) return res.status(500).send({ success: false, message: err.message });

        const { token, payload } = tokenService.generate(updatedUser);
        return res.json({
          success: true,
          token,
          user: payload
        });
      });
    });
  }
}
