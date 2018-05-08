const User = require('mongoose').model('User');
const VerificationToken = require('mongoose').model('VerificationToken');

const uuid = require('uuid');

const tokenService = require('../services/token');
const emailer = require('../services/emailer');

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) throw err;

    if (!user) return res.status(401).send({ success: false, message: 'The email address is not associated with any account.' });

    user.comparePassword(password, (err, isMatch) => {
      if (err) throw err;

      if (!isMatch) return res.status(401).send({ success: false, message: 'Invalid password.' });

      if (!user.verified) return res.status(401).send({ success: false, message: 'Your account has not been verified' });

      const { token, payload } = tokenService.generate(user);

      return res.status(200).json({
        success: true,
        user: payload,
        token
      });
    });
  });
}

exports.signup = (req, res) => {
  const { email, password, last_name, first_name, password2 } = req.body;

  if (password !== password2) return res.status(400).send({ success: false, message: 'The passwords are different' });

  User.findOne({ email }, (err, user) => {
    if (err) throw err;

    if (user) return res.status(400).send({ success: false, message: 'We were unable to find a user with that email.' });

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

      const verificationToken = new VerificationToken({ user_id: newUser._id, token: uuid() });

      verificationToken.save((err) => {
        if (err) return res.status(500).send({ success: false, message: err.message });

        const options = {
          name: `${newUser.first_name} ${newUser.last_name}`,
          email: newUser.email,
          host: req.headers.host,
          token: verificationToken.token
        }

        emailer.sendVerification(options, (err, info) => {
          if (err) return res.status(500).send({ success: false, message: err.message });

          res.status(200).send({ success: true, message: 'A verification email has been sent to ' + newUser.email + '.' });
        });
      });
    });
  });
}

exports.logout = (req, res) => {
  // pasar a lista negra
  res.status(200).send({ success: true, message: 'You have logged out successfully' })
}

exports.confirmation = (req, res) => {
  VerificationToken.findOne({ token: req.body.token }, (err, foundToken) => {
    if (!foundToken) return res.status(400).send({ success: false, message: 'We were unable to find a valid token.' });

    // si encontramos un token, encontramos a su usuario
    User.findOne({ _id: foundToken.user_id }, (err, user) => {
      if (!user) return res.status(400).send({ success: false, message: 'We were unable to find a user for this token.' });

      if (user.verified) return res.status(400).send({ success: false, message: 'This user has already been verified.' });

      // verificamos y salvamos
      user.verified = true;
      user.save((err) => {
        if (err) return res.status(500).send({ success: false, message: err.message });
        res.status(200).send({ success: true, message: 'The account has been verified. Please log in.' })
      })
    });
  });
}

exports.resend = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(400).send({ success: false, message: 'We were unable to find a user with that email.' });
    if (user.verified) return res.status(400).send({ success: false, message: 'This user has already been verified.' });

    const verificationToken = new VerificationToken({ user_id: user._id, token: uuid() });

    verificationToken.save((err) => {
      if (err) return res.status(500).send({ success: false, message: err.message });

      const options = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        host: req.headers.host,
        token: verificationToken.token
      }

      emailer.sendForgot(options, (err, info) => {
        if (err) return res.status(500).send({ success: false, message: err.message });

        res.status(200).send({ success: true, message: 'A verification email has been sent to ' + user.email + '.' });
      });
    });
  });
}

exports.forgot = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(400).send({ success: false, message: 'We were unable to find a user with that email.' });

    user.reset_password_token = uuid();
    user.reset_password_expires = Date.now() + 86400000;
    user.updatedAt = Date.now();

    user.save((err, savedUser) => {
      if (err) return res.status(500).send({ success: false, message: err.message });

      // const data = {
      //   from:   'no-reply@chasqui.com',
      //   to: req.body.email,
      //   subject: 'Password help has arrived!',
      //   template: 'forgot-password-email',
      //   context: {
      //     url: `http://${host}/forgot/${sevedUser.reset_password_token}`,
      //     name: `${savedUser.first_name} ${savedUser.last_name}`
      //   }
      // };
      const options = {
        name: `${savedUser.first_name} ${savedUser.last_name}`,
        email: savedUser.email,
        host: req.headers.host,
        token: savedUser.reset_password_token
      }

      emailer.sendForgot(options, (err, info) => {
        if (err) return res.status(500).send({ success: false, message: err.message });

        res.status(200).send({ success: true, message: 'An email with instructions has been sent to ' + user.email + '.' });
      });

    })
    
  })
  
  // { success: true, message: 'Your password has been reset successfully' }
}

exports.reset = (req, res) => {
  if (req.body.password !== req.body.password2) return res.status(400).send({ success: false, message: 'The passwords are different' });
  console.log(req.body)
  User.findOne({
    reset_password_token: req.body.token,
    reset_password_expires: {
      $gt: Date.now()
    }
  }, (err, user) => {
    if (err) throw err;
    
    if (!user) return res.status(400).send({success: false, message: 'Password reset token is invalid or has expired.' });

    user.password = req.body.password;
    user.updatedAt = Date.now();
    user.reset_password_token = undefined;
    user.reset_password_expires = undefined;

    user.save((err, savedUser) => {
      if (err) return res.status(500).send({ success: false, message: err.message });

      const options = {
        name: `${savedUser.first_name} ${savedUser.last_name}`,
        email: savedUser.email,
        host: req.headers.host,
      }

      emailer.sendReset(options, (err, info) => {
        if (err) return res.status(500).send({ success: false, message: err.message });

        res.status(200).send({ success: true, message: 'Your password has been reset successfully' });
      });
    })

  })
}

exports.validateConfirmation = (req, res) => {
  res.send('validateConfirmation');
}

exports.validateForgot = (req, res) => {
  res.send('validateForgot');
}
