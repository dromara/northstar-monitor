/**
 * 保存合约信息
 */
const contractModule = {
  state: () => ({
    gatewayContractMap: {}
  }),
  mutations: {
    updateContract(state, contract) {
      let gatewayId = contract.gatewayid
      if (!state.gatewayContractMap[gatewayId]) {
        state.gatewayContractMap[gatewayId] = new Map()
      }
      state.gatewayContractMap[gatewayId].set(contract.unifiedsymbol, contract)
    }
  },
  actions: {},
  getters: {
    findContractBySymbol: (state) => (gatewayId, unifiedsymbol) => {
      if (!(gatewayId in state.gatewayContractMap)) {
        throw new Error('没有找到网关' + gatewayId)
      }

      let contractMap = state.gatewayContractMap[gatewayId]
      return contractMap.get(unifiedsymbol)
    }
  }
}

export default contractModule
