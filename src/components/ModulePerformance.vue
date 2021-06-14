<template>
  <el-dialog title="模组透视" :visible.sync="dialogVisible" class="module-perf-dialog" fullscreen>
    <div class="module-perf-wrapper" :style="{ height: `${flexibleHeight}px` }">
      <div role="side" class="side-panel">
        <el-form inline>
          <el-row>
            <el-col span="12">
              <el-form-item label="模组名称">
                <div class="text-wrapper">{{ moduleName }}</div>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="账户ID">
                <div class="text-wrapper">{{ accountId }}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="账户总额">
                {{ accountBalance }}
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="模组状态">
                {{ moduleState }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="平仓盈亏">
                {{ totalCloseProfit }}
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="持仓盈亏">
                {{ totalPositionProfit }}
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="总盈亏">
                {{ totalCloseProfit + totalPositionProfit }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="dealRecords" :height="flexibleTblHeight">
          <el-table-column prop="unifiedSymbol" label="合约" align="center"></el-table-column>
          <el-table-column prop="direction" label="方向" align="center" width="40px">
            <template slot-scope="scope">{{
              { PD_Long: '多', PD_Short: '空' }[scope.row.direction] || '未知'
            }}</template>
          </el-table-column>
          <el-table-column prop="volume" label="手数" align="center" width="40px"></el-table-column>
          <el-table-column prop="openPrice" label="开仓价" align="center"></el-table-column>
          <el-table-column prop="closePrice" label="平仓价" align="center"></el-table-column>
          <el-table-column prop="closeProfit" label="平仓盈亏" align="center"></el-table-column>
        </el-table>
      </div>
      <div role="kline" class="kline-wrapper">
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

// import { AccountField } from '@/lib/xyz/redtorch/pb/core_field_pb'

export default {
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
      activeTab: '',
      dialogVisible: false,
      dealRecords: [],
      totalCloseProfit: 100000,
      totalPositionProfit: 0,
      moduleState: '',
      accountId: 'abcdefghigabcdefghig',
      accountBalance: 10000000000,
      barDataMap: {
        rb2101: [],
        AP101: []
      },
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
    flexibleTblHeight() {
      return document.body.clientHeight - 206
    },
    flexibleHeight() {
      return document.body.clientHeight - 70
    },
    symbolOptions() {
      return Object.keys(this.barDataMap)
    }
  },
  methods: {
    async init() {
      const result = await moduleApi.getModulePerf(this.moduleName)
      this.totalCloseProfit = result.totalCloseProfit
      this.totalPositionProfit = result.totalPositionProfit
      this.moduleState = result.moduleState
      // if (result.account) {
      //   const account = AccountField.deserializeBinary(result.account).toObject()
      //   this.accountId = account.gatewayid
      //   this.accountBalance = account.balance
      // }
      this.dealRecords = result.dealRecords
      this.activeTab = this.symbolOptions.length ? this.symbolOptions[0] : ''
      const kLineChart = init(`module-k-line`)
      kLineChart.addCustomTechnicalIndicator(volumePure)
      kLineChart.addCustomTechnicalIndicator(openInterestDelta)
      kLineChart.createTechnicalIndicator('CJL', false)
      kLineChart.createTechnicalIndicator('OpDif', false)
      this.chart = kLineChart
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
.kline-wrapper {
  height: 100%;
  width: 100%;
  border-top: 1px solid;
  border-left: 1px solid;
}
.module-perf-dialog {
  height: 100%;
  overflow: hidden;
}
.module-perf-wrapper {
  display: flex;
}
.side-panel {
  min-width: 420px;
  border-top: 1px solid;
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
</style>
