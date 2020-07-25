import axios from 'axios'
import loginService from './loginService'

axios.defaults.headers.post['Content-Type'] = 'application/json'

// 业务层的统一处理
const resolveResult = (response) => {
  if (response && response.status === 200 && response.data.rtnCode === 200) {
    return response.data.data
  }
  let errMsg = response.message || '遇到未知异常'
  console.warn(errMsg)
  console.warn(response)
  throw new Error(errMsg)
}

// 网络层的统一处理
const handleError = (e) => {
  let errMsg = '网络异常'
  console.warn(errMsg)
  console.warn(e)
  throw new Error(errMsg)
}

let request = axios.create({
  baseURL: process.env.TRADER_ENDPOINT
})

request.interceptors.response.use(resolveResult, handleError)
request.interceptors.request.use(async config => {
  console.log('使用权限拦截器')
  let header = await loginService.genHeader()
  Object.assign(config.headers, header)
  return config
})

export default request
