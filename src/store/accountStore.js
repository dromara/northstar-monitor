import tradeService from '../api/service/tradeService'
import { ContractField } from '../api/pb/core_field_pb'
import { ExchangeEnum } from '../api/pb/core_enum_pb'

const exchangeMap = Object.keys(ExchangeEnum).reduce((map, key) => {
  map[ExchangeEnum[key]] = key
  return map
}, {})

const positionDir = {
  2: '多',
  3: '空'
}
const orderDir = {
  1: '买',
  2: '卖'
}
const orderState = {
  0: '全挂',
  1: '全成',
  2: '部分成',
  3: '部分成',
  4: '全挂',
  5: '未挂',
  6: '已撤单',
  7: '未挂',
  8: '全挂',
  9: '已拒绝'
}
const account = {
  // 全局状态变量
  state: {
    balance: 0,
    available: 0,
    account: {},
    positions: [],
    positionMap: {},
    transactions: [],
    transactionMap: {},
    orders: [],
    orderMap: {},
    currentGateway: [],
    accountNameList: [['']],
    accountList: [],
    availableContracts: []
  },
  // 同步修改状态
  mutations: {
    updateAccountNameList (state, val) {
      state.accountNameList = [val]
    },
    updateAccountList (state, val) {
      state.accountList = val
    },
    updateAccount (state, account) {
      state.balance = account ? parseInt(account.balance) : 0
      state.available = account ? parseInt(account.available) : 0
      state.account = account
    },
    updatePosition (state, position) {
      state.positionMap[position.positionid] = position
      const arr = []
      Object.keys(state.positionMap).forEach(k => {
        const v = state.positionMap[k]
        const contract = v.contract
        const obj = {
          name: contract.name,
          unifiedSymbol: contract.unifiedsymbol,
          direction: positionDir[v.positiondirection],
          totalPosition: v.position,
          availablePosition: v.position - v.frozen,
          avgOpenPrice: v.openprice.toFixed(2),
          profit: parseInt(v.openpositionprofit),
          gatewayId: v.gatewayid,
          tdPosition: v.tdposition,
          ydPosition: v.ydposition,
          tdFrozen: v.tdfrozen,
          ydFrozen: v.ydfrozen,
          exchange: exchangeMap[contract.exchange]
        }
        arr.push(obj)
      })
      state.positions = arr
    },
    updateTrade (state, trade) {
      state.transactionMap[trade.tradeid] = trade
      const arr = []
      Object.keys(state.transactionMap).forEach(k => {
        const v = state.transactionMap[k]
        const contract = v.contract
        const obj = {
          name: contract.name,
          action: `${orderDir[v.direction]}${v.offsetflag === 1 ? '开' : '平'}`,
          tradePrice: v.price,
          tradeVolume: v.volume,
          tradeTime: v.tradetime
        }
        arr.push(obj)
      })
      state.transactions = arr
    },
    updateOrder (state, order) {
      state.orderMap[order.orderid] = order
      const arr = []
      Object.keys(state.orderMap).forEach(k => {
        const v = state.orderMap[k]
        const contract = v.contract
        const obj = {
          name: contract.name,
          state: orderState[v.orderstatus],
          action: `${orderDir[v.direction]}${v.offsetflag === 1 ? '开' : '平'}`,
          orderPrice: v.price,
          totalOrderVolume: v.totalvolume,
          tradedOrderVolume: v.tradedvolume,
          canceledOrderVolume: v.canceltime ? v.totalvolume - v.tradedvolume : 0,
          orderTime: v.ordertime
        }
        arr.push(obj)
      })
      state.orders = arr
    },
    setCurrentGateway (state, val) {
      state.currentGateway = val
    },
    updateContracts (state, contracts) {
      state.availableContracts = contracts
    }
  },
  // 允许异步修改状态
  actions: {
    getAccountList ({ commit }) {
      console.log('获取账户列表')
      tradeService.getTradableAccountList().then(list => {
        let nameList = list.map(item => item.name)
        commit('updateAccountNameList', nameList)
        commit('updateAccountList', list)
      })
    },
    getContracts ({ commit }) {
      console.log('获取合约列表')
      tradeService.getContracts().then(list => {
        let contracts = list.map(byteArr => ContractField.deserializeBinary(byteArr).toObject())
        console.log(contracts)
        commit('updateContracts', contracts)
      })
    }
  }
}

export default account
