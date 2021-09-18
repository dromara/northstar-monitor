<template>
  <el-dialog title="模组透视" :visible.sync="dialogVisible" fullscreen>
    <div class="module-perf-wrapper">
      <div class="side-panel">
        <div class="basic-info">
          <el-form inline>
            <el-row>
              <el-col span="12">
                <ReadonlyFieldValue label="模组名称" label-width="60px" :value="moduleName" />
              </el-col>
              <el-col span="12">
                <ReadonlyFieldValue label="账户ID" label-width="60px" :value="accountId" />
              </el-col>
            </el-row>
            <el-row>
              <el-col span="8">
                <ReadonlyFieldValue label="账户总额" label-width="60px" :value="accountBalance" />
              </el-col>
              <el-col span="8">
                <ReadonlyFieldValue label="可用金额" label-width="60px" :value="moduleAvailable" />
              </el-col>
              <el-col span="8">
                <ReadonlyFieldValue label="模组状态" label-width="60px" :value="positionState" />
              </el-col>
            </el-row>
            <el-row>
              <el-col span="8">
                <ReadonlyFieldValue label="平仓盈亏" label-width="60px" :value="totalCloseProfit" />
              </el-col>
              <el-col span="8">
                <ReadonlyFieldValue
                  label="持仓盈亏"
                  label-width="60px"
                  :value="totalPositionProfit"
                />
              </el-col>
              <el-col span="8">
                <ReadonlyFieldValue
                  label="总盈亏"
                  label-width="50px"
                  :value="totalCloseProfit + totalPositionProfit"
                />
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div>
          <el-tabs v-model="moduleTab" :stretch="true">
            <el-tab-pane name="holding" label="模组持仓"></el-tab-pane>
            <el-tab-pane name="dealRecord" label="交易历史"></el-tab-pane>
            <el-tab-pane name="tradeRecord" label="原始成交"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="full-height">
          <el-table v-show="moduleTab === 'holding'" :data="holdingPositions" height="100%">
            <el-table-column label="合约" align="center" width="60px"></el-table-column>
            <el-table-column label="方向" align="center" width="40px"></el-table-column>
            <el-table-column label="手数" align="center" width="30px"></el-table-column>
            <el-table-column label="成本价" align="center"></el-table-column>
            <el-table-column label="盈亏" align="center"></el-table-column>
            <el-table-column label="操作" align="center"></el-table-column>
          </el-table>
          <el-table v-show="moduleTab === 'tradeRecord'" :data="tradeRecords" height="100%">
            <el-table-column
              prop="contractName"
              label="合约"
              align="center"
              width="60px"
            ></el-table-column>
            <el-table-column prop="operation" label="操作" align="center" width="50px">
            </el-table-column>
            <el-table-column
              prop="volume"
              label="手数"
              align="center"
              width="30px"
            ></el-table-column>
            <el-table-column prop="price" label="成交价" align="center"></el-table-column>
            <el-table-column prop="tradingDay" label="交易日" align="center"></el-table-column>
          </el-table>
          <el-table v-show="moduleTab === 'dealRecord'" :data="dealRecords" height="100%">
            <el-table-column
              prop="contractName"
              label="合约"
              align="center"
              width="60px"
            ></el-table-column>
            <el-table-column prop="direction" label="方向" align="center" width="40px">
              <template slot-scope="scope">{{
                { PD_Long: '多', PD_Short: '空' }[scope.row.direction] || '未知'
              }}</template>
            </el-table-column>
            <el-table-column
              prop="volume"
              label="手数"
              align="center"
              width="30px"
            ></el-table-column>
            <el-table-column
              prop="openPrice"
              label="开仓价"
              align="center"
              width="60px"
            ></el-table-column>
            <el-table-column
              prop="closePrice"
              label="平仓价"
              align="center"
              width="60px"
            ></el-table-column>
            <el-table-column
              prop="closeProfit"
              label="平仓盈亏"
              align="center"
              width="60px"
            ></el-table-column>
            <el-table-column prop="tradingDay" label="交易日" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="kline-wrapper">
        <div class="kline-header">模组当前引用的K线数据</div>

        <el-tabs v-model="activeTab" stretch @tab-click="updateChart">
          <el-tab-pane :label="symbol" :name="symbol" v-for="(symbol, i) in symbolOptions" :key="i">
          </el-tab-pane>
        </el-tabs>
        <div id="module-k-line" class="kline-body"></div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { dispose, init } from 'klinecharts'
import volumePure from '@/lib/indicator/volume-pure'
import openInterestDelta from '@/lib/indicator/open-interest'
import moduleApi from '@/api/moduleApi'
import ReadonlyFieldValue from '@/components/ReadonlyFieldValue'
import { mapGetters } from 'vuex'

