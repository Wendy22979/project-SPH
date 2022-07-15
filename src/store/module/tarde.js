import {
  reqAddressInfoApi,
  reqShopInfoApi,
  reqSubmitOrderApi
} from "@/api"
const state = () => {
  return {
    addressInfo: [], //地址信息
    ShopInfo: [], //清单信息
    tradeNo: "", //订单编号
    orderId: ""
  }
}
const mutations = {
  // 存储地址信息
  REQ_ADDRESS_INFO(state, data) {
    state.addressInfo = [...data]
  },
  // 存储清单与订单编号
  REQ_SHOP_INFO(state, data) {
    state.ShopInfo = [...data.detailArrayList]
    state.tradeNo = data.tradeNo
  },
  // 存储订单号
  REQ_SUBMIT(state, data) {
    state.orderId = data
  }
}
const actions = {
  // 获取用户地址
  async reqAddressInfo({
    commit
  }) {
    try {
      let res = await reqAddressInfoApi()
      if (res.code == 200) {
        commit("REQ_ADDRESS_INFO", res.data)
      }
    } catch (error) {
      console.log(error)
    }
  },

  // 获取用户购物清单
  async reqShopInfo({
    commit
  }) {
    let res = await reqShopInfoApi()
    if (res.code == 200) {
      commit("REQ_SHOP_INFO", res.data)
    }
  },
  // 提交订单
  async reqSubmitOrder({
    commit
  }, {
    tradeNo,
    data
  }) {
    try {
      let res = await reqSubmitOrderApi(tradeNo, data)
      if (res.code == 200) {
        commit('REQ_SUBMIT', res.data)
        return "ok"
      } else {
        return res.message
      }
    } catch (error) {
      console.log(error)
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