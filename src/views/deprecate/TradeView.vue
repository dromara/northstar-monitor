<template>
  <div class="common font-setting">
    <div class="row-top">
      <flexbox>
        <flexbox-item><div class="grid-content ">权益: {{ balance }}</div></flexbox-item>
        <flexbox-item><div class="grid-content ">可用: {{ available }}</div></flexbox-item>
        <flexbox-item><div class="grid-content">使用率: {{ usageRate }}%</div></flexbox-item>
      </flexbox>
    </div>
    <component-list></component-list>
    <component-control></component-control>
    <div class="market-bar">
      <div></div>
      <div>
        <trader-button content="多开" type="trade-red-back">{{ $store.state.marketData.askPrice }}</trader-button>
        <trader-button content="平仓" type="trade-normal-back">{{ $store.state.marketData.lastPrice }}</trader-button>
        <trader-button content="空开" type="trade-green-back">{{ $store.state.marketData.bidPrice }}</trader-button>
      </div>
    </div>

  </div>
</template>

<script>
  import TableView from '../../components/Table'
  import ControlView from '../ControlView'
  import '../../assets/index.css'
  import TraderButton from '../components/TraderButton'
  import { Tab, TabItem } from 'vux'
  // import TradeButton from '../components/TradeButton'

  export default {
    name: 'trade-view',
    components: {
      TraderButton,
      Tab,
      TabItem,
      // FIXME 想想为什么人家可以写成上面这种形式，可以这么简洁
      'component-list': TableView,
      'component-control': ControlView
    },
    data () {
      return {
        balance: 512261,
        available: 45211,
        volume: 1,
        currentTick: {
          lastPrice: 100510,
          vol: 1311992,
          bidPrice1: 100510,
          bidVol1: 131,
          askPrice1: 100500,
          askVol1: 150
        },
        contracts: [{
          value: 'rb2010',
          label: '螺纹钢2010'
        }, {
          value: 'rb2009',
          label: '螺纹钢2009'
        }, {
          value: 'ni2008',
          label: '沪镍2008'
        }],
        filteredContracts: [],
        priceTypes: [{
          value: 'OPT_LimitPrice',
          label: '限价'
        }, {
          value: 'OPT_AnyPrice',
          label: '市价'
        }, {
          value: 'OPT_BestPrice',
          label: '最优价'
        }],
        tradeContract: '',
        tradeVolume: 1,
        priceType: {
          value: 'OPT_LimitPrice',
          label: '限价'
        }
      }
    },
    computed: {
      usageRate () {
        return (this.available / this.balance * 100).toFixed(1)
      }
    },
    mounted () {
    },
    methods: {
      updateSelection () {
        console.log('s')
        if (!this.filteredContracts.length) {
          this.filteredContracts = this.contracts
        }
      },
      findContract (val) {
        if (!val) {
          this.filteredContracts = this.contracts
        }
        let reg = new RegExp(val)
        this.filteredContracts = this.contracts.filter(item => reg.test(item.value) || reg.test(item.label) ? item : null)
      }
    }
  }
</script>

<style scoped>
  .row-top, .price-board {
    background-color: rgba(38, 38, 38, 0.4);
  }

  .grid-content{
    text-indent: 0.7em;
  }

  .market-bar{
    width: 100%;
    position: fixed;
    bottom: 2em;
  }

</style>
