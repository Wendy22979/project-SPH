import request from "@/utils/request"


//获取用户地址信息
export const reqAddressInfo = () => request({
  url: `/user/userAddress/auth/findUserAddressList`,
  method: 'get'
});


//获取商品清单数据
export const reqShopInfo = () => request({
  url: `/order/auth/trade`,
  method: 'get'
});

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => request({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  method: 'post',
  data
});