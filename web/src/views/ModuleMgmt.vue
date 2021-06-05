<template>
  <div class="ns-page">
    <CtaForm
      :visible.sync="ctaModuleFormVisible"
      :isUpdateMode="curTableIndex > -1"
      :module="curModule"
      @onSave="onSave"
    />
    <el-table height="100%" :data="list">
      <el-table-column label="模组名称" prop="moduleName" align="center" />
      <el-table-column
        label="绑定账户"
        prop="accountGatewayId"
        align="center"
      />
      <el-table-column
        label="资金占用上限"
        prop="allocatedAccountShare"
        align="center"
        width="80px"
      >
        <template slot-scope="scope"
          >{{ scope.row.allocatedAccountShare }}%</template
        >
      </el-table-column>
      <el-table-column
        label="信号策略"
        prop="signalPolicy.componentMeta.name"
        align="center"
      />
      <el-table-column label="风控策略" align="center">
        <template slot-scope="scope">
          {{
            scope.row.riskControlRules
              .map((i) => i.componentMeta.name)
              .join(',')
          }}
        </template>
      </el-table-column>
      <el-table-column
        label="交易策略"
        prop="dealer.componentMeta.name"
        align="center"
      />
      <el-table-column
        label="是否启用"
        prop="enabled"
        align="center"
        width="60px"
      >
        <template slot-scope="scope">{{
          scope.row.enabled ? '启用' : '停用'
        }}</template>
      </el-table-column>
      <el-table-column align="center" width="150px">
        <template slot="header">
          <el-button size="mini" type="primary" @click="handleCreate"
            >新建</el-button
          >
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import CtaForm from '@/components/CtaForm'

import ctaModuleApi from '@/api/ctaModuleApi'

export default {
  components: {
    CtaForm
  },
  data() {
    return {
      ctaModuleFormVisible: false,
      curTableIndex: -1,
      curModule: {},
      list: []
    }
  },
  mounted() {
    this.findAll()
  },
  methods: {
    handleCreate() {
      this.ctaModuleFormVisible = true
      this.curTableIndex = -1
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.curTableIndex = index
      this.curModule = row
      this.ctaModuleFormVisible = true
    },
    async handleDelete(index, row) {
      console.log(index, row)
      await ctaModuleApi.removeModule(row.moduleName)
      this.findAll()
    },
    async onSave(obj) {
      console.log(obj)
      if (this.curTableIndex < 0) {
        await ctaModuleApi.insertModule(obj)
      } else {
        await ctaModuleApi.updateModule(obj)
      }
      this.findAll()
    },
    async findAll() {
      this.list = await ctaModuleApi.getAllModules()
      console.log(this.list)
    }
  }
}
</script>

<style></style>
