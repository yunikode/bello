<template>
<v-app>


  <v-content>
    <router-view :showActivityLog="showActivityLog" />
  </v-content>
  <toolbar :user="userObj" :auth="auth" :logout="logout" v-on:toggleActivityLog="toggleActivityLog"/>
  <v-footer height="auto" color="blue-grey darken-3">
    <v-layout justify-center class="white--text">
      &copy; 2019 - Made in Germany
    </v-layout>
  </v-footer>
</v-app>
</template>

<script>
import {
  mapGetters,
  mapState,
  mapActions
} from 'vuex'
import Toolbar from '@/components/Toolbar'
export default {
  name: 'App',
  components: {
    Toolbar
  },
  data () {
    return {
      showActivityLog: false
    }
  },
  methods: {
    ...mapActions('auth', {
      authLogout: 'logout'
    }),
    logout () {
      this.authLogout().then(() => this.$router.push('/login'))
    },
    toggleActivityLog () {
      this.showActivityLog = !this.showActivityLog
    }
  },
  computed: {
    ...mapGetters('users', {
      userObj: 'current'
    }),
    ...mapState('auth', {
      auth: 'payload'
    })
  }
}
</script>
