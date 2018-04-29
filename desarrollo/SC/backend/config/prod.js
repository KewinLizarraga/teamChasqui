module.exports = {
  config: {
    mongoURI: process.env.MONGO_URI
  },
  keys: {
    jwtKeySecret: process.env.JWT_KEY_SECRET
  }
}
