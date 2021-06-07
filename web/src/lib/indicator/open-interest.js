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
  // maxValue: 10000,
  baseValue: 0,
  // minValue: -10000,
  plots: [
    {
      key: 'openInterestDelta',
      title: 'OpDif: ',
      type: 'bar'
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
