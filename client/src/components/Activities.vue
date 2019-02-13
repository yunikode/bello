<template>
  <v-card height="100%">
    <v-list avatar v-for="activity in activitiesByDate" :key="activity._id" two-lines>
      <v-list-tile>
        <v-list-tile-avatar>
          <img :src="activity.user">
        </v-list-tile-avatar>
        <v-list-tile-content style="font-weight: normal;">
          <v-list-tile-sub-title v-html="markdownify(activity.text)" style="height: auto; line-height: auto; overflow: visible"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
import marked from 'marked'

export default {
  mounted() {
    this.findActivities({
        query: {
          boardId: this.$route.params.id
        }
      })
      
  },
  computed: {
    activities() {
      return this.findActivitiesInStore({
        query: {
          boardId: this.$route.params.id
        }
      }).data
    },
    activitiesByDate() {
      return this.activities.slice().reverse()
    },
    ...mapGetters('activities', {
      findActivitiesInStore: 'find'
    }),
  },
  methods: {
    markdownify(text) {
      return marked(text)
    },
    ...mapActions('activities', {
      findActivities: 'find'
    }),
  }
}
</script>

<style lang="css" scoped>
</style>
