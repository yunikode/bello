<template>
  <v-card>
    <v-card-title primary-title>
      <div class="headline">Create List</div>
    </v-card-title>
    <v-card-text>
      <v-form v-model="validList" @submit.prevent='onCreateList' @keydown.prevent.enter v-if="!creatingList">
        <v-text-field v-model='list.name' :rules='notEmptyRules' label="Name" required>
        </v-text-field>

        <v-btn type='submit' :disabled="!validList">Create List</v-btn>
      </v-form>
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate v-if="creatingList">
      </v-progress-circular>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  notEmptyRules
} from '@/validators'
export default {
  data: () => ({
    validList: false,
    list: {
      name: '',
      order: 0,
      archived: false
    },
    notEmptyRules
  }),
  methods: {
async onCreateList() {
  if(this.validList) {
    await this.createList(this.list)
    this.list = {
      name: '',
      order: 0,
      archived: false
    }
  }
}
  },
  props: ['creatingList', 'createList']
}
</script>

<style lang="css" scoped>
</style>
