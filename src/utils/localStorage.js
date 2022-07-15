// 设置本地存储
export const setLocalStorage = (name, value) => {
  value = JSON.stringify(value)
  localStorage.setItem(name, value)
}

// 对本地储存获取
export const getLocalStorage = (name) => {
  let value = localStorage.getItem(name)
  value = JSON.parse(value)
  return value
}

// 删除
export const removeLocalStorage = (name) => {
  localStorage.removeItem(name)
}

// token的本地获取
export const getToken = () => {
  let value = localStorage.getItem('token') || ""
  return value
}

// token的本地储存储
export const setToken = (value) => {
  value = JSON.stringify(value)
  localStorage.setItem("token", value)
}

// token的删除
export const removeToken = () => {
  localStorage.removeItem("token")
}