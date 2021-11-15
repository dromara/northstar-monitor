import baseService from './baseRequest'

export default {
  startPlay(startDate, endDate, moduleNames, playbackAccountInitialBalance, tickOfFee=0) {
    return baseService.post(`/pb/play`, {
      startDate,
      endDate,
      moduleNames,
      playbackAccountInitialBalance,
      tickOfFee,
      precision: 'TICK'
    })
  },
  getProcess() {
    return baseService.get(`/pb/play/process`)
  },
  getBalance(moduleName){
    return baseService.get(`/pb/balance?moduleName=${moduleName}`)
  },
  getPlaybackRecord(moduleName) {
    return baseService.get(`/pb/record?moduleName=${moduleName}`)
  },
  getPlaybackReadiness() {
    return baseService.get(`/pb/readiness`)
  }
}
