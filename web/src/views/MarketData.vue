<template>
  <div class="ns-mktdata">
    <div id="update-k-line" class="ns-mktdata__body">
      {{ !kLineChart ? '未有数据，请先选择合约' : '' }}
    </div>
  </div>
</template>

<script>
import { dispose, init } from 'klinecharts'
import volumePure from '@/lib/indicator/volume-pure'
import openInterest from '@/lib/indicator/open-interest'

import dataSyncApi from '@/api/dataSyncApi'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'UpdateKLineChart',
  data() {
    return {
      kLineChart: null
    }
  },
  mounted: function () {},
  computed: {
    ...mapGetters(['curMarketGatewayId', 'curUnifiedSymbol'])
  },
  watch: {
    '$store.state.marketCurrentDataModule.curUnifiedSymbol': function (val) {
      if (!this.kLineChart) {
        const kLineChart = init('update-k-line')
        kLineChart.addCustomTechnicalIndicator(volumePure)
        kLineChart.addCustomTechnicalIndicator(openInterest)
        kLineChart.createTechnicalIndicator('CJL', true, { id: 'default' })
        kLineChart.createTechnicalIndicator('OPID', true, { id: 'default' })
        kLineChart.updateData({})
        this.$store.commit('updateKLineChart', kLineChart)
        this.kLineChart = kLineChart
      }
      if (val) {
        let startDate = moment().subtract(7, 'days').format('YYYYMMDD')
        let endDate = moment().format('YYYYMMDD')
        dataSyncApi.loadHistoryBars(
          this.curMarketGatewayId,
          this.curUnifiedSymbol,
          startDate,
          endDate
        )
      }
    }
  },
  methods: {},
  destroyed: function () {
    dispose('update-k-line')
  }
}
</script>

<style>
.ns-mktdata {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.ns-mktdata__head {
  height: 30px;
  width: 100%;
  display: flex;
}
.ns-mktdata__body {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
</style>
