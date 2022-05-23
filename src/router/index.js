import Vue from "vue"
import VueRouter from "vue-router"


// 使用插件
Vue.use(VueRouter)

// 封装push和replace方法
// 拷贝原方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 添加内容封装
VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve && reject){
    originPush.call(this,location,resolve,reject)
  } else {
    originPush.call(this,location,()=>{},()=>{})
  }
}
VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve && reject){
    originReplace.call(this,location,resolve,reject)
  } else {
    originReplace.call(this,location,()=>{},()=>{})
  }
}






// 路由规则
const routes = [
  // 重定向到首页
  {
    path:"*",
    redirect:"/home"
  },
  // 首页
  {
    path:"/home",
    component:()=>import("@/views/Home"),
    meta:{
      isShow:true,//Footer组件是否显示
    }
  },
  // 登录
  {
    path:"/login",
    component:()=>import("@/views/Login"),
    meta:{
      isShow:false,//Footer组件是否显示
    }
  },
  // 搜索
  {
    name:"search",
    path:"/search/:searchValue",
    component:()=>import("@/views/Search"),
    meta:{
      isShow:true,//Footer组件是否显示
    }
  },
  // 注册
  {
    path:"/register",
    component:()=>import("@/views/Register"),
    meta:{
      isShow:false,//Footer组件是否显示
    }
  }

]


// 实例化路由
const router = new VueRouter({
  routes,
})




// 暴露
export default router