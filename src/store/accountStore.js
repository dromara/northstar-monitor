import accountService from '../api/service/accountService'
import tradeService from '../api/service/tradeService'
import contractNameMap from '../assets/meta-data/contractNameMap'

const account = {
  // 全局状态变量
  state: {
    balance: 0,
    available: 0,
    positions: [],
    transactions: [],
    orders: [],
    accountList: [['']], // 保留一个空字符，否则页面会报错
    currentAccount: [],
    accountDetailList: [],
    availableContracts: []
  },
  // 同步修改状态
  mutations: {
    updateAccountList (state, list) {
      state.accountList = [list]
    },
    updateAccountDetailList (state, list) {
      console.log('更新账户列表')
      console.log(list)
      state.accountDetailList = list
    },
    updateAccount (state, account) {
      state.balance = parseInt(account.balance)
      state.available = parseInt(account.available)
    },
    updatePosition (state, positions) {
      state.positions = positions
    },
    updateTransaction (state, transactions) {
      state.transactions = transactions
    },
    updateOrder (state, orders) {
      state.orders = orders
    },
    setCurrentAccount (state, accountId) {
      state.currentAccount = [accountId]
    },
    updateContracts (state, contracts) {
      state.availableContracts = contracts
    }
  },
  // 允许异步修改状态
  actions: {
    async startQuery ({ commit, state, dispatch }) {
      let accountInfoPromise = accountService.getAccountInfo(state.currentAccount)
      let positionInfoPromise = accountService.getPositionInfo(state.currentAccount)
      let orderInfoPromise = accountService.getOrderInfo(state.currentAccount)
      let transactionInfoPromise = accountService.getTransactionInfo(state.currentAccount)
      let [accountInfo, positionInfo, orderInfo, transactionInfo] = await Promise.all([accountInfoPromise, positionInfoPromise, orderInfoPromise, transactionInfoPromise])
      commit('updateAccount', accountInfo)
      commit('updatePosition', positionInfo)
      commit('updateOrder', orderInfo)
      commit('updateTransaction', transactionInfo)
      // 每秒轮询
      setTimeout(() => {
        dispatch('startQuery')
      }, 1300)
    },
    async getAvailableContracts ({ commit, state }, accountId) {
      let accountInfo = state.accountDetailList.find(item => item.accountId === accountId)
      if (!accountInfo) {
        throw new Error('没有找到账户信息')
      }
      let gatewayId = accountInfo.gatewayInfo.gatewayId
      console.log(gatewayId)
      let contracts = await tradeService.getAvailableFutureContract(gatewayId)
      commit('updateContracts', contracts)
    }
  },
  getters: {
    contracts (state) {
      return state.availableContracts.map(c => {
        let symbol = c.symbol
        let contractName = symbol.replace(/\d+/, '').toUpperCase()
        let contractMonth = symbol.replace(/[A-z]+/, '')
        contractMonth = contractMonth.length === 3 ? '2' + contractMonth : contractMonth
        if (!contractNameMap[contractName]) {
          return c
        }
        c.name = contractNameMap[contractName] + contractMonth
        return c
      })
    }
  }
}

export default account
