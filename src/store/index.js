import Vue from 'vue'
import Vuex from 'vuex'
import {addLocalStarage,getLocalStarage} from '../utils/processlocal'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:getLocalStarage('userInfo') || {}
  },
  mutations: {
    saveUser(state,user){
      state.userInfo = user
      // Object.assign(state.userInfo,user)
      addLocalStarage('userInfo',state.userInfo)
    }
  }
})
