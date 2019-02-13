<template>
  <v-flex xs12 >

  <v-alert :value="boardsError" type="error" v-if="boardsError">{{boardsError.message}}</v-alert>

    <v-alert :value="cardsError" type="error" v-if="cardsError">{{cardsError.message}}</v-alert>

    <v-alert :value="listsError" type="error"  v-if="listsError">{{listsError.message}}</v-alert>
  </v-flex>

</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  computed: {
    ...mapState('cards', {
      cardsError: 'errorOnFind'
    }),
    ...mapState('boards', {
      boardsError: 'errorOnGet'
    }),
    ...mapState('lists', {
      listsError: 'errorOnFind'
    }),
  }
}
</script>
