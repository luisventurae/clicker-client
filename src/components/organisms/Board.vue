<template>
    <div class="board">
        <div class="board-container">
            <div v-for="player in players" :key="player.username">
                <Pointer 
                  :username="player.username" 
                  :fill="player.color" 
                  :x="player.x" 
                  :y="player.y" 
                />
            </div>
        </div>
    </div>
</template>

<script>
import Pointer from '@/components/atoms/Pointer.vue'
import { mapActions, mapGetters, } from 'vuex'

export default {
  name: 'board',
  components: {
    Pointer,
  },
  created() {
    this.watchPointerPosition()
  },
  computed: mapGetters(['players']),
  methods: {
    ...mapActions(['joinRoom','emitPosition']),
    watchPointerPosition() {
        window.onmousemove = () => {
            const x = window.event.clientX
            const y = window.event.clientY
            this.emitPosition({ x, y })
        }
    },
  },
}
</script>
