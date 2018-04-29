module.exports = {
  config: {
    mongoURI: process.env.NODE_ENV
  },
  keys: {
    jwtKeySecret: process.env.JWT_KEY_SECRET
  }
}
