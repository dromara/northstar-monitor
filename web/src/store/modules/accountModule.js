/**
 * 保存账户状态
 */

const getFromFactory = () => {
  return {
    lastUpdateTime: 0,
    account: {},
    position: new Map(),
    order: new Map(),
    transaction: new Map()
  }
}
const accountModule = {
  state: () => ({}),
  mutations: {
    updateAccount(state, acc) {
      let gatewayId = acc.gatewayid
      if (!state[gatewayId]) {
        state[gatewayId] = getFromFactory()
      }
      state[gatewayId].account = acc
      state[gatewayId].lastUpdateTime = new Date().getTime()
    },
    updatePosition(state, pos) {
      let gatewayId = pos.gatewayid
      if (!state[gatewayId]) {
        state[gatewayId] = getFromFactory()
      }
      state[gatewayId].position.set(pos.positionid, pos)
    },
    updateTrade(state, trade) {
      let gatewayId = trade.gatewayid
      if (!state[gatewayId]) {
        state[gatewayId] = getFromFactory()
      }
      state[gatewayId].transaction.set(trade.tradeid, trade)
    },
    updateOrder(state, order) {
      let gatewayId = order.gatewayid
      if (!state[gatewayId]) {
        state[gatewayId] = getFromFactory()
      }
      state[gatewayId].order.set(order.orderid, order)
    }
  },
  actions: {},
  getters: {
    getAccountInfoByGatewayId: (state) => (gatewayId) => {
      return state[gatewayId]
    },
    isAccountConnected: (state) => (gatewayId) => {
      if (!state[gatewayId]) {
        return false
      }
      return new Date().getTime() - state[gatewayId].lastUpdateTime < 3000
    }
  }
}

export default accountModule
