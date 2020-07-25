import CryptoJS from 'crypto-js'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'

let _username, _password, t
let token
export default {
  setUserInfo (username, password) {
    _username = username
    _password = password
  },
  async auth () {
    let now = new Date().getTime()
    if (now - t < 60000 && token) {
      return token
    }
    t = now
    let response = await axios.post(`${process.env.TRADER_ENDPOINT}/auth?t=${t}`, CryptoJS.MD5(`${_username}&${_password}&${t}`).toString())
    if (response.status !== 200 || response.data.rtnCode !== 200) {
      throw new Error(response.message || '遇到未知异常')
    }
    token = response.data.data
    return token
  },
  async genHeader () {
    let token = await this.auth()
    return {
      token: token
    }
  }
}
