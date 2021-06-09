/**
 * 保存最近一次的tick与bar数据
 */

const createFromBar = (bar) => {
  return {
    open: bar.openprice,
    low: bar.lowprice,
    high: bar.highprice,
    close: bar.closeprice,
    volume: bar.volumedelta,
    openInterestDelta: bar.openinterestdelta,
    timestamp: bar.actiontimestamp
  }
}

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
    chart: null,
    chartReady: false,
    loadingHisBar: false,
    barBuf: [],
    hisBars: [],
    lastBar: null,
    curBarH: 0,
    curBarL: 0,
    socketClient: null
  }),
  mutations: {
    initSocketClient(state, client) {
      state.socketClient = client
    },
    resetMarketCurrentDataModule(state) {
      Object.assign(state, marketCurrentDataModule.state())
      console.log('重置marketCurrentDataModule', state)
    },
    updateFocusMarketGatewayId(state, gatewayId) {
      state.curMarketGatewayId = gatewayId
      state.curUnifiedSymbol = ''
      console.log('当前curMarketGatewayId', gatewayId)
    },
    updateFocusUnifiedSymbol(state, unifiedsymbol) {
      if (state.curUnifiedSymbol) {
        state.socketClient.emit('logout', state.curUnifiedSymbol)
      }
      state.curUnifiedSymbol = unifiedsymbol
      if (unifiedsymbol) {
        state.socketClient.emit('login', unifiedsymbol)
      }
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
    updateKLineChart(state, kLineChart) {
      state.chart = kLineChart
      console.log('updateKLineChart', state.chart)
    },
    updateHisBar(state, bar) {
      if (!state.chart) {
        return
      }
      if (
        state.curMarketGatewayId !== bar.gatewayid ||
        state.curUnifiedSymbol !== bar.unifiedsymbol
      ) {
        return
      }
      if (!bar.closeprice) {
        state.chart.applyNewData(state.hisBars)
        state.hisBars = []

        if (state.barBuf.length) {
          state.barBuf.forEach((b) => state.chart.updateData(createFromBar(b)))
          state.barBuf = []
        }

        state.loadingHisBar = false
        state.chartReady = true
        return
      }
      state.loadingHisBar = true
      state.hisBars.push(createFromBar(bar))
      state.lastBar = bar
      state.curBarH = bar.closeprice
      state.curBarL = bar.closeprice
    },
    updateBar(state, bar) {
      if (!state.chart) {
        return
      }
      if (
        state.curMarketGatewayId !== bar.gatewayid ||
        state.curUnifiedSymbol !== bar.unifiedsymbol
      ) {
        return
      }
      if (state.loadingHisBar) {
        state.barBuf.push(bar)
      } else {
        state.chart.updateData(createFromBar(bar))
        state.lastBar = bar
        state.curBarH = bar.closeprice
        state.curBarL = bar.closeprice
      }
    }
  },
  actions: {},
  getters: {
    curMarketGatewayId: (state) => {
      return state.curMarketGatewayId
    },
    curUnifiedSymbol: (state) => {
      return state.curUnifiedSymbol
    }
  }
}

export default marketCurrentDataModule
