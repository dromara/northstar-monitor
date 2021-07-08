module.exports = {
  '/mgt/gateway': {
    method: 'get',
    data: [
      {
        gatewayId: 'MockGateway',
        description: '这是一个mock数据',
        gatewayType: 'CTP',
        gatewayUsage: 'MARKET_DATA',
        connectionState: 'DISCONNECTED',
        autoConnect: false,
        gatewayAdapterType: ''
      }
    ]
  }
}
