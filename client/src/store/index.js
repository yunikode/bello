import Vue from 'vue'
import Vuex from 'vuex'

import feathersVuex from './feathersVuex'

const { service, auth, FeathersVuex } = feathersVuex

import localauth from './localauth'


Vue.use(Vuex)
Vue.use(FeathersVuex)

export default new Vuex.Store({
  modules: {
    localauth
  },
  plugins: [
    service('users', {
      instanceDefaults: {
        username: '',
        password: '',
        displayName: '',
        imageUrl: ''
      }
    }),
    service('boards', {
      instanceDefaults: {
        name: '',
        background: ''
      }
    }),
    service('lists', {
      instanceDefaults: {
        name: '',
        order: 0,
        boardId: '',
        archived: false
      }
    }),
    service('cards', {
      instanceDefaults: {
        title: '',
        description: '',
        order: 0,
        boardId: '',
        listId: '',
        archived: false,
        members: []
      }
    }),
    service('activities', {
      instanceDefaults: {
        text: '',
        boardId: '',
        userId: null,
        user: 'User'
      }
    }),
    auth({ userService: 'users' })]
})
