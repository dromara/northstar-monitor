/* eslint-disable */
// import axios from 'axios'

// require('promise.prototype.finally').shim()
console.log('App base path: ', process.env.VUE_APP_BASE_PATH)
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_PATH, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 3000 // 请求的超时时间
})

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.status === 555) {
      return Promise.reject(new Error(res.message))
    }
    // 统一请求的异常处理
    if (res.status !== 200) {
      return Promise.reject(new Error(res.message))
    } else {
      return res.data
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    return Promise.reject(new Error('网络出错'))
  }
)

export default service
