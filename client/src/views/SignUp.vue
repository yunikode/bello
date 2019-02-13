<template>
<v-container>
  <v-layout text-xs-center wrap>

    <v-flex mb-4>
      <v-form v-model="valid" @submit.prevent='signUp' @keydown.prevent.enter v-if="!loading">
        <v-text-field v-model='user.username' :rules='notEmptyRules' :counter="10" label="Username" required></v-text-field>
        <v-text-field v-model='user.displayName' :rules='notEmptyRules' label='Display Name' required></v-text-field>
        <v-text-field v-model='user.password' :rules='notEmptyRules' label='Password' type='password' required></v-text-field>
        <v-text-field v-model='user.confirmpassword' :rules='confirmPasswordRules' label='Confirm Password' type='password' required></v-text-field>
        <v-text-field v-model='user.imageUrl' :rules='notEmptyRules' label='Image URL' required></v-text-field>
        <v-btn type='submit' :disabled="!valid">Sign Up</v-btn>
      </v-form>
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate v-if="loading"></v-progress-circular>
    </v-flex>

  </v-layout>
</v-container>
</template>

<script>
import {
  mapState
} from 'vuex'
import {notEmptyRules} from '@/validators'
export default {
  name: 'signup',
  data: (vm) => ({
    user: {
      username: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      imageUrl: ''
    },
    valid: false,
    notEmptyRules,
    confirmPasswordRules: [(confirmPassword) => confirmPassword === vm.user.password || 'Passwords must match']
  }),
  computed: {
    ...mapState('users', {
      loading: 'isCreatePending'
    })
  },
  methods: {
    signUp () {
      if (this.valid) {
        const {
          User
        } = this.$FeathersVuex
        const user = new User(this.user)
        user.save()
          .then(user => {
            this.$router.push('/login')
          })
      }
    }
  }
}
</script>
