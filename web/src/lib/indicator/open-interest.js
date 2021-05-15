'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

var _default = {
  name: 'OPID',
  series: 'volume',
  shouldCheckParamCount: false,
  shouldFormatBigNumber: false,
  precision: 0,
  baseValue: 0,
  minValue: 0,
  plots: [
    {
      key: 'openInterest',
      title: 'OPID: ',
      type: 'line'
    }
  ],
  calcTechnicalIndicator: (dataList) => {
    return dataList.map((kLineData) => {
      const openInterest = kLineData.openInterest || 0
      return {
        openInterest
      }
    })
  }
}
exports.default = _default
