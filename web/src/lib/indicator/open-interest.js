'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

var _default = {
  name: 'OpDif',
  series: 'volume',
  shouldCheckParamCount: false,
  shouldFormatBigNumber: false,
  // precision: 0,
  baseValue: 0,
  plots: [
    {
      key: 'openInterestDelta',
      title: 'OpDif: ',
      type: 'bar',
      color: function color(data, options) {
        var currentData = data.currentData
        if (currentData.technicalIndicatorData.openInterestDelta > 0) {
          return options.bar.downColor
        } else if (currentData.technicalIndicatorData.openInterestDelta < 0) {
          return options.bar.upColor
        } else {
          return options.bar.noChangeColor
        }
      }
    }
  ],

  calcTechnicalIndicator: (dataList) => {
    return dataList.map((kLineData) => {
      const openInterestDelta = kLineData.openInterestDelta || 0
      return {
        openInterestDelta
      }
    })
  }
}
exports.default = _default
