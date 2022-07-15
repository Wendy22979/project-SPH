import {
  reqUserLoginApi,
  reqUserInfoApi,
  reqUserLogoutApi
} from "@/api/index"
import {
  getToken,
  setToken,
  removeToken
} from "@/utils/localStorage"
import {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage
} from "@/utils/sessionStorage"
const state = () => {
  return {
    token: getToken(),
    userInfo: getSessionStorage("userInfo")
  }
}
const mutations = {
  // 存储token
  LOGIN(state, data) {
    state.token = data
    // 设置token
    setToken(data)
  },
  // 存储用户信息
  REQ_USER_INFO(state, data) {
    state.userInfo = {
      ...data
    }
    // 会话存储
    setSessionStorage("userInfo", {
      "nickName": data ? data.nickName : ""
    })
  },
  // 重置用户信息
  REMOVE_USER_INFO(state) {
    state.userInfo = {}
    state.token = ""
  }
}
const actions = {
  // 登录请求
  async login({
    commit
  }, data) {
    try {
      let res = await reqUserLoginApi(data)
      console.log(res, "登录")
      if (res.code == 200) {
        commit("LOGIN", res.data.token)
        return "ok"
      } else {
        return Promise.reject(res.message)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // 获取用户信息
  async reqUserInfo({
    commit
  }) {
    try {
      let res = await reqUserInfoApi()
      commit("REQ_USER_INFO", res.data)
      return res.code
    } catch (error) {
      console.log(error)
    }
  },
  // 退出登录
  async reqUserLogout({
    commit
  }) {
    // 退出登录
    let res = await reqUserLogoutApi()
    if (res.code === 200) {
      // 删除本地token
      removeToken()
      // 重置本地信息，删除vuex的userInfo和token
      commit("REMOVE_USER_INFO")
      // 删除本地的session存储
      removeSessionStorage("userInfo")
      return "ok"
    } else {
      return Promise.reject(res.message)
    }
  }
}
const getters = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}