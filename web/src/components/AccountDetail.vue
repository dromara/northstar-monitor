<template>
  <div ref="accountDetailWrapper" class="ns-account-detail">
    <el-tabs v-model="curTab" :stretch="true">
      <el-tab-pane label="持仓" name="position" :style="{ overflow: 'auto' }"
        ><el-table :data="positionDescription" :height="tableContentHeight">
          <el-table-column prop="symbol" label="合约名称" align="center">
          </el-table-column>
          <el-table-column
            prop="direction"
            label="方向"
            width="50px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="volume"
            label="总仓"
            width="50px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="availableVol"
            label="可用"
            width="50px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="openPrice" label="开仓均价" align="center">
          </el-table-column>
          <el-table-column
            prop="positionProfit"
            label="持仓盈亏"
            align="center"
          >
          </el-table-column> </el-table
      ></el-tab-pane>
      <el-tab-pane label="挂单" name="activeOrder"
        ><el-table
          :data="orderDescription"
          style="width: 100%"
          :height="tableContentHeight"
        >
          <el-table-column prop="symbol" label="合约名称" align="center">
          </el-table-column>
          <el-table-column
            prop="dirOpenClose"
            label="开平"
            width="50px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="price" label="委托价" align="center">
          </el-table-column>
          <el-table-column
            prop="orderVolTotal"
            label="委托量"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="orderVolPending" label="挂单量" align="center">
          </el-table-column> </el-table
      ></el-tab-pane>
      <el-tab-pane label="委托" name="order"
        ><el-table
          :data="orderDescription"
          style="width: 100%"
          :height="tableContentHeight"
        >
          <el-table-column prop="symbol" label="合约名称" align="center">
          </el-table-column>
          <el-table-column
            prop="orderStatus"
            label="状态"
            width="50px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="dirOpenClose"
            label="开平"
            width="40px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="price" label="委托价" align="center">
          </el-table-column>
          <el-table-column
            prop="orderVolTotal"
            label="委托量"
            width="50px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="tradeVol"
            label="已成交"
            width="50px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="cancelVol"
            label="已撤单"
            width="50px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="orderTime" label="委托时间" align="center">
          </el-table-column> </el-table
      ></el-tab-pane>
      <el-tab-pane label="成交" name="transaction"
        ><el-table
          :data="transactionDescription"
          style="width: 100%"
          align="center"
          :height="tableContentHeight"
        >
          <el-table-column prop="symbol" label="合约名称" align="center">
          </el-table-column>
          <el-table-column
            prop="orderStatus"
            label="状态"
            align="center"
            width="50px"
          >
          </el-table-column>
          <el-table-column
            prop="dirOpenClose"
            label="开平"
            align="center"
            width="50px"
          >
          </el-table-column>
          <el-table-column prop="tradePrice" label="成交价" align="center">
          </el-table-column>
          <el-table-column
            prop="tradeVol"
            label="成交量"
            align="center"
            width="50px"
          >
          </el-table-column>
          <el-table-column prop="tradeTime" label="成交时间" align="center">
          </el-table-column> </el-table
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    tableContentHeight: {
      type: Number,
      default: 100
    },
    positionDescription: {
      type: Array,
      default: () => []
    },
    orderDescription: {
      type: Array,
      default: () => []
    },
    transactionDescription: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      curTab: 'position'
    }
  }
}
</script>

<style>
.ns-account-detail {
  height: 100%;
  min-height: 300px;
  margin: 0 20px;
  overflow: hidden;
}
</style>
