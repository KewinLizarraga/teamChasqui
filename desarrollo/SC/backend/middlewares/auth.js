const jwt = require('jsonwebtoken');
const { keys } = require('../config/keys');

exports.auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, keys.jwtKeySecret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token', error: err });
      }
      req.decoded = decoded;
      return next();
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'Token not found'
    })
  }

}
