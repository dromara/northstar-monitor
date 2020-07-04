<template>
  <div class="accout" @click="unselectPosition" >
    <group label-width="5em">
      <popup-picker title="当前账户" :data="$store.state.account.accountList" v-model="currentAccount"
                    @on-change="onAccountChange" placeholder="空"></popup-picker>
    </group>
    <div class="account-fixed">
      <div class="row-top">
        <flexbox>
          <flexbox-item><div class="grid-content ">权益: {{ $store.state.account.balance }}</div></flexbox-item>
          <flexbox-item><div class="grid-content ">可用: {{ $store.state.account.available }}</div></flexbox-item>
          <flexbox-item><div class="grid-content">使用率: {{ usageRate }}%</div></flexbox-item>
        </flexbox>
      </div>
      <tab>
        <tab-item selected @on-item-click="currentTab = '持仓'">持仓</tab-item>
        <tab-item @on-item-click="currentTab = '挂单'">挂单</tab-item>
        <tab-item @on-item-click="currentTab = '委托'">委托</tab-item>
        <tab-item @on-item-click="currentTab = '成交'">成交</tab-item>
      </tab>
    </div>
    <div class="data-table">
      <trader-table :data="$store.state.account.positions" :keyMap="positionKeyMap" v-show="currentTab==='持仓'" @blur.native="unselectPosition" @rowClick="selectPosition" @click.native.stop :highlightStyle="highlightStyleMap"></trader-table>
      <trader-table :data="$store.state.account.orders.filter(i => ['全挂','未挂','部分成','未全成'].indexOf(i.state) >= 0)" :keyMap="orderKeyMap" v-show="currentTab==='挂单'" @blur.native="unselectOrder" @rowClick="selectOrder" @click.native.stop></trader-table>
      <trader-table :data="$store.state.account.orders" :keyMap="doneOrderKeyMap" v-show="currentTab==='委托'"></trader-table>
      <trader-table :data="$store.state.account.transactions" :keyMap="transactionKeyMap" v-show="currentTab==='成交'"></trader-table>
    </div>
    <actionsheet v-model="withdrawConfirm" :menus="withdrawOption" @on-click-menu-withdraw="onWithdraw" ></actionsheet>
  </div>
</template>

<script>
  import TraderTable from '../components/TraderTable'
  import { positionKeyMap, orderKeyMap, doneOrderKeyMap, transactionKeyMap } from '../assets/meta-data/keyMaps'
  import tradeService from '../api/service/tradeService'

  export default {
    name: 'account-part',
    components: {
      TraderTable
    },
    computed: {
      usageRate () {
        if (this.$store.state.account.balance === 0) {
          return 0
        }
        return ((this.$store.state.account.balance - this.$store.state.account.available) / this.$store.state.account.balance * 100).toFixed(1)
      }
    },
    created () {
    },
    mounted () {
      this.$nextTick(this.init)
    },
    data () {
      return {
        positionKeyMap,
        orderKeyMap,
        transactionKeyMap,
        doneOrderKeyMap,
        withdrawConfirm: false,
        withdrawOption: {
          'title.noop': '<span style="color:#666;font-size:12px;">是否撤单？</span>',
          withdraw: '<span style="color:red">撤单</span>'
        },
        selectedOrder: null,
        currentTab: '持仓',
        currentAccount: [],
        highlightStyleMap: {
          profit: function (val) {
            val = parseInt(val)
            return val === 0 ? '' : val > 0 ? 'trade-red-front' : 'trade-green-front'
          }
        }
      }
    },
    methods: {
      async onAccountChange (val) {
        let accountId = val[0]
        console.log(accountId)
        this.$store.commit('setCurrentAccount', accountId)
        this.$store.dispatch('getAvailableContracts', accountId)
        this.$store.dispatch('startQuery')
      },
      selectPosition (position) {
        console.log('持仓对象')
        console.log(position)
        this.$store.commit('updateSelectPosition', position)
      },
      unselectPosition () {
        console.log('取消持仓选择')
        this.$store.commit('updateSelectPosition', null)
      },
      selectOrder (order) {
        console.log('订单对象')
        console.log(order)
        this.withdrawConfirm = true
        this.selectedOrder = order
      },
      unselectOrder () {
        console.log('取消订单选择')
        this.selectedOrder = null
      },
      onWithdraw (val) {
        console.log(val)
        return tradeService.cancelOrder(this.selectedOrder)
      }
    }
  }
</script>

<style scoped>
  .row-top {
    background-color: rgba(38, 38, 38, 0.4);
  }

  .grid-content{
    text-indent: 0.7em;
  }

  .accout /deep/ .vux-no-group-title{
    margin-top: 0px;
    background-color: #545c64;
  }

  .data-table{
    height: calc(100% - 86px);
    overflow: auto;
  }

  .vux-tab-wrap{
    padding-top: 28px;
  }

  .vux-tab-wrap /deep/ .vux-tab-container, .vux-tab-wrap /deep/ .vux-tab{
    height: 28px;
  }

  .vux-tab .vux-tab-item{
    line-height: 28px;
  }
  .accout /deep/ .weui-cells{
    font-size: 14px;
  }

</style>
