import baseService from './baseRequest'

export default {
  startPlay(startDate, endDate, moduleNames) {
    return baseService.post(`/pb/play?startDate=${startDate}&endDate=${endDate}`, moduleNames)
  },
  getProcess(playId) {
    return baseService.get(`/pb/play/process?playId=${playId}`)
  }
}
