// 详情页接口

import request from "@/utils/request"

//详情信息初始化信息
export const detailsList = (skuId) => {
  return request({
    url: `/item/${skuId}`,
    method: "GET"
  })
}

// 加入购物车接口
export const addShopChar = (skuId, skuNum) => {
  return request({
    url: `/cart/addToCart/${skuId }/${skuNum }`,
    method: "post"
  })
}