// home页面部分mock模拟数据
import mockRequest from "@/utils/mockAjax"

// banner数据请求
export const bannerList = () => {
  return mockRequest({
    url: "/banner",
  })
}

// floor数据请求
export const reqFloor = () => {
  return mockRequest({
    url: "/floor",
  })
}