import axios from 'axios'
import { Message } from 'element-ui'

// require('promise.prototype.finally').shim()

// create an axios instance
const service = axios.create({
  baseURL: '/northstar', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 3000 // 请求的超时时间
})

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 统一请求的异常处理
    if (res.status !== 200) {
      Message({
        message: res.message || '服务出错',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    Message({
      message: '服务出错',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
