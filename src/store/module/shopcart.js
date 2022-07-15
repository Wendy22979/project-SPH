import {
  getShopCartApi,
  delShopCharApi,
  cutCheckedApi
} from "@/api/index"
import {
  getNanoid
} from "@/utils/nanoid"


const state = () => {
  return {
    shopCartList: [],
    nanoid: getNanoid(),
  }
}
const mutations = {
  // 购物车初始化数据存储
  SET_SHOP_CART(state, data) {
    state.shopCartList = [...data]
  }
}
const actions = {
  //购物车初始化请求
  async getShopCart({
    commit
  }) {
    let res = await getShopCartApi()
    if (res.code == 200) {
      commit("SET_SHOP_CART", res.data[0].cartInfoList)
    }
  },
  // 删除接口
  async delShopChar({
    commit
  }, skuId) {
    try {
      await delShopCharApi(skuId)
      return "ok"
    } catch (error) {
      console.log(error)
    }
  },
  // 切换选中状态
  async cutChecked({
    commit
  }, {
    skuID,
    isChecked
  }) {
    try {
      await cutCheckedApi(skuID, isChecked)
    } catch (error) {
      console.log(error)
    }

  },
  // 全选切换小checked状态
  allCutChecked({
    dispatch,
    state
  }, isChecked) {
    let arr = []
    state.shopCartList.forEach((item) => {
      console.log(item)
      let checked = dispatch("cutChecked", {
        skuID: item.skuId,
        isChecked
      })
      arr.push(checked)
    })
    return Promise.all(arr)
  },
  // 删除全部选中的商品
  delAllChecked({
    dispatch,
    state
  }) {
    let arr = []
    state.shopCartList.forEach((item) => {
      if (item.isChecked == 1) {
        let del = dispatch("delShopChar", item.skuId)
        arr.push(del)
      }
    })
    return Promise.all(arr)
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