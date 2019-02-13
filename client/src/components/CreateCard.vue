<template>
  <div>
  <div class="headline">Create Card</div>
  <v-form v-if="!creatingCard" v-model="validCard" @submit.prevent='createCard' @keydown.prevent.enter>
    <v-text-field v-model='card.title' :rules='notEmptyRules' label="Title" required>
    </v-text-field>

    <v-btn type='submit' :disabled="!validCard">Create Card</v-btn>
  </v-form>
  <v-progress-circular :size="70" :width="7" color="primary" indeterminate v-if="creatingCard">
  </v-progress-circular>
  </div>
</template>

<script>
import {notEmptyRules} from '@/validators'
export default {
  name: 'create-card',
  props: ['list', 'boardId', 'createActivity', 'user'],
  data: () => ({
    creatingCard: false,
    validCard: false,
    card: {
      title: '',
      members: []
    },
    notEmptyRules
  }),

  methods: {
    async createCard () {
      if (this.validCard) {
        const {
          Card
        } = this.$FeathersVuex
        this.card.boardId = this.boardId
        this.card.listId = this.list._id
        const card = new Card(this.card)
        this.creatingCard = true
        await card.save()
        this.creatingCard = false

        this.card = {
          title: '',
          members: []
        }
        this.createActivity(`**${this.user}** _created_ card **${card.title}** on list **${this.list.name}**`)
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
