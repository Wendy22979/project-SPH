// axios分封装
import axios from 'axios'//引入axios
// 引入进度条
import nprogress from 'nprogress';
import "nprogress/nprogress.css"
// 创建实例化axios
const request = axios.create({
  baseURL:"/api",
  //请求超时，5s
  timeout: 5000,
})

// 添加请求拦截器
request.interceptors.request.use(function (config) { //请求发送成功
  nprogress.start()//开启进度条
  return config;
}, function (error) {//请求错误

  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {//响应成功
  nprogress.done();//响应成功关闭进度条
  return response.data;
}, function (error) {//响应失败

  nprogress.done();//响应失败关闭进度条
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default request