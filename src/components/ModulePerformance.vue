<template>
  <el-dialog title="模组透视" :visible.sync="dialogVisible" class="module-perf-dialog" fullscreen>
    <div class="wrapper" :style="{ height: `${flexibleHeight}px` }">
      <div role="side" class="side-panel">
        <el-form>
          <el-form-item label="模组名称">
            {{ moduleName }}
          </el-form-item>
          <el-form-item label="总盈亏">
            {{ totalProfit }}
          </el-form-item>
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
      totalProfit: 100000,
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
      return document.body.clientHeight - 160
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
      this.totalProfit = result.totalProfit
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
.wrapper {
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
</style>
<style>
.el-tabs__header {
  margin: 0;
}
</style>
