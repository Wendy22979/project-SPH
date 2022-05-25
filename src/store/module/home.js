import {GetTypeNavListApi} from "@/api"
const state = {
  TypeList:[],//三级分类列表
}
const mutations = {
  // 存储分类列表
  TYPE_LIST(state,data){
    state.TypeList = data
  }
}
const actions = {
  // 初始化三级分类获取
  async typeList({commit}){
    let res = await GetTypeNavListApi()
    console.log(res)
    if(res.code == 200) {
      commit("TYPE_LIST",res.data)
    }
  }
}
const getters = {}

export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}