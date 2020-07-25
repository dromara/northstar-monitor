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
  import accountService from '../api/service/accountService'
  import { TickField } from '../api/pb/core_field_pb'
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
        currentRoom: 'default'
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
      } else {
        console.log('禁用行情连接')
      }
    },
    watch: {
      '$store.state.marketData.focusSymbol': function (val) {
        console.log('切换订阅合约：', val)
        if (this.currentRoom) {
          this.socket.emit('logout', this.currentRoom)
        }
        this.socket.emit('login', val)
        this.currentRoom = val
      }
    },
    methods: {
      switchView (menuKey, menuItem) {
        this.currentHeader = menuItem
      },
      async init () {
        // 初始化账户列表
        let accountList = await accountService.getAccountList()
        this.$store.commit('updateAccountDetailList', accountList)
        let simpleAccountList = accountList.map(a => a.accountId)
        this.$store.commit('updateAccountList', simpleAccountList)
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
