const User = require('mongoose').model('User');
const VerificationToken = require('mongoose').model('VerificationToken');

const uuid = require('uuid');
const nodemailer = require('nodemailer');

const tokenService = require('../services/token');
const emailer = require('../services/emailer');
const { keys } = require('../config/keys');

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) throw err;

    if (!user) return res.status(401).send({ success: false, message: 'The email address is not associated with any account.' });

    user.comparePassword(password, (err, isMatch) => {
      if (err) throw err;

      if (!isMatch) return res.status(401).send({ success: false, message: 'Invalid password.' });

      if (!user.isVerified) return res.status(401).send({ success: false, message: 'Your account has not been verified' });

      const { token, payload } = tokenService.generate(user);

      return res.json({
        success: true,
        user: payload,
        token
      });
    });
  });
}

exports.signup = (req, res) => {
  const { email, password, last_name, first_name } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) throw err;

    if (user) return res.status(400).send({ success: false, message: 'The email address is already associated with another account.' });

    // Create user
    const userModel = new User({
      first_name,
      last_name,
      email,
      password
    });

    // Save user
    userModel.save((err, newUser) => {
      if (err) return res.status(500).send({ success: false, message: err.message });

      var verificationToken = new VerificationToken({ user_id: newUser._id, token: uuid() });

      verificationToken.save((err) => {
        if (err) return res.status(500).send({ success: false, message: err.message });

        const options = {
          email: newUser.email,
          host: req.headers.host,
          token: verificationToken.token
        }

        emailer.sendVerification(options, (err, info) => {
          if (err) return res.status(500).send({ success: false, message: err.message });

          res.status(200).send({ succes: true, message: 'A verification email has been sent to ' + newUser.email + '.' });
        });

        // const { token, payload } = tokenService.generate(userModel);
        // return res.json({
        //   success: true,
        //   token,
        //   user: payload
        // });
      });
    });
  });
}

exports.logout = (req, res) => {
  // pasar a lista negra
  res.send('oki');
}

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

exports.confirmation = (req, res) => {
  VerificationToken.findOne({ token: req.body.token }, (err, foundToken) => {
    if (!foundToken) return res.status(400).send({ success: false, message: 'We were unable to find a valid token.' });

    // si encontramos un token, encontramos a su usuario
    User.findOne({ _id: foundToken.user_id }, (err, user) => {
      if (!user) return res.status(400).send({ success: false, message: 'We were unable to find a user for this token.' });

      if (user.isVerified) return res.status(400).send({ success: false, message: 'This user has already been verified.' });

      // verificamos y salvamos
      user.isVerified = true;
      user.save((err) => {
        if (err) return res.status(500).send({ success: false, message: err.message });

        res.status(200).send({ success: true, message: 'The account has been verified. Please log in.' })
      })
    });
  });
}

exports.resend = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
    if (user.isVerified) return res.status(400).send({ success: false, message: 'This user has already been verified.' });

    var verificationToken = new VerificationToken({ user_id: user._id, token: uuid() });

    verificationToken.save((err) => {
      if (err) return res.status(500).send({ success: false, message: err.message });

      const options = {
        email: user.email,
        host: req.headers.host,
        token: verificationToken.token
      }

      emailer.sendVerification(options, (err, info) => {
        if (err) return res.status(500).send({ success: false, message: err.message });

        res.status(200).send({ succes: true, message: 'A verification email has been sent to ' + user.email + '.' });
      });


    });
  });
}
