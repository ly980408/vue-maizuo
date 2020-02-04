import Vue from 'vue'
import Vuex from 'vuex'
// import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 自定义的共享状态
    isTabbarShow: true,
    nowCityId: null,
    nowCityName: ''
  },
  mutations: {
    myHideTabbar (state, data) {
      state.isTabbarShow = data
    },
    myShowTabbar (state, data) {
      state.isTabbarShow = data
    }
  },
  actions: {
  },
  modules: {
  }
})
