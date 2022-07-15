import request from "@/utils/request"

export const getSearchList = (params) => {
  return request({
    url: "/list",
    method: "POST",
    data: params
  })
}