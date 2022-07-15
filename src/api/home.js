// home页面的api
import request from "@/utils/request"


// 三级分类列表请求
export const GetTypeNavList = ()=>{
  return request({
    url:"/product/getBaseCategoryList",
    method:"GET"
  })
}

