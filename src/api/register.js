// 注册页面api
import request from "@/utils/request"

// 注册用户
export const registerUser = (params) => {
  return request({
    url: "/user/passport/register",
    method: "POST",
    data: params
  })
}

// 获取验证码
export const getCode = (phone) => {
  return request({
    url: `/user/passport/sendCode/${phone}`,
    methods: "GET",
  })
}

// 登录页面接口
export const reqUserLogin = (data) => {
  return request({
    url: `/user/passport/login`,
    method: 'post',
    data
  })
};

// 退出登录
export const reqUserLogout = () => {
  return request({
    url: `/user/passport/logout`,
    method: 'get'
  });
}

// 登录后用户信息获取
export const reqUserInfo = () => request({
  url: `/user/passport/auth/getUserInfo`,
  method: 'get'
});