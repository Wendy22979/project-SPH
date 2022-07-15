import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
// mock接口
import "@/mock/mockSearve.js"

// 三级联动组件
import TypeNav from "@/components/TypeNav"
// 全局注册
Vue.component('TypeNav', TypeNav)

// swiper的样式
import "swiper/css/swiper.css";

// 引入字体图标样式
import "@/assets/fonts/iconfont.css"


// 引入element ui弹窗组件
import {
  MessageBox
} from "element-ui"

// 表单验证插件
import "@/utils/validata"

Vue.config.productionTip = false


new Vue({
  // 注册路由
  router,
  // 注册vuex
  store,
  render: h => h(App),
  beforeCreate() {
    // 事件总线
    Vue.prototype.$bus = this
    // element ui方法
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  }
}).$mount('#app')