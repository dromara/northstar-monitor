import baseService from './baseRequest'

export default {
  dataSync() {
    return baseService.get('/sync')
  }
}
