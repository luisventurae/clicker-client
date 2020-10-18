import Vue from 'vue'
import Vuex from 'vuex'
import cursor from '@/store/modules/cursor'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cursor,
  }
})
