<template>
<v-container fluid>
  <v-layout justify-center column v-if="userObj">

    <v-flex xs12 v-if="loadingBoard || loadingLists">
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate>
      </v-progress-circular>
    </v-flex>

    <warning-messages />

    <v-container fluid grid-list-lg>

      <v-layout row wrap>
        <v-flex xs12 lg4 v-if="showActivityLog" order-md2>
          <h2>Activity Log</h2>
          <activities />
        </v-flex>
        <v-flex xs12 :lg8="showActivityLog">
          <h2 v-if="board">{{board.name}}</h2>
          <v-layout row wrap>
            <v-flex xs12 sm6 md4 :lg3="!showActivityLog" v-if="!loadingLists" v-for="list in lists" :key="list._id">
              <single-list :list="list" :droppingList="droppingList" :setDroppingList="setDroppingList"
              :cardsByListId="cardsByListId"
              :startDraggingCard="startDraggingCard"
              :stopDraggingCard="stopDraggingCard"
              :user="userObj"
              :createActivity="createActivity"
              
              />
            </v-flex>
          </v-layout>
        </v-flex>

      </v-layout>
    </v-container>
    <v-layout>
      <v-flex xs12 md6 offset-md3 mt-4>
        <create-list :creatingList="creatingList" :createList="createList" />
      </v-flex>
    </v-layout>
  </v-layout>
</v-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
import CreateList from '@/components/CreateList'
import SingleList from '@/components/SingleList'
import WarningMessages from '@/components/WarningMessages'
import Activities from '@/components/Activities'

export default {
  name: 'board',
  components: {
    Activities,
    CreateList,
    SingleList,
    WarningMessages
  },
  data: () => ({
    board: {},
    draggingCard: null,
    droppingList: null
  }),
  props: ['showActivityLog'],
  mounted() {
    this.getBoard(this.$route.params.id)

    this.findLists({
      query: {
        boardId: this.$route.params.id
      }
    })

    this.findCards({
      query: {
        boardId: this.$route.params.id
      }
    })

  },
  methods: {
    ...mapActions('boards', {
      getBoard: 'get'
    }),
    ...mapActions('lists', {
      findLists: 'find'
    }),
    ...mapActions('cards', {
      findCards: 'find'
    }),

    async createList(list) {
      const {
        List
      } = this.$FeathersVuex
      list.boardId = this.$route.params.id
      const newList = new List(list)
      await newList.save()

      // console.log(this.userObj.displayName)
      await this.createActivity(`**${this.userObj.displayName}** _created_ list **${list.name}**`)

    },
    startDraggingCard(event, card) {
      event.dataTransfer.setData('text/plain', '')
      this.draggingCard = card
    },
    setDroppingList(event, list) {
      this.droppingList = list
      event.preventDefault()
    },
    async stopDraggingCard() {
      if (this.droppingList) {
        if (this.draggingCard.listId !== this.droppingList._id) {
          const fromList = this.lists.find(list => list._id === this.draggingCard.listId)
          this.draggingCard.listId = this.droppingList._id
          await this.draggingCard.save()
          await this.createActivity(`**${this.userObj.displayName}** _moved_ card **${this.draggingCard.title}** from **${fromList.name}** to **${this.droppingList.name}**`)
        }
      }
      this.droppingList = null
      this.draggingCard = null
    },

    async createActivity(text) {
      const {
        Activity
      } = this.$FeathersVuex
      const activity = new Activity()
      activity.text = text
      activity.boardId = this.$route.params.id
      await activity.save()
    }
  },
  computed: {
    ...mapGetters('lists', {
      findListsInStore: 'find'
    }),
    ...mapGetters('cards', {
      findCardsInStore: 'find'
    }),

    ...mapGetters('users', {
      userObj: 'current'
    }),
    ...mapState('boards', {
      loadingBoard: 'isGetPending',
    }),
    ...mapState('lists', {
      loadingLists: 'isFindPending',
      creatingList: 'isCreatePending',
    }),

    lists() {
      return this.findListsInStore({
        query: {
          boardId: this.$route.params.id
        }
      }).data
    },
    cards() {
      return this.findCardsInStore({
        query: {
          boardId: this.$route.params.id
        }
      }).data
    },
    cardsByListId() {
      return this.cards.reduce((byId, card) => {
        byId[card.listId] = byId[card.listId] || []
        byId[card.listId].push(card)
        return byId
      }, {})
    },

  }
}
</script>

<style lang="css" scoped>
</style>
