import baseService from './baseRequest'

export default {
  buyOpen(gatewayId, unifiedSymbol, price, volume, stopPrice) {
    baseService.post('/trade/submit', {
      contractUnifiedSymbol: unifiedSymbol,
      price: price,
      stopPrice: stopPrice,
      volume: volume,
      tradeOpr: 'BK',
      gatewayId: gatewayId
    })
  },
  sellOpen(gatewayId, unifiedSymbol, price, volume, stopPrice) {
    baseService.post('/trade/submit', {
      contractUnifiedSymbol: unifiedSymbol,
      price: price,
      stopPrice: stopPrice,
      volume: volume,
      tradeOpr: 'SK',
      gatewayId: gatewayId
    })
  },
  closeLongPosition(gatewayId, unifiedSymbol, price, volume) {
    baseService.post('/trade/submit', {
      contractUnifiedSymbol: unifiedSymbol,
      price: price,
      volume: volume,
      tradeOpr: 'SP',
      gatewayId: gatewayId
    })
  },
  closeShortPosition(gatewayId, unifiedSymbol, price, volume) {
    baseService.post('/trade/submit', {
      contractUnifiedSymbol: unifiedSymbol,
      price: price,
      volume: volume,
      tradeOpr: 'BP',
      gatewayId: gatewayId
    })
  },
  cancelOrder(gatewayId, orderId) {
    baseService.post('/trade/cancel', {
      orderId: orderId,
      gatewayId: gatewayId
    })
  }
}
