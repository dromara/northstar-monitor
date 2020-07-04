<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import './assets/index.css'
  import accountService from './api/service/accountService'
  import { TickField } from './api/pb/core_field_pb'
  import SocketIO from 'socket.io-client'

  export default {
    name: 'app',
    data () {
      return {
        socket: null,
        currentRoom: 'default'
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
    methods: {
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

<style lang="less">
  @import '~vux/src/styles/reset.less';
  #app{
    height: 100%;
  }
</style>
