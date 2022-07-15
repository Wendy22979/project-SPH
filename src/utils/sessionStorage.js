// 设置会话存储
export const setSessionStorage = (name, value) => {
  value = JSON.stringify(value)
  sessionStorage.setItem(name, value)
}

// 获取会话储存
export const getSessionStorage = (name) => {
  let value = sessionStorage.getItem(name) || "{}"
  value = JSON.parse(value)
  return value
}

// 删除会话存储
export const removeSessionStorage = (name) => {
  sessionStorage.removeItem(name)
}