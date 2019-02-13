const { authenticate } = require('@feathersjs/authentication').hooks;
const {isBoardOwner} = require('../../hooks/auth')
const hooks = require('feathers-authentication-hooks')

module.exports = {
  before: {
    all: [ authenticate('jwt'), isBoardOwner ],
    find: [],
    get: [],
    create: [ hooks.associateCurrentUser({
      as: 'userId'
    })],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
