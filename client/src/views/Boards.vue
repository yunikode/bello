<template>
<v-container fluid>
  <v-layout justify-center column>
    <v-flex xs12>
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate v-if="loading">
      </v-progress-circular>
    </v-flex>

    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <BoardList :boards="boards" :loading="loading" />

        <v-flex xs12 sm6 md4>
          <v-card>
            <v-card-title primary-title>
              <div class="headline">Create Board</div>
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid" @submit.prevent='createBoard' @keydown.prevent.enter v-if="!creating">
                <v-text-field v-model='board.name' :rules='notEmptyRules' label="Name" required>
                </v-text-field>

                <v-text-field v-model='board.background' :rules='notEmptyRules' label='Background' required>
                </v-text-field>

                <v-btn type='submit' :disabled="!valid">Create</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
          <v-progress-circular :size="70" :width="7" color="primary" indeterminate v-if="creating">
          </v-progress-circular>
        </v-flex>
      </v-layout>

    </v-container>

  </v-layout>
</v-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
import BoardList from '@/components/BoardList'
export default {
  name: 'boards',
  components: {
    BoardList
  },
  data: () => ({
    valid: false,
    board: {
      name: '',
      background: ''
    },
    notEmptyRules: [(value) => !!value || 'Cannot be empty']
  }),
  mounted() {
    this.findBoards({
        query: {}
      })
      
  },
  methods: {
    ...mapActions('boards', {
      findBoards: 'find'
    }),
    createBoard() {
      if (this.valid) {
        const {
          Board
        } = this.$FeathersVuex
        const board = new Board(this.board)
        board.save()
        this.board = {
          name: '',
          background: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters('boards', {
      findBoardsInStore: 'find'
    }),
    ...mapState('boards', {
      loading: 'isFindPending',
      creating: 'isCreatePending'
    }),
    ...mapState('auth', {
      user: 'payload'
    }),
    boards() {
      return this.findBoardsInStore({
        query: {
          ownerId: this.user.userId
        }
      }).data
    }
  }
}
</script>

<style lang="css" scoped>
</style>
