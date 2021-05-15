<template>
  <div class="ns-mktdata">
    <!-- <div class="ns-mktdata__head">
      <el-button>1m</el-button>
      <el-button>1D</el-button>
      <el-button></el-button>
    </div> -->
    <div id="update-k-line" class="ns-mktdata__body" />
  </div>
</template>

<script>
import { dispose, init } from 'klinecharts'
import volumePure from '@/lib/indicator/volume-pure'
import openInterest from '@/lib/indicator/open-interest'
import generatedKLineDataList from '../generatedKLineDataList'

export default {
  name: 'UpdateKLineChart',
  mounted: function () {
    const kLineChart = init('update-k-line')
    kLineChart.addCustomTechnicalIndicator(volumePure)
    kLineChart.addCustomTechnicalIndicator(openInterest)
    // const updateData = () => {
    //   setTimeout(() => {
    //     const dataList = kLineChart.getDataList()
    //     const lastData = dataList[dataList.length - 1]
    //     const newData = generatedKLineDataList(
    //       lastData.timestamp,
    //       lastData.close,
    //       1
    //     )[0]
    //     newData.timestamp += 60 * 1000
    //     console.log(newData)
    //     kLineChart.updateData(newData)
    //     updateData(kLineChart)
    //   }, 1000)
    // }
    kLineChart.applyNewData(generatedKLineDataList())
    kLineChart.createTechnicalIndicator('CJL', true, { id: 'default' })
    kLineChart.createTechnicalIndicator('OPID', true, { id: 'default' })
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
}
</style>
