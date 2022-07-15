const routes = [
  // 重定向到首页
  {
    path: "*",
    redirect: "/home"
  },
  // 首页
  {
    path: "/home",
    component: () => import("@/views/Home"),
    meta: {
      isShow: true, //Footer组件是否显示
    }
  },
  // 登录
  {
    path: "/login",
    component: () => import("@/views/Login"),
    meta: {
      isShow: false, //Footer组件是否显示
    }
  },
  // 搜索
  {
    name: "search",
    path: `/search/:keyword?`,
    component: () => import("@/views/Search"),
    meta: {
      isShow: true, //Footer组件是否显示
    }
  },
  // 注册
  {
    path: "/register",
    component: () => import("@/views/Register/index.vue"),
    meta: {
      isShow: false, //Footer组件是否显示
    }
  },
  // 详情页
  {
    name: "details",
    path: "/details/:skuId",
    component: () => import("@/views/Details/sph_details.vue"),
    meta: {
      isShow: true,
    }
  },
  // 加入购物车成功页面
  {
    name: "addcartsuccess",
    path: "/addcartsuccess",
    component: () => import("@/views/AddCartSuccess/index.vue"),
    meta: {
      isShow: true,
    }
  },
  // 购物车
  {
    name: "/shopcart",
    path: "/shopcart",
    component: () => import("@/views/ShopCart"),
    meta: {
      isShow: true,
    }
  },
  {
    // 结算页面
    name: "trade",
    path: "/trade",
    component: () => import("@/views/Trade"),
    meta: {
      isShow: true,
    },
    beforeEnter(to, from, next) {
      if (from.path !== "/shopcart") {
        next(false)
      } else {
        next()
      }
    }
  },
  // 支付页面
  {
    name: "pay",
    path: "/pay",
    component: () => import("@/views/Pay"),
    beforeEnter(to, from, next) {
      if (from.path !== "/trade") {
        next(false)
      } else {
        next()
      }
    },
  },
  // 支付成功页面
  {
    name: "paysuccess",
    path: "/paysuccess",
    component: () => import("@/views/PaySuccess"),
    beforeEnter(to, from, next) {
      if (from.path !== "/pay") {
        next(false)
      } else {
        next()
      }
    },
  },
  // 个人中心
  {
    name: "center",
    path: "/center",
    component: () => import("@/views/Center"),
    children: [{
        // 默认路由
        path: "",
        redirect: "myorder"
      },
      {
        // 个人订单
        name: "myorder",
        path: "myorder",
        component: () => import("@/views/Center/components/MyOrder/index.vue")
      },
      {
        //  团购订单
        name: "grouporder",
        path: "grouporder",
        component: () => import("@/views/Center/components/GroupOrder/index.vue")
      }
    ]
  }


]

export default routes