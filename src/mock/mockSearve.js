import Mock from "mockjs"

// 引入json数据
import banner from "./banner.json"
import floors from "./floors.json"

// 配置地址
// banner数据
Mock.mock('/mock/banner', {
  code: 200,
  data: banner
})

// floor数据
Mock.mock('/mock/floor', {
  code: 200,
  data: floors
})