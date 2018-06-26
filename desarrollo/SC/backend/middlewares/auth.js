const jwt = require('jsonwebtoken');
const { keys } = require('../config/keys');

exports.auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log('TOKEN->', token)
  if (token) {
    jwt.verify(token, keys.jwtKeySecret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token', error: err });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'Token not found'
    })
  }

}

exports.authAdmin = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  
  if (token) {
    jwt.verify(token, keys.jwtKeySecret, (err, decoded) => {
      if (err) return res.status(500).send({ success: false, message: 'Failed to authenticate token', error: err});
      if (decoded.type == 'admin') {
        req.decoded = decoded;
        return next();
      }
      return res.status(403).send({ success: false, message: 'The user is not an administrator'});
    });
  } else {
    return res.status(404).send({ success: false, message: 'Token not found' });
  }
}
