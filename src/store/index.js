import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'

import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

//type casting
export default new Vuex.Store({
  state: {
    goodsList: [],
    // goodsinfo: {},
    orderinfo: {},
    memberinfo: { "is_login" : false }
  },
  getters,
  actions,
  mutations,

  modules: {
  },
  plugins: [ vuexLocal.plugin ]
})
