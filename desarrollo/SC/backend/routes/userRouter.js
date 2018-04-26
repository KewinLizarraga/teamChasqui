const express = require('express');
const router = express.Router();
const User = require('mongoose').model('User');
const { keys } = require('../config/keys');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

// Sing up
router.post('/signup', (req, res) => {
  const { email, password, last_name, first_name } = req.body;
  User.find({ email }, (err, user) => {
    if (err) {
      return res.status(400).send({ success: false, message: 'Error', error: err });
    }

    if (user.length !== 0) {
      return res.status(409).send({ success: false, message: 'Email is been used' });
    }

    const userModel = new User({
      first_name,
      last_name,
      email,
      password
    });

    userModel.save((err, newUser) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ success: false, message: 'Something wrong happened' });
      }
      const payload = {
        ful_name: `${first_name} ${last_name}`,
        email
      }

      const token = jwt.sign(payload, keys.jwtKeySecret, { expiresIn: 3600 });

      return res.json({
        success: true,
        token
      });
    });
  });

});

// Get users
router.get('/users', auth.auth ,(req, res) => {
  const { filter } = req.query;

  User.find({ filter }, (err, users) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(users);
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      throw err;
    }

    if (!user) {
      return res.json({ success: false, message: 'Authentication failed. User not found.' });
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      }

      if(!isMatch) {
        return res.json({ success: false, message: 'Authentication failed. Wrong password.' });        
      }

      // hacer una funcion que reciba un usuario y devuelva el token

      // ver como hacer para no monstrar el password
      console.log(user);

      res.send(user);
    });
  })
})



// Logout

module.exports = router;
