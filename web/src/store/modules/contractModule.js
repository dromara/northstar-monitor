/**
 * 保存合约信息
 */
const PRODUCT_CLASS_TYPE = {
  2: 'FUTURES',
  3: 'OPTION'
}
const contractModule = {
  state: () => ({
    gatewayContractMap: {}
  }),
  mutations: {
    updateContract(state, contract) {
      let gatewayId = contract.gatewayid
      if (!state.gatewayContractMap[gatewayId]) {
        state.gatewayContractMap[gatewayId] = {
          FUTURES: new Map(),
          OPTION: new Map()
        }
      }
      try {
        state.gatewayContractMap[gatewayId][
          PRODUCT_CLASS_TYPE[contract.productclass]
        ].set(contract.unifiedsymbol, contract)
      } catch (e) {
        console.error(e)
        console.warn(contract.productclass)
      }
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
    },
    findContractsByType: (state) => (gatewayId, type) => {
      if (!(gatewayId in state.gatewayContractMap)) {
        throw new Error('没有找到网关' + gatewayId)
      }
      let contractMap = state.gatewayContractMap[gatewayId][type]
      return [...contractMap].map((i) => i[1])
    }
  }
}

export default contractModule
