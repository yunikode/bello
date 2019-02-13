<template>
<v-toolbar fixed app>
  <v-toolbar-title>
  <v-btn flat large :to="{name: 'home'}">Bello</v-btn>
  </v-toolbar-title>

  <v-spacer></v-spacer>

  <span v-if="!auth">
    <v-btn flat :to="{name: 'about'}">About</v-btn>
    <v-btn flat :to="{name: 'signup'}">Sign Up</v-btn>
    <v-btn flat color="primary" :to="{name: 'login'}">Login</v-btn>
  </span>
  <span v-if="auth && user">
    <v-layout row align-center>
      <v-flex mr-2>
        <h3>{{user.displayName}}</h3>
      </v-flex>
      <v-flex>
        <v-avatar :size="40" color="grey lighten-4">
          <img :src="user.imageUrl">
        </v-avatar>
      </v-flex>
      <v-flex>
        <v-btn flat @click="logout">Logout</v-btn>
        <v-btn @click="$emit('toggleActivityLog')">Show Log</v-btn>
      </v-flex>
    </v-layout>
  </span>
</v-toolbar>
</template>
<script>

export default {
  name: 'toolbar',
  props: ['user', 'auth', 'logout'],

}
</script>
