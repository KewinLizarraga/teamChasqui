module.exports = {
  config: {
    mongoURI: process.env.MONGO_URI
  },
  keys: {
    jwtKeySecret: process.env.JWT_KEY_SECRET,
    sendGridUser: process.env.SEND_GRID_USER,
    sendGridPass: process.env.SEND_GRID_PASS
  }
}
