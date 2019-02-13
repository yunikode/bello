<template>

  <v-flex xs12 sm6 md4 v-if="!loading">
    <v-card v-for="board in boards" :key="board._id">
      <v-responsive>
        <v-img :src="board.background" aspect-ratio="2">
        </v-img>
      </v-responsive>
      <v-card-title primary-title>
        <div class="headline">
          {{board.name}}
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn color="primary" :to="{name: 'board', params: { id: board._id}}">Go</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['boards', 'loading']
}
</script>

<style lang="css" scoped>
</style>
