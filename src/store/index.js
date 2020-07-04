import Vue from 'vue'
import Vuex from 'vuex'
import marketData from './marketDataStore'
import account from './accountStore'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    marketData,
    account
  }
})

export default store
