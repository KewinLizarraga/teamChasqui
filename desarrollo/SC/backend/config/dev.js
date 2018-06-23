module.exports = {
  config: {
    mongoURI: 'mongodb://localhost:27017/chasqui-db'
  },
  keys: {
    jwtKeySecret: 'letmein123',
    sendGridUser: 'joshnav35',
    sendGridPass: 'carlospunk1',
    facebook: {
      clientID: '1075549959251532',
      clientSecret: 'a00a561cf42f1a017056b309f0f553a7',
    },
    google: {
      clientID: '1089183054482-56j4oimv0km8jdu8dr74cuh1usuo6kc9.apps.googleusercontent.com',
      clientSecret: 'x0FKWRpbV6ojj_96HKsRo74K',
    }
  }
}
