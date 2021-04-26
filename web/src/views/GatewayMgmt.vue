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
      <el-table-column label="网关ID" prop="gatewayId"> </el-table-column>
      <el-table-column label="网关描述" prop="description"> </el-table-column>
      <el-table-column label="网关类型" prop="gatewayType" width="80px">
      </el-table-column>
      <el-table-column label="连接状态" prop="connectionState" width="80px">
      </el-table-column>
      <el-table-column label="自动连接" prop="autoConnect" width="80px">
      </el-table-column>
      <el-table-column label="是否启用" prop="disabled" width="80px">
      </el-table-column>
      <el-table-column label="适配器类型" prop="gatewayAdapterType">
      </el-table-column>
      <el-table-column align="center" width="180px">
        <template slot="header">
          <el-button size="mini" type="primary" @click="handleCreate"
            >新建</el-button
          >
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import NsGatewayForm from '@/components/GatewayForm'

export default {
  components: {
    NsGatewayForm
  },
  data() {
    return {
      pageType: '',
      dialogFormVisible: false,
      curTableIndex: -1,
      curGatewayDescription: {},
      tableData: [],
      search: ''
    }
  },
  computed: {
    gatewayUsage() {
      return this.pageType === 'trd' ? 'TRADE' : 'MARKET_DATA'
    }
  },
  mounted() {
    console.log(this.$route.query.type)
    this.pageType = this.$route.query.type
  },
  methods: {
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
    },
    handleSave(obj) {
      console.log(obj)
      if (this.curTableIndex > -1) {
        this.tableData[this.curTableIndex] = obj
        return
      }
      this.tableData.push(obj)
    }
  }
}
</script>

<style></style>
