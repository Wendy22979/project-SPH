import request from "@/utils/request"

// 获取购物车列表
export const getShopCart = () => {
  return request({
    url: "/cart/cartList",
    method: "GET"
  })
}

// 删除接口
export const delShopChar = (skuId) => {
  return request({
    url: `/cart/deleteCart/${skuId}`,
    method: "DELETE"
  })
}

// 切换选中状态
export const cutChecked = (skuID, isChecked) => {
  return request({
    url: `/cart/checkCart/${skuID}/${isChecked}`,
    method: "GET",
  })

}