import baseService from './baseRequest'

export default {
  dataSync() {
    return baseService.get('/data/sync')
  },

  loadHistoryBars(gatewayId, unifiedSymbol, startDate, endDate) {
    console.log(
      `查询网关${gatewayId} 合约${unifiedSymbol} 从${startDate}到${endDate}的数据`
    )
    return baseService.get(
      `/data/his/bar?gatewayId=${gatewayId}&unifiedSymbol=${unifiedSymbol}&startDate=${startDate}&endDate=${endDate}`
    )
  },

  getAvailableContracts() {
    return baseService.get('/data/contracts')
  }
}
