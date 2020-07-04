import axios from 'axios'
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
  baseURL: process.env.TRADER_ENDPOINT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

request.interceptors.response.use(resolveResult, handleError)

export default request
