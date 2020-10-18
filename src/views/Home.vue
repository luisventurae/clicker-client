<template>
  <div class="home">
    <div class="rooms">
      <input v-if="!joined" v-model="username" placeholder="Nombre de usuario" required />
      <button v-if="!joined" @click="setRoom('sala')">
        Unirse a la sala
      </button>
      <button v-if="joined" @click="leaveFromRoom">
        Salir de la sala
      </button>
    </div>
    <Board />
  </div>
</template>

<script>
// @ is an alias to /src
import Board from '@/components/organisms/Board.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Board,
  },
  data: () => ({
    username: '',
    joined: false,
  }),
  created() {
    this.beforeCloseWindow()
  },
  methods: {
    ...mapActions(['joinRoom','listenPlayers','leavePlayer','listPlayers','listenPositions']),
    setRoom(room) {
      if( room && this.username ) {
        this.joinRoom({ room, username: this.username })
        this.listPlayers()
        this.listenPlayers()
        this.listenPositions()
        this.joined = true
      }
    },
    beforeCloseWindow() {
      window.onbeforeunload = () => {
        this.leavePlayer()
      }
    },
    leaveFromRoom() {
      this.leavePlayer()
      this.username = ''
      this.joined = false
    },
  },
}
</script>