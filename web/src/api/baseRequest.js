import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'

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
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      router.push('/')
      return Promise.reject(new Error(res.message))
    }
    // 统一请求的异常处理
    if (res.status !== 200) {
      Message({
        message: res.message || '服务出错',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message))
    } else {
      return res.data
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    Message({
      message: '网络出错',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