import { BarField } from '@/lib/xyz/redtorch/pb/core_field_pb'

const createFromBar = (bar) => {
  return {
    open: bar.openprice,
    low: bar.lowprice,
    high: bar.highprice,
    close: bar.closeprice,
    volume: bar.volumedelta,
    openInterestDelta: bar.openinterestdelta,
    timestamp: bar.actiontimestamp
  }
}

export default {
  components: {
    ReadonlyFieldValue
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    moduleName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      moduleTab: 'holding',
      activeTab: '',
      dialogVisible: false,
      dealRecords: [],
      tradeRecords: [],
      totalCloseProfit: 0,
      totalPositionProfit: 0,
      moduleState: '',
      accountId: '',
      moduleAvailable: 0,
      barDataMap: {},
      chart: null
    }
  },
  watch: {
    visible: function (val) {
      if (val) {
        this.dialogVisible = val
        this.$nextTick(this.init)
      }
    },
    dialogVisible: function (val) {
      if (!val) {
        this.$emit('update:visible', val)
        this.$nextTick(this.release)
      }
    }
  },
  computed: {
    ...mapGetters(['getAccountById']),
    symbolOptions() {
      return Object.keys(this.barDataMap) || []
    },
    positionState() {
      return (
        { HOLDING_LONG: '持多单', HOLDING_SHORT: '持空单', EMPTY: '无持仓' }[this.moduleState] ||
        '等待成交'
      )
    },
    accountBalance() {
      if (!this.accountId || !this.getAccountById(this.accountId).account) {
        return 0
      }
      return this.getAccountById(this.accountId).account.balance
    }
  },
  methods: {
    async init() {
      this.loadBasicInfo()
      this.loadDealRecord()
      this.loadTradeRecord()
      this.loadRefData()
    },
    loadBasicInfo() {
      moduleApi.getModuleInfo(this.moduleName).then((result) => {
        this.totalPositionProfit = result.totalPositionProfit
        this.moduleState = result.moduleState
        this.accountId = result.accountId
        this.moduleAvailable = result.moduleAvailable
      })
    },
    loadDealRecord() {
      moduleApi.getModuleDealRecords(this.moduleName).then((result) => {
        this.dealRecords = result
        this.totalCloseProfit = result.length
          ? result.map((i) => i.closeProfit).reduce((a, b) => a + b)
          : 0
      })
    },
    loadTradeRecord() {
      moduleApi.getModuleTradeRecords(this.moduleName).then((result) => {
        this.tradeRecords = result
      })
    },
    loadRefData() {
      moduleApi.getModuleDataRef(this.moduleName).then((refBarDataMap) => {
        this.barDataMap = {}
        Object.keys(refBarDataMap).forEach((k) => {
          if (!(refBarDataMap[k] instanceof Array)) {
            return
          }
          this.barDataMap[k] = refBarDataMap[k]
            .map((byteData) => BarField.deserializeBinary(byteData).toObject())
            .map(createFromBar)
        })
        this.activeTab = this.symbolOptions.length ? this.symbolOptions[0] : ''
        const kLineChart = init(`module-k-line`)
        kLineChart.addCustomTechnicalIndicator(volumePure)
        kLineChart.addCustomTechnicalIndicator(openInterestDelta)
        kLineChart.createTechnicalIndicator('CJL', false)
        kLineChart.createTechnicalIndicator('OpDif', false)
        this.chart = kLineChart

        this.updateChart()
      })
    },
    updateChart() {
      this.chart.clearData()
      if (!this.barDataMap[this.activeTab] || !this.barDataMap[this.activeTab].length) {
        this.$message.warning('数据为空')
        return
      }
      this.chart.applyNewData(this.barDataMap[this.activeTab])
    },
    release() {
      dispose('module-k-line')
    }
  }
}
</script>

<style scoped>
.full-height {
  height: 100%;
}
.kline-wrapper {
  height: 100%;
  width: 100%;
  border-top: 1px solid;
  border-left: 1px solid;
}
.module-perf-wrapper {
  height: calc(100vh - 64px);
  display: flex;
}
.side-panel {
  min-width: 420px;
  border-top: 1px solid;
  display: flex;
  flex-direction: column;
}
.kline-body {
  height: calc(100% - 56px);
}
.kline-header {
  margin-left: 8px;
}
.text-wrapper {
  box-sizing: content-box;
  width: 100%;
}
</style>
<style>
.el-tabs__header {
  margin: 0;
}
.el-dialog.is-fullscreen {
  overflow: hidden;
}
</style>
