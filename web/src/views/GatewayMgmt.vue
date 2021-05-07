<template>
  <div class="ns-page">
    <NsGatewayForm
      :visible.sync="dialogFormVisible"
      :gatewayDescription="curGatewayDescription"
      :gatewayUsage="gatewayUsage"
      :isUpdateMode="curTableIndex > -1"
      @onSave="handleSave"
    />
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      height="100%"
    >
      <el-table-column
        :label="`${typeLabel}ID`"
        prop="gatewayId"
        width="200px"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :label="`${typeLabel}描述`"
        prop="description"
        width="120px"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :label="`${typeLabel}类型`"
        prop="gatewayType"
        width="80px"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="连接状态"
        prop="connectionState"
        width="80px"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <span
            :class="
              scope.row.connectionState === 'CONNECTED'
                ? 'positive'
                : scope.row.connectionState === 'DISCONNECTED'
                ? 'negative'
                : ''
            "
            @click="inspect(scope.row)"
            >{{
              {
                CONNECTING: '连接中',
                CONNECTED: '已连接',
                DISCONNECTING: '断开中',
                DISCONNECTED: '已断开'
              }[scope.row.connectionState]
            }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        label="自动连接"
        prop="autoConnect"
        width="80px"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.autoConnect ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="gatewayUsage === 'TRADE'"
        label="关联网关"
        prop="relativeGatewayId"
        width="150px"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        v-if="gatewayUsage === 'TRADE'"
        label="账户用途"
        prop="gatewayUsage"
        width="80px"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          {{
            scope.row.gatewayUsage === 'TRADE'
              ? '真实'
              : scope.row.gatewayUsage === 'SIM_TRADE'
              ? '模拟'
              : ''
          }}
        </template>
      </el-table-column>
      <el-table-column
        label="适配器类型"
        prop="gatewayAdapterType"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column align="center" width="220px">
        <template slot="header">
          <el-button size="mini" type="primary" @click="handleCreate"
            >新建</el-button
          >
        </template>
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.connectionState === 'DISCONNECTED'"
            size="mini"
            type="success"
            @click="connect(scope.row)"
            >连线</el-button
          >
          <el-button
            v-if="scope.row.connectionState === 'CONNECTED'"
            size="mini"
            type="danger"
            @click="disconnect(scope.row)"
            >断开</el-button
          >
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            :disabled="scope.row.connectionState !== 'DISCONNECTED'"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            :disabled="scope.row.connectionState !== 'DISCONNECTED'"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import NsGatewayForm from '@/components/GatewayForm'
import gatewayMgmtApi from '../api/gatewayMgmtServiceApi'

export default {
  components: {
    NsGatewayForm
  },
  props: {
    gatewayUsage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      curTableIndex: -1,
      curGatewayDescription: {},
      tableData: [],
      search: ''
    }
  },
  mounted() {
    console.log('GatewayManagement created. Usage:' + this.gatewayUsage)
    const timelyUpdate = () => {
      let timer = setTimeout(timelyUpdate, 5000)
      this.updateList().catch(() => clearTimeout(timer))
    }
    timelyUpdate()
  },
  computed: {
    typeLabel() {
      return this.gatewayUsage === 'TRADE' ? '账户' : '网关'
    }
  },
  methods: {
    updateList() {
      return gatewayMgmtApi.findAll(this.gatewayUsage).then((data) => {
        this.tableData = data
      })
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.curTableIndex = -1
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.curTableIndex = index
      this.curGatewayDescription = row
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      console.log(index, row)
      gatewayMgmtApi.remove(row.gatewayId).then(() => {
        this.updateList()
      })
    },
    handleSave(obj) {
      console.log(obj)
      if (this.curTableIndex > -1) {
        gatewayMgmtApi.update(obj).then(this.updateList)
        return
      }
      this.tableData.push(obj)
      gatewayMgmtApi.create(obj).then(this.updateList)
    },
    connect(row) {
      gatewayMgmtApi.connect(row.gatewayId).then(this.updateList)
    },
    disconnect(row) {
      gatewayMgmtApi.disconnect(row.gatewayId).then(this.updateList)
    },
    inspect(row) {
      console.log(row)
    }
  }
}
</script>

<style></style>
