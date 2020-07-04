
const marketData = {
  // 全局状态变量
  state: {
    focusSymbol: '',
    lastPrice: 0,
    openInterestChange: 0,
    askPrice: 0,
    askVolume: 0,
    bidPrice: 0,
    bidVolume: 0,
    buyLimitPrice: 0,
    sellLimitPrice: 0,
    selectedPosition: null
  },
  // 同步修改状态
  mutations: {
    updateSelectPosition (state, p) {
      state.selectedPosition = p
    },
    updateTick (state, tick) {
      let symbol = tick.unifiedsymbol
      if (symbol !== state.focusSymbol) {
        return
      }
      state.lastPrice = tick.lastprice
      state.openInterestChange = tick.openinterest - tick.preopeninterest
      state.askPrice = tick.askpriceList[0]
      state.askVolume = tick.askvolumeList[0]
      state.bidPrice = tick.bidpriceList[0]
      state.bidVolume = tick.bidvolumeList[0]
      state.buyLimitPrice = tick.upperlimit
      state.sellLimitPrice = tick.lowerlimit
    },
    setFocus (state, val) {
      state.focusSymbol = val
    }
  },
  // 允许异步修改状态
  actions: {
  }
}

export default marketData
