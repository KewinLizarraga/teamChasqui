const jwt = require('jsonwebtoken');
const { keys } = require('../config/keys');

module.exports = {
  generate: userModel => {
    const userJS = userModel.toJSON();
    const { first_name, last_name, email, _id, photo, type } = userModel;
    const payload = {
      _id,
      photo,
      full_name: `${first_name} ${last_name}`,
      email,
      type
    }

    delete userJS.hashed_password;
    return {
      token: jwt.sign(payload, keys.jwtKeySecret, { expiresIn: 3600 }),
      payload: userJS
    }
  }
}
