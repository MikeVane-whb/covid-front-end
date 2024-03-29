import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPathName:{}
  },
  mutations: {
    setPath(state){
      state.currentPathName = localStorage.getItem('currentPathName')
    }
  },
  actions: {
  },
  modules: {
  }
})
