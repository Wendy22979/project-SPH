import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"

// 三级联动组件
import TypeNav from "@/components/TypeNav"
// 全局注册
Vue.component('TypeNav',TypeNav)


Vue.config.productionTip = false


new Vue({
  // 注册路由
  router,
  // 注册vuex
  store,
  render: h => h(App),
}).$mount('#app')
