import baseService from './baseRequest'

export default {
  login(username, password) {
    return baseService.post('/auth/login', {
      userName: username,
      password: password
    })
  }
}
