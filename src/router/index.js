import Vue from "vue"
import VueRouter from "vue-router"
import store from "@/store/index"



// 使用插件
Vue.use(VueRouter)

// 封装push和replace方法
// 拷贝原方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 添加内容封装
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}






// 路由规则
import routes from "./routes"


// 实例化路由
const router = new VueRouter({
  routes,
  scrollBehavior: () => {
    return { //滚动行为，每次跳转页面，滚动条都在顶部
      x: 0,
      y: 0
    }
  }
})


router.beforeEach(async (to, from, next) => {
  // 有token,登录状态
  if (store.state.register.token.trim() !== "") {
    // 判断是不是去登录页，是就直接跳转首页
    if (to.path === "/login") {
      next("/home")
    } else {
      // 没有nickName属性就请求,header部分用户信息的请求判断
      if (!store.state.register.userInfo.nickName) {
        try {
          // 派发请求
          let code = await store.dispatch("register/reqUserInfo")
          //  接口有问题，登录后，接口处即将用户变未登录状态，token失效
          if (code == 208) {
            //调用退出登录
            store.dispatch("register/reqUserLogout")
            // 跳转登录页面
            next("/login")
          } else {
            next()
          }

          // // 请求成功放行，不成功则为token超时，则在响应拦截里面有处理
          // next()
        } catch (error) {
          // 请求失败，则有可能为token超时
          //调用退出登录
          store.dispatch("register/reqUserLogout")
          // 跳转登录页面
          next("/login")
        }
      } else {
        next()
      }
    }

  } else {
    // 无token,未登录
    let toPath = to.path //获取将要去往的地址
    // 如果要去往结算页、支付页。支付成功页、个人订单页不可取，代参数跳转到login页，登录后跳转到响应页面
    if (toPath.indexOf("/trade") !== -1 || toPath.indexOf("/pay") !== -1 || toPath.indexOf("/center") !== -1) {
      next(`/login?toPath=${toPath}`)
    }
    next()
  }
})




// 暴露
export default router