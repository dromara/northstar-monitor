<template>
  <el-dialog title="模组透视" :visible.sync="dialogVisible" class="module-perf-dialog" fullscreen>
    <div class="wrapper" :style="{ height: `${flexibleHeight}px` }">
      <div role="side" class="side-panel">
        <el-form>
          <el-form-item label="模组名称">
            {{ 'TTTTTTTT' }}
          </el-form-item>
          <el-form-item label="总盈亏">
            {{ 100000 }}
          </el-form-item>
        </el-form>
        <el-table :data="records" :height="flexibleTblHeight">
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
        <div id="module-k-line" class="kline-body"></div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { dispose, init } from 'klinecharts'
import volumePure from '@/lib/indicator/volume-pure'
import openInterestDelta from '@/lib/indicator/open-interest'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      records: [
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        },
        {
          unifiedSymbol: 'rb2010',
          direction: 'PD_Long',
          volume: 2,
          openPrice: 1999,
          closePrice: 3000,
          closeProfit: 333
        }
      ],
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
    }
  },
  methods: {
    load() {},
    init() {
      const kLineChart = init('module-k-line')
      kLineChart.addCustomTechnicalIndicator(volumePure)
      kLineChart.addCustomTechnicalIndicator(openInterestDelta)
      kLineChart.createTechnicalIndicator('CJL', false)
      kLineChart.createTechnicalIndicator('OpDif', false)
      this.chart = kLineChart
      this.chart.applyNewData([
        {
          close: 4976.16,
          high: 4977.99,
          low: 4970.12,
          open: 4972.89,
          timestamp: 1587660000000,
          volume: 204
        },
        {
          close: 4977.33,
          high: 4979.94,
          low: 4971.34,
          open: 4973.2,
          timestamp: 1587660060000,
          volume: 194
        },
        {
          close: 4977.93,
          high: 4977.93,
          low: 4974.2,
          open: 4976.53,
          timestamp: 1587660120000,
          volume: 197
        },
        {
          close: 4966.77,
          high: 4968.53,
          low: 4962.2,
          open: 4963.88,
          timestamp: 1587660180000,
          volume: 28
        },
        {
          close: 4961.56,
          high: 4972.61,
          low: 4961.28,
          open: 4961.28,
          timestamp: 1587660240000,
          volume: 184
        },
        {
          close: 4964.19,
          high: 4964.74,
          low: 4961.42,
          open: 4961.64,
          timestamp: 1587660300000,
          volume: 191
        },
        {
          close: 4968.93,
          high: 4972.7,
          low: 4964.55,
          open: 4966.96,
          timestamp: 1587660360000,
          volume: 105
        },
        {
          close: 4979.31,
          high: 4979.61,
          low: 4973.99,
          open: 4977.06,
          timestamp: 1587660420000,
          volume: 35
        },
        {
          close: 4977.02,
          high: 4981.66,
          low: 4975.14,
          open: 4981.66,
          timestamp: 1587660480000,
          volume: 135
        },
        {
          close: 4985.09,
          high: 4988.62,
          low: 4980.3,
          open: 4986.72,
          timestamp: 1587660540000,
          volume: 76
        }
      ])
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
  height: calc(100% - 21px);
}
.kline-header {
  margin-left: 8px;
}
</style>
