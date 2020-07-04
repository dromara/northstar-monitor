'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DISCONNECT: false,
  SOCKET_ENDPOINT: '"http://localhost:51888"',
  TRADER_ENDPOINT: '"http://localhost:8888"',
  STRATEGY_ENDPOINT: '""'
})
