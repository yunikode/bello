<template>
  <v-card @dragover="setDroppingList($event, list)" :class="{'green lighten-4': droppingList == list }">
    <v-card-title primary-title>
      <div class="headline">
        {{list.name}}
      </div>

    </v-card-title>
    <v-card-text v-if="cardsByListId[list._id]">
      <v-layout column>
        <v-flex xs12 v-for="card in cardsByListId[list._id]" :key="card._id">
          <v-card class="grey lighten-3" draggable="true" @dragstart="startDraggingCard($event, card)" @dragend="stopDraggingCard()"
          >
            <v-card-title v-if="!editing" @click="editCard(card)">

              {{card.title}}
            </v-card-title>
              <v-text-field
              @submit="editCard(card)"
              v-if="editing"
              :label="card.title"
              solo
              :value="card.title"
              ></v-text-field>

          </v-card>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <create-card :list="list" :boardId="$route.params.id" :createActivity="createActivity" :user="user.displayName" />
    </v-card-actions>

  </v-card>
</template>

<script>
import CreateCard from '@/components/CreateCard'

export default {
  data: () => ({
    editing: false
  }),
  methods: {
    editCard(card) {
      this.editing = !this.editing
    }
  },
  components: {
    CreateCard
  },
  props: ['list', 'droppingList', 'setDroppingList', 'cardsByListId', 'startDraggingCard', 'stopDraggingCard', 'user', 'createActivity']
}
</script>

<style lang="css" scoped>
</style>
