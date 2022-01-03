<template>
  <div
    class="ns-mktdata"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
  >
    <div id="update-k-line" class="ns-mktdata__body">
      {{ !kLineChart ? '未有数据，请先选择合约' : '' }}
    </div>
  </div>
</template>

<script>
import { dispose, init } from 'klinecharts'
import volumePure from '@/lib/indicator/volume-pure'
import openInterestDelta from '@/lib/indicator/open-interest'

import dataSyncApi from '@/api/dataSyncApi'
import { mapGetters } from 'vuex'

import { BarField } from '@/lib/xyz/redtorch/pb/core_field_pb'

const textColorDark = '#929AA5'
const gridColorDark = '#292929'
const axisLineColorDark = '#333333'
const crossTextBackgroundColorDark = '#373a40'

const textColorLight = '#76808F'
const gridColorLight = '#ededed'
const axisLineColorLight = '#DDDDDD'
const crossTextBackgroundColorLight = '#686d76'

function getThemeOptions(theme) {
  const textColor = theme === 'dark' ? textColorDark : textColorLight
  const gridColor = theme === 'dark' ? gridColorDark : gridColorLight
  const axisLineColor = theme === 'dark' ? axisLineColorDark : axisLineColorLight
  const crossLineColor = theme === 'dark' ? axisLineColorDark : axisLineColorLight
  const crossTextBackgroundColor =
    theme === 'dark' ? crossTextBackgroundColorDark : crossTextBackgroundColorLight
  return {
    grid: {
      horizontal: {
        color: gridColor
      },
      vertical: {
        color: gridColor
      }
    },
    candle: {
      priceMark: {
        high: {
          color: textColor
        },
        low: {
          color: textColor
        }
      },
      tooltip: {
        text: {
          color: textColor
        }
      }
    },
    technicalIndicator: {
      tooltip: {
        text: {
          color: textColor
        }
      }
    },
    xAxis: {
      axisLine: {
        color: axisLineColor
      },
      tickLine: {
        color: axisLineColor
      },
      tickText: {
        color: textColor
      }
    },
    yAxis: {
      axisLine: {
        color: axisLineColor
      },
      tickLine: {
        color: axisLineColor
      },
      tickText: {
        color: textColor
      }
    },
    separator: {
      color: axisLineColor
    },
    crosshair: {
      horizontal: {
        line: {
          color: crossLineColor
        },
        text: {
          backgroundColor: crossTextBackgroundColor
        }
      },
      vertical: {
        line: {
          color: crossLineColor
        },
        text: {
          backgroundColor: crossTextBackgroundColor
        }
      }
    }
  }
}

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
  name: 'UpdateKLineChart',
  data() {
    return {
      kLineChart: null,
      fullscreenLoading: false
    }
  },
  mounted: function () {},
  computed: {
    ...mapGetters(['curMarketGatewayId', 'curUnifiedSymbol'])
  },
  watch: {
    '$store.state.marketCurrentDataModule.curBar': function (bar) {
      this.kLineChart.updateData(createFromBar(bar))
    },
    '$store.state.marketCurrentDataModule.curUnifiedSymbol': async function (val) {
      console.log(this)
      if (!this.kLineChart) {
        const kLineChart = init('update-k-line')
        kLineChart.addTechnicalIndicatorTemplate(volumePure)
        kLineChart.addTechnicalIndicatorTemplate(openInterestDelta)
        kLineChart.createTechnicalIndicator('CJL', false)
        kLineChart.createTechnicalIndicator('OpDif', false)
        this.kLineChart = kLineChart
        kLineChart.setStyleOptions(getThemeOptions('dark'))

        kLineChart.loadMore(async (timestamp) => {
          if(!(timestamp instanceof Number)){
            return
          }
          await new Promise((r) => setTimeout(r, 1000))
          const data = await this.loadBars(timestamp)
          kLineChart.applyMoreData(data || [], !!data)
        })
      }
      if (val) {
        this.kLineChart.clearData()
        this.kLineChart.applyNewData((await this.loadBars(new Date().getTime())) || [])
      }
    }
  },
  methods: {
    async loadBars(timestamp) {
      this.fullscreenLoading = true
      try {
        const barDataList = await dataSyncApi.loadHistoryBars(
          this.curMarketGatewayId,
          this.curUnifiedSymbol,
          timestamp
        )

        return barDataList
          .map((data) => BarField.deserializeBinary(data).toObject())
          .map((bar) => createFromBar(bar))
      } catch (e) {
        this.$message.error(e.message)
      } finally {
        this.fullscreenLoading = false
      }
    }
  },
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
