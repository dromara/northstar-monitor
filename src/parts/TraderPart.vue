<template>
  <div>
    <flexbox>
      <flexbox-item :span="4/10">
        <el-select name="合约" v-model="focusSymbol" filterable placeholder="选择合约" style="margin-left: 1em;" @change="chooseContract">
          <el-option
            v-for="item, i in $store.getters.contracts"
            :key="i"
            :label="item.name"
            :value="item.unifiedSymbol">
          </el-option>
        </el-select>
      </flexbox-item>
      <flexbox-item :span="3/11">
        <el-select name="价格类型" v-model="priceType" placeholder="请选择">
          <el-option
            v-for="item,i in priceTypeOptions"
            :key="i"
            :label="item.label"
            :value="item">
          </el-option>
        </el-select>
      </flexbox-item>
      <flexbox-item :span="3/13">
        <el-select name="手数" v-model="volume" filterable placeholder="选择手数" >
          <el-option
            v-for="val, i in tradeVol"
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

</template>

<script>
  import TraderButton from '../components/TraderButton'
  import tradeService from '../api/service/tradeService'

  export default {
    name: 'trader-part',
    components: {
      TraderButton
    },
    watch: {
      '$store.state.marketData.selectedPosition': function (val, oldVal) {
        if (val) {
          this.volume = val.availablePosition
          this.focusSymbol = val.unifiedSymbol
          this.chooseContract(this.focusSymbol)
        }
      },
      '$store.state.account.positions.length': function () {
        this.$store.commit('updateSelectPosition', null)
      }
    },
    computed: {
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
    data () {
      return {
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
      validateOpen () {
        let accountId = this.$store.state.account.currentAccount[0]
        if (!accountId) {
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
        let accountId = this.$store.state.account.currentAccount[0]
        return tradeService.buyOpen(accountId, this.focusSymbol, this.biddingPrice, this.volume, this.priceTypeVal)
      },
      sell () {
        this.validateOpen()
        let accountId = this.$store.state.account.currentAccount[0]
        return tradeService.sellOpen(accountId, this.focusSymbol, this.askingPrice, this.volume, this.priceTypeVal)
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
