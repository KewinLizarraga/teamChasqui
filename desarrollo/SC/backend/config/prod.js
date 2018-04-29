module.exports = {
  config: {
    mongoURI: process.env.NODE_ENV
  },
  keys: {
    jwtKeySecret: proces.env.JWT_KEY_SECRET
  }
}
