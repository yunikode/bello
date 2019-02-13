<template>
<v-container>
  <v-layout text-xs-center wrap>

    <v-flex mb-4>
      <v-form v-model="valid" @submit.prevent='login({valid, user})' @keydown.prevent.enter v-if="!loading">
        <v-text-field v-model='user.username' :rules='notEmptyRules' :counter="10" label="Username" required></v-text-field>

        <v-text-field v-model='user.password' :rules='notEmptyRules' label='Password' type='password' required></v-text-field>

        <v-btn type='submit' :disabled="!valid">Login</v-btn>
      </v-form>
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate v-if="loading"></v-progress-circular>
    </v-flex>

  </v-layout>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {notEmptyRules} from '@/validators'
export default {
  name: 'login',
  data: (vm) => ({
    user: {
      username: '',
      password: ''
    },
    valid: false,
    notEmptyRules
  }),
  computed: {
    ...mapState('auth', {
      loading: 'isAuthenticatePending'
    })
  },
  methods: {

    ...mapActions('auth', ['authenticate']),
    ...mapActions('localauth', ['login'])
  }
}
</script>

<style lang="css" scoped>
</style>
