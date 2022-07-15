import {
  detailsListApi,
  addShopCharApi
} from "@/api/index"

const state = () => {
  return {
    detailsList: {}
  }
}

const mutations = {
  // 设置详情数据
  SET_DETAILS_LIST(state, data) {
    state.detailsList = {
      ...data
    }
  },
  // 修改售卖属性的选中状态
  SET_DETAILS_ITEM(state, {
    index,
    id
  }) {
    console.log(id, "id")
    state.detailsList.spuSaleAttrList[index].spuSaleAttrValueList.map(item => {
      if (item.id == id) {
        item.isChecked = "1"
        return item
      }
      item.isChecked = "0"
      return item
    });
  }
}

const actions = {
  // 详情请求
  async getDetailsList({
    commit
  }, id) {
    let res = await detailsListApi(id)
    if (res.code == 200) {
      commit("SET_DETAILS_LIST", res.data)
    }
  },
  // 添加与修改购物车
  async addShopChar(context, {
    skuId,
    skuNum
  }) {
    try {
      await addShopCharApi(skuId, skuNum)
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}