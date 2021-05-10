/**
 * 保存最近一次的tick与bar数据
 */
const marketCurrentDataModule = {
  state: () => ({
    curUnifiedSymbol: '',
    curTick: {},
    curBar: {}
  }),
  mutations: {
    updateFocusUnifiedSymbol(state, unifiedsymbol) {
      state.curUnifiedSymbol = unifiedsymbol
    },
    updateTick(state, tick) {
      if (state.curUnifiedSymbol !== tick.unifiedsymbol) {
        return
      }
      state.curTick = tick
    },
    updateBar(state, bar) {
      if (state.curUnifiedSymbol !== bar.unifiedsymbol) {
        return
      }
      state.curBar = bar
    }
  },
  actions: {},
  getters: {}
}

export default marketCurrentDataModule
