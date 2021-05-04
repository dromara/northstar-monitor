<template>
  <div class="ns-trade">
    <div class="ns-trade__account-profile">
      <el-dropdown
        :style="{ 'margin-left': '10px' }"
        class="ns-trade--account-option"
      >
        <el-button>
          账户<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="ns-trade__account-description">
        权益：{{ account.balance }}
      </div>
      <div class="ns-trade__account-description">
        可用：{{ account.available }}
      </div>
      <div class="ns-trade__account-description">
        使用率：{{
          account.balance
            ? parseInt(
                (100 * (account.balance - account.available)) / account.balance
              )
            : 0.0
        }}
        %
      </div>
    </div>
    <div class="ns-trade__trade-section">
      <div class="ns-trade-action">
        <div class="ns-trade-action__item">
          <el-select v-model="dealSymbol" filterable placeholder="请选择合约">
            <el-option
              v-for="(item, i) in symbolList"
              :key="i"
              :label="item.label"
              :value="item.symbol"
            >
            </el-option>
          </el-select>
        </div>
        <div class="ns-trade-action__item">
          <div class="ns-trade-action__complex-item">
            <div class="ns-trade-action__complex-item-label">手数：</div>
            <el-input-number
              v-model="dealVol"
              :min="1"
              :max="10"
              controls-position="right"
            ></el-input-number>
          </div>
        </div>
        <div class="ns-trade-action__item">
          <el-select v-model="dealPriceType" filterable placeholder="价格类型">
            <el-option
              v-for="item in priceOptionList"
              :key="item.type"
              :label="item.label"
              :value="item.type"
            >
            </el-option>
          </el-select>
        </div>
        <div class="ns-trade-action__item">
          <el-input
            v-model="dealPrice"
            placeholder="委托价"
            :disabled="dealPriceType !== 'CUSTOM_PRICE'"
          ></el-input>
        </div>
      </div>
      <div class="ns-trade-info">
        <NsPriceBoard />
      </div>
    </div>
    <div class="ns-trade__trade-btn-wrap">
      <div class="ns-trade-button">
        <NsButton :price="'12345'" :color="'rgba(196, 68, 66, 1)'" />
      </div>
      <div class="ns-trade-button">
        <NsButton :price="'12345'" :color="'rgba(64, 158, 95, 1)'" />
      </div>
      <div class="ns-trade-button">
        <NsButton :price="'优先平今'" :reverseColor="true" />
      </div>
    </div>
    <NsAccountDetail :tableContentHeight="flexibleTblHeight" />
  </div>
</template>

<script>
import NsButton from '@/components/TradeButton'
import NsPriceBoard from '@/components/PriceBoard'
import NsAccountDetail from '@/components/AccountDetail'
export default {
  name: 'Trade',
  components: {
    NsButton,
    NsPriceBoard,
    NsAccountDetail
  },
  data() {
    return {
      symbolList: [
        {
          symbol: 'rb2102',
          label: '螺纹2102'
        },
        {
          symbol: 'rb2103',
          label: '螺纹2103'
        },
        {
          symbol: 'rb2104',
          label: '螺纹2104'
        }
      ],
      priceOptionList: [
        {
          label: '对手价',
          type: 'COUNTERPARTY_PRICE'
        },
        {
          label: '排队价',
          type: 'WAITING_PRICE'
        },
        {
          label: '市价',
          type: 'FIGHTING_PRICE'
        },
        {
          label: '限价',
          type: 'CUSTOM_PRICE'
        }
      ],
      dealSymbol: '',
      dealVol: '',
      dealPrice: '',
      dealPriceType: '',
      curTab: 'position',
      account: {
        balance: 0,
        available: 0,
        positionDescription: [
          {
            symbol: 'rb2103',
            volume: '5',

            availableVol: '3',
            openPrice: '1234',
            positionProfit: '1234'
          }
        ]
      }
    }
  },
  methods: {
    onPositionChosen() {}
  },
  created() {},
  mounted() {},
  computed: {
    flexibleTblHeight() {
      return document.body.clientHeight - 460
    }
  }
}
</script>

<style>
.ns-trade {
  width: 100%;
  max-width: 500px;
  margin: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(67, 74, 80, 1);
}
.ns-trade__account {
  width: 100%;
  padding: 10px 0;
}
.ns-trade__account-profile {
  display: flex;
  width: 100%;
  grid-template-columns: 1fr repeat(3, 1fr);
  padding: 10px 0;
  line-height: 32px;
  background-color: rgba(20, 20, 20, 0.4);
}
.ns-trade__account-description {
  width: 100%;
  text-align: center;
  font-size: 10px;
}
.ns-trade__trade-btn-wrap {
  display: flex;
}
.ns-trade__trade-section {
  height: 100%;
  max-height: 300px;
  display: flex;
}
.ns-trade-action__item {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.ns-trade-action__item-label {
  width: 100%;
}
.ns-trade-action__item-content {
  width: 100%;
}
.ns-trade-action {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
}
.ns-trade-info {
  width: 80%;
  padding: 10px 20px;
  min-height: 200px;
}
.ns-account-table {
  text-align: center;
}
.el-tabs__item {
  padding: 0;
}
.el-table th > .cell {
  padding: 0;
}
.el-input-number--small {
  width: 100%;
}
.el-input-number {
  width: 100%;
}
.ns-trade-action__complex-item {
  display: flex;
}
.ns-trade-action__complex-item-label {
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.ns-trade-button {
  width: 100%;
  height: 100%;
  padding: 0 20px;
}
</style>
