import Vue from "vue"
import Vuex from "vuex"
// 简化读取
import getters from "./getters"
// 引入模块
import home from "./module/home"
import search from "./module/search"
import details from "./module/details"
import shopcart from "./module/shopcart"
import register from "./module/register"
import trade from "./module/tarde"
import pay from "./module/pay"

// 使用插件
Vue.use(Vuex)



// 实例化插件
const store = new Vuex.Store({
  getters,
  modules: {
    home,
    search,
    details,
    shopcart,
    register,
    trade,
    pay
  }
})


export default store