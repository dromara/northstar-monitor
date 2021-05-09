<template>
  <div class="ns-trade">
    <div class="ns-trade__account-profile">
      <el-select
        class="ns-trade__account"
        v-model="curAccountIndex"
        placeholder="选择账户"
        @change="handleAccountChange"
      >
        <el-option
          v-for="(item, index) in accountOptions"
          :key="index"
          :label="item.gatewayId"
          :value="index"
        >
        </el-option>
      </el-select>
      <div class="ns-trade__account-description">
        权益：{{ accountBalance | intFormat }}
      </div>
      <div class="ns-trade__account-description">
        可用：{{ accountAvailable | intFormat }}
      </div>
      <div class="ns-trade__account-description">
        使用率：{{
          accountBalance
            ? (accountBalance - accountAvailable) / accountBalance
            : 0
        }}
        %
      </div>
    </div>
    <div class="ns-trade__trade-section">
      <div class="ns-trade-action">
        <div class="ns-trade-action__item">
          <el-select
            v-model="dealSymbol"
            filterable
            placeholder="请选择合约"
            @change="handleContractChange"
          >
            <el-option
              v-for="(item, i) in symbolList"
              :key="i"
              :label="item.name"
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
          <el-select
            v-model="dealPriceType"
            filterable
            placeholder="价格类型"
            @change="handleDealPriceTypeChange"
          >
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
            v-model="limitPrice"
            placeholder="委托价"
            :disabled="dealPriceType !== 'CUSTOM_PRICE'"
            type="number"
          ></el-input>
        </div>
      </div>
      <div class="ns-trade-info">
        <NsPriceBoard />
      </div>
    </div>
    <div class="ns-trade__trade-btn-wrap">
      <div class="ns-trade-button">
        <NsButton
          :price="limitPrice || '12345'"
          :color="'rgba(196, 68, 66, 1)'"
          :label="'买开'"
        />
      </div>
      <div class="ns-trade-button">
        <NsButton
          :price="limitPrice || '12345'"
          :color="'rgba(64, 158, 95, 1)'"
          :label="'卖开'"
        />
      </div>
      <div class="ns-trade-button">
        <NsButton :price="'优先平今'" :reverseColor="true" :label="'平仓'" />
      </div>
    </div>
    <NsAccountDetail :tableContentHeight="flexibleTblHeight" />
  </div>
</template>

<script>
import NsButton from '@/components/TradeButton'
import NsPriceBoard from '@/components/PriceBoard'
import NsAccountDetail from '@/components/AccountDetail'
import gatewayMgmtApi from '../api/gatewayMgmtServiceApi'

let accountCheckTimer

export default {
  name: 'Trade',
  components: {
    NsButton,
    NsPriceBoard,
    NsAccountDetail
  },
  data() {
    return {
      accountOptions: [],
      symbolList: [],
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
      limitPrice: '',
      dealPriceType: '',
      curTab: 'position',
      curAccountIndex: '',
      currentAccount: {},
      currentAccountId: ''
    }
  },
  methods: {
    onPositionChosen() {},
    handleAccountChange() {
      this.currentAccount = this.accountOptions[this.curAccountIndex]
      let gatewayId = this.currentAccount.gatewayId

      const timelyCheck = () => {
        accountCheckTimer = setTimeout(() => {
          if (!this.$store.getters.isAccountConnected(gatewayId)) {
            this.$message.error(`账户${gatewayId}没有连线`)
          }
          timelyCheck()
        }, 3000)
      }
      timelyCheck()

      this.symbolList = this.$store.getters.findContractsByType(
        this.currentAccount.relativeGatewayId,
        'FUTURES'
      )
    },
    handleContractChange() {
      console.log(this.dealSymbol)
    },
    handleDealPriceTypeChange() {
      if (this.dealPriceType !== 'CUSTOM_PRICE') {
        this.limitPrice = ''
      }
    }
  },
  filters: {
    intFormat(val) {
      return val.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
    }
  },
  beforeDestroy() {
    clearTimeout(accountCheckTimer)
  },
  async created() {
    this.accountOptions = await gatewayMgmtApi.findAll('TRADE')
  },
  computed: {
    flexibleTblHeight() {
      return document.body.clientHeight - 460
    },
    accountInfo() {
      return this.$store.getters.getAccountInfoByGatewayId(
        this.currentAccountId
      )
    },
    accountBalance() {
      if (!this.accountInfo) {
        return 0
      }
      return this.accountInfo.account.balance
    },
    accountAvailable() {
      if (!this.accountInfo) {
        return 0
      }
      return this.accountInfo.account.available
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
  margin-left: 20px;
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
