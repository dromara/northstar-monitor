<template>
  <div class="monitor">
    <x-header :left-options="{showBack: false}" :right-options="{showMore: true}" @on-click-more="showMenu = true">{{ currentHeader }}</x-header>
    <!--<trade-view v-if="currentHeader==='交易与账户-旧'"></trade-view>-->
    <trader-view v-if="currentHeader==='交易与账户'"></trader-view>
    <div>
      <actionsheet :menus="menus" v-model="showMenu" @on-click-menu="switchView" :close-on-clicking-mask="false"></actionsheet>
    </div>
  </div>
</template>

<script>
  import TraderView from '../views/TraderView'
  import { TickField, AccountField, PositionField, TradeField, OrderField } from '../api/pb/core_field_pb'
  import SocketIO from 'socket.io-client'

  export default {
    components: {
      TraderView
    },
    name: 'monitor',
    data () {
      return {
        currentHeader: '交易与账户',
        menus: {
          menu1: '交易与账户',
          menu2: '策略管理'
        },
        showMenu: false,
        socket: null,
        currentUnifiedSymbol: '',
        currentGatewayId: ''
      }
    },
    mounted () {
      this.init().catch(e => this.$throw(e, this))
      if (!process.env.DISCONNECT) {
        console.log('启用行情连接')
        console.log('socket服务地址:', process.env.SOCKET_ENDPOINT)
        this.socket = SocketIO(process.env.SOCKET_ENDPOINT)
        this.socket.on('TickData', (data) => {
          let tick = TickField.deserializeBinary(data).toObject()
          this.$store.commit('updateTick', tick)
        })
        this.socket.on('AccountData', (data) => {
          let account = AccountField.deserializeBinary(data).toObject()
          this.$store.commit('updateAccount', account)
        })
        this.socket.on('PositionData', (data) => {
          let position = PositionField.deserializeBinary(data).toObject()
          this.$store.commit('updatePosition', position)
        })
        this.socket.on('TradeData', (data) => {
          let trade = TradeField.deserializeBinary(data).toObject()
          this.$store.commit('updateTrade', trade)
        })
        this.socket.on('OrderData', (data) => {
          let order = OrderField.deserializeBinary(data).toObject()
          console.log(order)
          this.$store.commit('updateOrder', order)
        })
      } else {
        console.log('禁用行情连接')
      }
    },
    watch: {
      '$store.state.marketData.focusSymbol': function (val) {
        let unifiedSymbol = val
        console.log('切换订阅合约：', unifiedSymbol)
        if (this.currentUnifiedSymbol) {
          this.socket.emit('logout', this.currentUnifiedSymbol)
        }
        this.socket.emit('login', unifiedSymbol)
        this.currentUnifiedSymbol = unifiedSymbol
      },
      '$store.state.account.currentGateway': function (val) {
        if (!val.length) {
          return
        }
        let gateway = val[0]
        console.log('切换账户：', gateway)
        if (this.currentGatewayId) {
          this.socket.emit('logout', this.currentGatewayId)
        }
        this.socket.emit('login', gateway.gatewayId)
        this.currentGatewayId = gateway.gatewayId
      }
    },
    methods: {
      switchView (menuKey, menuItem) {
        this.currentHeader = menuItem
      },
      async init () {
      }
    }
  }
</script>

<style scoped>
  .monitor{
    height: 100%;
  }
  .view-common{
    height: calc(100% - 46px)
  }
</style>
