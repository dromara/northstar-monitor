/**
 * 保存最近一次的tick与bar数据
 */
const marketCurrentDataModule = {
  state: () => ({
    curMarketGatewayId: '',
    curUnifiedSymbol: '',
    curTick: {
      askpriceList: [0, 0, 0, 0, 0],
      askvolumeList: [0, 0, 0, 0, 0],
      bidpriceList: [0, 0, 0, 0, 0],
      bidvolumeList: [0, 0, 0, 0, 0],
      lastprice: 0,
      volumedelta: 0
    },
    curBar: {}
  }),
  mutations: {
    resetMarketCurrentDataModule(state) {
      Object.assign(state, marketCurrentDataModule.state())
      console.log('重置marketCurrentDataModule', state)
    },
    updateFocusMarketGatewayId(state, gatewayId) {
      state.curMarketGatewayId = gatewayId
      console.log('当前curMarketGatewayId', gatewayId)
    },
    updateFocusUnifiedSymbol(state, unifiedsymbol) {
      state.curUnifiedSymbol = unifiedsymbol
      console.log('当前curUnifiedSymbol', unifiedsymbol)
    },
    updateTick(state, tick) {
      if (
        state.curMarketGatewayId !== tick.gatewayid ||
        state.curUnifiedSymbol !== tick.unifiedsymbol
      ) {
        return
      }
      state.curTick = tick
    },
    updateBar(state, bar) {
      if (
        state.curMarketGatewayId !== bar.gatewayid ||
        state.curUnifiedSymbol !== bar.unifiedsymbol
      ) {
        return
      }
      state.curBar = bar
    }
  },
  actions: {},
  getters: {}
}

export default marketCurrentDataModule
