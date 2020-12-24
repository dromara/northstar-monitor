<!-- 新版 -->
<template>
  <div class="view-common">
    <div class="accout account-part" @click="unselectPosition" >
      <group label-width="5em">
        <popup-picker ref="picker" title="当前账户" :data="$store.state.account.accountNameList" v-model="currentAccount"
                      @on-change="onAccountChange" placeholder="空" ></popup-picker>
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
        <trader-table :data="$store.state.account.positions.filter(i => i.totalPosition > 0)" :keyMap="positionKeyMap" v-show="currentTab==='持仓'" @blur.native="unselectPosition" @rowClick="selectPosition" @click.native.stop :highlightStyle="highlightStyleMap"></trader-table>
        <trader-table :data="$store.state.account.orders.filter(i => ['全挂','未挂','部分成','未全成'].indexOf(i.state) >= 0)" :keyMap="orderKeyMap" v-show="currentTab==='挂单'" @blur.native="unselectOrder" @rowClick="selectOrder" @click.native.stop></trader-table>
        <trader-table :data="$store.state.account.orders" :keyMap="doneOrderKeyMap" v-show="currentTab==='委托'"></trader-table>
        <trader-table :data="$store.state.account.transactions" :keyMap="transactionKeyMap" v-show="currentTab==='成交'"></trader-table>
      </div>
      <actionsheet v-model="withdrawConfirm" :menus="withdrawOption" @on-click-menu-withdraw="onWithdraw" ></actionsheet>
    </div>
    <div class="trade-part">
      <flexbox>
        <flexbox-item :span="4/10">
          <el-select name="合约" v-model="focusSymbol" filterable placeholder="选择合约" style="margin-left: 1em;" @change="chooseContract">
            <el-option
              v-for="(item) in $store.state.account.availableContracts"
              :key="item.unifiedsymbol"
              :label="item.name"
              :value="item.unifiedsymbol">
            </el-option>
          </el-select>
        </flexbox-item>
        <flexbox-item :span="3/11">
          <el-select name="价格类型" v-model="priceType" placeholder="请选择">
            <el-option
              v-for="(item,i) in priceTypeOptions"
              :key="i"
              :label="item.label"
              :value="item">
            </el-option>
          </el-select>
        </flexbox-item>
        <flexbox-item :span="3/13">
          <el-select name="手数" v-model="volume" filterable placeholder="选择手数" >
            <el-option
              v-for="(val, i) in tradeVol"
              :key="i"
              :label="val"
              :value="val">
            </el-option>
          </el-select>
        </flexbox-item>
      </flexbox>
      <div class="market-board">
        <x-table :cell-bordered="false">
          <tbody>
          <tr>
            <td class="col1">新</td>
            <td class="col2">{{ $store.state.marketData.lastPrice }}</td>
            <td class="col3">{{ $store.state.marketData.openInterestChange }}</td>
          </tr>
          <tr>
            <td class="col1">卖一</td>
            <td class="col2">{{ $store.state.marketData.askPrice }}</td>
            <td class="col3">{{ $store.state.marketData.askVolume }}</td>
          </tr>
          <tr>
            <td class="col1">买一</td>
            <td class="col2">{{ $store.state.marketData.bidPrice }}</td>
            <td class="col3">{{ $store.state.marketData.bidVolume }}</td>
          </tr>
          </tbody>
        </x-table>
      </div>
      <div>
        <trader-button content="多开" type="trade-red-back" @click.native="buy">{{ biddingPrice }}</trader-button>
        <trader-button content="平仓" type="trade-normal-back" @click.native="close">{{ closingPrice }}</trader-button>
        <trader-button content="空开" type="trade-green-back" @click.native="sell">{{ askingPrice }}</trader-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { positionKeyMap, orderKeyMap, doneOrderKeyMap, transactionKeyMap } from '../assets/meta-data/keyMaps'
  import tradeService from '../api/service/tradeService'
  import TraderTable from '../components/TraderTable'
  import TraderButton from '../components/TraderButton'
  export default {
    name: 'trader-view',
    components: {
      TraderTable,
      TraderButton
    },
    computed: {
      usageRate () {
        if (this.$store.state.account.balance === 0) {
          return 0
        }
        return ((this.$store.state.account.balance - this.$store.state.account.available) / this.$store.state.account.balance * 100).toFixed(1)
      },
      tradeVol () {
        let arr = []
        for (let i = 1; i < 100; i++) {
          arr.push(i)
        }
        return arr
      },
      biddingPrice () {
        switch (this.priceType.label) {
          case '对手价':
            return this.$store.state.marketData.askPrice
          case '排队价':
            return this.$store.state.marketData.bidPrice
          case '市价':
            return this.$store.state.marketData.buyLimitPrice
        }
      },
      askingPrice () {
        switch (this.priceType.label) {
          case '对手价':
            return this.$store.state.marketData.bidPrice
          case '排队价':
            return this.$store.state.marketData.askPrice
          case '市价':
            return this.$store.state.marketData.sellLimitPrice
        }
      },
      closingPrice () {
        if (!this.$store.state.marketData.selectedPosition) {
          return '未有持仓'
        }
        let isLong = this.$store.state.marketData.selectedPosition.direction === '多'
        switch (this.priceType.label) {
          case '对手价':
            return isLong ? this.$store.state.marketData.bidPrice : this.$store.state.marketData.askPrice
          case '排队价':
            return isLong ? this.$store.state.marketData.askPrice : this.$store.state.marketData.bidPrice
          case '市价':
            return isLong ? this.$store.state.marketData.sellLimitPrice : this.$store.state.marketData.buyLimitPrice
        }
      },
      priceTypeVal () {
        // 全部都用限价代替
        return 'OPT_LimitPrice'
      }
    },
    watch: {
      '$store.state.marketData.selectedPosition': function (val, oldVal) {
        if (val) {
          console.log('选中持仓', val)
          this.volume = val.availablePosition
          this.focusSymbol = val.unifiedSymbol
          this.chooseContract(this.focusSymbol)
        }
      },
      '$store.state.account.positions.length': function () {
        this.$store.commit('updateSelectPosition', null)
      }
    },
    created () {
    },
    mounted () {
      this.$store.dispatch('getAccountList')
      this.$store.dispatch('getContracts')
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
          direction (val) {
            return val === '多' ? 'trade-red-front' : val === '空' ? 'trade-green-front' : ''
          },
          profit (val) {
            val = parseInt(val)
            return val === 0 ? '' : val > 0 ? 'trade-red-front' : 'trade-green-front'
          }
        },
        volume: 1,
        priceType: {
          value: 'CST_OpponentPrice',
          label: '对手价'
        },
        priceTypeOptions: [{
          value: 'CST_OpponentPrice',
          label: '对手价'
        }, {
          value: 'OPT_AnyPrice',
          label: '市价'
        }, {
          value: 'CST_QueuePrice',
          label: '排队价'
        }],
        focusSymbol: ''
      }
    },
    methods: {
      async onAccountChange (val) {
        let gatewayName = val[0]
        console.log(gatewayName)
        let accountList = this.$store.state.account.accountList
        this.$store.commit('setCurrentGateway', accountList.filter(item => item.name === gatewayName))
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
      onWithdraw () {
        return tradeService.cancelOrder(this.selectedOrder)
      },
      validateOpen () {
        let gateway = this.$store.state.account.currentGateway[0]
        if (!gateway) {
          throw new Error('未选择交易账户')
        }
        if (this.volume < 1) {
          throw new Error('非法交易手数')
        }
        if (!this.focusSymbol) {
          throw new Error('未选择合约')
        }
      },
      validateClose () {
        let position = this.$store.state.marketData.selectedPosition
        if (!position) {
          throw new Error('未选择持仓')
        }
      },
      buy () {
        this.validateOpen()
        let gateway = this.$store.state.account.currentGateway[0]
        return tradeService.buyOpen(gateway.gatewayId, this.focusSymbol, this.biddingPrice, this.volume, this.priceTypeVal)
      },
      sell () {
        this.validateOpen()
        let gateway = this.$store.state.account.currentGateway[0]
        return tradeService.sellOpen(gateway.gatewayId, this.focusSymbol, this.askingPrice, this.volume, this.priceTypeVal)
      },
      close () {
        this.validateClose()
        let position = this.$store.state.marketData.selectedPosition
        let dir = position.direction === '多' ? 'D_Sell' : position.direction === '空' ? 'D_Buy' : ''
        if (!dir) {
          throw new Error('未知方向：', position.direction)
        }
        return tradeService.closePosition(position, dir, this.closingPrice, this.volume, this.priceTypeVal)
      },
      chooseContract (contract) {
        this.$store.commit('setFocus', contract)
      }
    }
  }
</script>

<style scoped>
.account-part{
  height: calc(100% - 200px);
  overflow: auto;
}
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


.trade-part{
  position: absolute;
  bottom: 0px;
  width: 100%;
}
.market-board {
  height: 6em;
  margin-top: 1em;
}
.trade-board{
  height: 50%;

}
.weui-cell{
  padding: 6px 5px;
}
.weui-icon-clear{
  font-size: inherit;
}
.input-wrapper{
  border: 1px solid grey;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;;
}

.col1{
  width: 30%;
}
.col2{
  width: 30%;
}
.col3{
  width: 30%;
}
</style>
