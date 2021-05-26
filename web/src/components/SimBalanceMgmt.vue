<template>
  <el-dialog
    width="300px"
    title="模拟网关出入金"
    :visible="visible"
    append-to-body
    @close="onClose"
  >
    <el-row>
      <el-col :span="24">
        <span class="row-lh">账户ID：{{ simGatewayId }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span class="row-lh"
          >账户余额：&nbsp;&nbsp;{{ accountBalance || 0 }}</span
        >
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <span class="row-lh">出入金额：</span>
      </el-col>
      <el-col :span="17">
        <el-input v-model="money" clearable type="number" />
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="moneyIO">出入金</el-button>
    </div>
  </el-dialog>
</template>

<script>
import gatewayMgmtApi from '@/api/gatewayMgmtApi'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    simGatewayId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      money: ''
    }
  },
  watch: {
    visible: function () {
      console.log(this.$store.getters.getAccountById(this.simGatewayId))
    }
  },
  computed: {
    accountBalance() {
      if (!this.$store.state.accountModule[this.simGatewayId]) return 0
      return this.$store.state.accountModule[this.simGatewayId].account.balance
    }
  },
  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    moneyIO() {
      console.log(this.simGatewayId)
      gatewayMgmtApi.moneyIO(this.simGatewayId, this.money)
    }
  }
}
</script>

<style>
.row-lh {
  line-height: 32px;
}
</style>
