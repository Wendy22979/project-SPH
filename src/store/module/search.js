import {
  GetSearchApi
} from "@/api/index"


const state = () => {
  return {
    searchList: {}
  }
}

const mutations = {
  // 搜索了列表数据存储
  GET_SEARCH(state, data) {
    state.searchList = {
      ...data
    }
  }

}

const actions = {
  //  获取搜索列表
  async getSearch({
    commit
  }, params = {}) {
    let res = await GetSearchApi(params)
    if (res.code == 200) {
      commit('GET_SEARCH', res.data)
    }

  }

}
const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}