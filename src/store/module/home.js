import {
  GetTypeNavListApi,
  BannerListApi, //banner页面数据请求
  ReqFloorApi, //floor页面数据请求
} from "@/api"
const state = {
  TypeList: [], //三级分类列表
  bannerImage: {}, //轮播图的数据
  floorList: [], //floor组件的数据
}
const mutations = {
  // 存储分类列表
  TYPE_LIST(state, data) {
    state.TypeList = data
  },
  // 存储banner轮播图
  BANNER_LIST(state, data) {
    state.bannerImage = {
      ...data
    }
  },

  // floor组件的数据存储
  FLOOR_LIST(state, data) {
    state.floorList = [...data]
  }
}
const actions = {
  // 初始化三级分类获取
  async typeList({
    commit
  }) {
    let res = await GetTypeNavListApi()
    if (res.code == 200) {
      commit("TYPE_LIST", res.data)
    }
  },
  // banner图片请求
  async bannerList({
    commit
  }) {
    let res = await BannerListApi()
    if (res.code == 200) {
      commit("BANNER_LIST", res.data)
    }
  },

  async getFloorList({
    commit
  }) {
    let res = await ReqFloorApi()
    if (res.code === 200) {
      commit("FLOOR_LIST", res.data)
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