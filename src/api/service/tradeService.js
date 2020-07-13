import service from './commonRequest'

/**
 * 委托下单
 * @param accountId
 * @param symbol
 * @param dir
 * @param price
 * @param kpType
 * @param vol
 * @returns {Promise<AxiosResponse<T>>}
 */
const submitOrder = (accountId, symbol, dir, price, kpType, vol, priceType) => {
  return service.post(`/trade/order?accountId=${accountId}&contractSymbol=${symbol}&direction=${dir}&price=${price}&transactionType=${kpType}&volume=${vol}&priceType=${priceType}`)
}

/**
 * 委托撤单
 * @param accountId
 * @param orderId
 * @returns {Promise<AxiosResponse<T>>}
 */
const cancelOrder = (accountId, orderId) => {
  return service.post(`/trade/cancel?accountId=${accountId}&orderId=${orderId}`)
}

export default {
  /**
   * 多开
   * @param accountId
   * @param unifiedSymbol
   * @param price
   * @param vol
   * @returns {Promise<AxiosResponse<T>>}
   */
  buyOpen (accountId, unifiedSymbol, price, vol, priceType) {
    let symbol = unifiedSymbol.split('@')[0]
    console.log(`买开，合约${symbol}，价格${price}，手数${vol}，类型${priceType}`)
    return submitOrder(accountId, symbol, 'D_Buy', price, 'OF_Open', vol, priceType)
  },
  /**
   * 空开
   * @param accountId
   * @param unifiedSymbol
   * @param price
   * @param vol
   * @returns {Promise<AxiosResponse<T>>}
   */
  sellOpen (accountId, unifiedSymbol, price, vol, priceType) {
    let symbol = unifiedSymbol.split('@')[0]
    console.log(`卖开，合约${symbol}，价格${price}，手数${vol}，类型${priceType}`)
    return submitOrder(accountId, symbol, 'D_Sell', price, 'OF_Open', vol, priceType)
  },
  /**
   * 平仓
   * @param accountId
   * @param position
   */
  closePosition (position, dir, price, vol, priceType) {
    let accountId = position.accountId
    let symbol = position.unifiedSymbol.split('@')[0]
    let tdAvailable = position.tdPosition - position.tdFrozen
    let totalAvailable = position.totalPosition - position.tdFrozen - position.ydFrozen
    if (vol > totalAvailable) {
      throw new Error('持仓不足')
    }
    // 当合约为非上期所合约时，直接下单
    console.log(`平仓，方向${dir}，合约${symbol}，价格${price}，手数${vol}，类型${priceType}`)
    if (position.exchange !== 'SHFE') {
      return submitOrder(accountId, symbol, dir, price, 'OF_Close', vol, priceType)
    }
    let dealTd = tdAvailable > vol ? vol : tdAvailable
    let dealYd = vol - dealTd
    // 当合约为上期所合约
    let promises = []
    // 当有今仓时，先平今
    if (dealTd) {
      let p = submitOrder(accountId, symbol, dir, price, 'OF_CloseToday', dealTd, priceType)
      promises.push(p)
    }
    if (dealYd) {
      let p = submitOrder(accountId, symbol, dir, price, 'OF_CloseYesterday', dealYd, priceType)
      promises.push(p)
    }
    return Promise.all(promises)
  },
  /**
   * 撤单
   * @param accountId
   * @param order
   */
  cancelOrder (order) {
    let accountId = order.accountId
    let orderId = order.orderId
    return cancelOrder(accountId, orderId)
  },
  /**
   * 获取网关合约
   * @param gatewayId
   * @returns {Promise<AxiosResponse<T>>}
   */
  getAvailableFutureContract (gatewayId) {
    return service.get(`/market/available/future?gatewayId=${gatewayId}`)
  }
}
