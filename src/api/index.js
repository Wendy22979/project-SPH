// 统一接口文档
import {
  GetTypeNavList
} from "./home"

import {
  getSearchList
} from "./search"

import {
  detailsList,
  addShopChar
} from "./details"

import {
  getShopCart,
  delShopChar,
  cutChecked
} from "./shopCart"

import {
  registerUser,
  getCode,
  reqUserLogin,
  reqUserLogout,
  reqUserInfo
} from "./register"

import {
  reqAddressInfo,
  reqShopInfo,
  reqSubmitOrder
} from "./trade"

import {
  reqPayInfo,
  reqPayResult,
  reqMyOrderList
} from "./pay"
// mock模拟数据，部分接口
import {
  bannerList,
  reqFloor
} from "./homeMock"

// 三级分类列表Api
export const GetTypeNavListApi = GetTypeNavList

// 搜索请求
export const GetSearchApi = getSearchList

// 详情接口
export const detailsListApi = detailsList


// 加入购物车接口与对已添加商品数据改动的接口
export const addShopCharApi = addShopChar

// 购物车列表获取接口
export const getShopCartApi = getShopCart

// 购物侧删除接口
export const delShopCharApi = delShopChar

// 切换选中状态
export const cutCheckedApi = cutChecked

// 注册登录接口
export const registerUserApi = registerUser

// 获取验证码接口
export const getCodeApi = getCode
// 用户登录接口
export const reqUserLoginApi = reqUserLogin
// 退出登录
export const reqUserLogoutApi = reqUserLogout
// 获取用户信息
export const reqUserInfoApi = reqUserInfo

// 获取用户地址信息
export const reqAddressInfoApi = reqAddressInfo

// 获取商品清单数据
export const reqShopInfoApi = reqShopInfo
// 提交订单接口
export const reqSubmitOrderApi = reqSubmitOrder

// 订单信息获取接口
export const reqPayInfoApi = reqPayInfo

// 查询支付结果
export const reqPayResultApi = reqPayResult

// 获取我的订单
export const reqMyOrderListApi = reqMyOrderList

// 模拟数据区域

// banner数据接口
export const BannerListApi = bannerList

// floor数据接口
export const ReqFloorApi = reqFloor