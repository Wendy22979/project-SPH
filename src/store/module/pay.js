// 支付页面
import {
  reqPayInfoApi,
  reqPayResultApi
} from "@/api"
const state = () => {
  return {
    payInfo: {}
  }
}
const mutations = {
  // 存储订单信息
  SET_PAY_INFO(state, data) {
    state.payInfo = {
      ...data
    }
  }
}
const actions = {
  // 获取订单信息
  async reqPayInfo({
    commit
  }, orderId) {
    try {
      let res = await reqPayInfoApi(orderId)
      if (res.code == 200) {
        commit("SET_PAY_INFO", res.data)
      }
    } catch (error) {
      console.log(error)
    }
  },

  // 查询支付结果
  async reqPayResult(context, orderId) {
    try {
      let res = await reqPayResultApi(orderId)
      return res
    } catch (error) {
      console.log(error)
    }
  },

}
const getters = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}