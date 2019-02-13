const jwt = require('@feathersjs/authentication-jwt')


class UserVerifier extends jwt.Verifier {

  async verify(req, payload, done) {
    const User = require('mongoose').model('users')
    const user = await User.findOne({ _id: payload.userId}, '_id username displayName imageUrl').lean()

    payload.user = user

    done(null, null, payload)
  }
}

module.exports = UserVerifier
