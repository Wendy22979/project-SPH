import {
  nanoid
} from 'nanoid'
import {
  getLocalStorage,
  setLocalStorage
} from "./localStorage"

export const getNanoid = () => {
  let id = getLocalStorage("USERTEMPID") //读取本地id
  if (!id) {
    id = nanoid() //如果不存在就生成一个
    setLocalStorage("USERTEMPID", id)
  }
  return id
}