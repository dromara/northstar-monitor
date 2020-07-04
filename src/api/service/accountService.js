import service from './commonRequest'

export default {
  /**
   * 获取账户列表
   * @returns {Promise<AxiosResponse<T>>}
   */
  getAccountList () {
    return service.get(`/account/list`)
  },
  /**
   * 获取账户信息
   * @param accountId
   * @returns {Promise<AxiosResponse<T>>}
   */
  getAccountInfo (accountId) {
    return service.get(`/account/info?accountId=${accountId}`)
  },
  /**
   * 获取委托信息
   * @param accountId
   * @returns {Promise<AxiosResponse<T>>}
   */
  getOrderInfo (accountId) {
    return service.get(`/account/order?accountId=${accountId}`)
  },
  /**
   * 获取持仓信息
   * @param accountId
   * @returns {Promise<AxiosResponse<T>>}
   */
  getPositionInfo (accountId) {
    return service.get(`/account/position?accountId=${accountId}`)
  },
  /**
   * 获取成交信息
   * @param accountId
   * @returns {Promise<AxiosResponse<T>>}
   */
  getTransactionInfo (accountId) {
    return service.get(`/account/trade?accountId=${accountId}`)
  },
  /**
   * 连接网关账户
   * @param accountId
   * @returns {Promise<AxiosResponse<T>>}
   */
  connectGateway (accountId) {
    return service.get(`/account/connect?accountId=${accountId}`)
  },
  /**
   * 断开网关账户
   * @param accountId
   * @returns {Promise<AxiosResponse<T>>}
   */
  disconnectGateway (accountId) {
    return service.get(`/account/disconnect?accountId=${accountId}`)
  }
}
