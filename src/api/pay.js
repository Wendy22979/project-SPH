// 支付接口
import request from "@/utils/request"

// 获取支付信息接口
export const reqPayInfo = (orderId) => request({
  url: `/payment/weixin/createNative/${orderId}`,
  method: 'get'
});

//查询支付结果
export const reqPayResult = (orderId) => request({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: 'get'
});

//获取我的订单
export const reqMyOrderList = (page, limit) => request({
  url: `/order/auth/${page}/${limit}`,
  method: 'get'
});