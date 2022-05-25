import Vue from "vue"
import Vuex from "vuex"

// 引入模块
import home from "./module/home"

// 使用插件
Vue.use(Vuex)



// 实例化插件
const store = new Vuex.Store({
  modules:{
    home,
  }
})


export default store
