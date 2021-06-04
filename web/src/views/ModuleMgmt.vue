<template>
  <div class="ns-page">
    <CtaForm
      :visible.sync="ctaModuleFormVisible"
      :isUpdateMode="curTableIndex > -1"
      @onSave="onSave"
    />
    <el-table height="100%">
      <el-table-column label="模组名称" align="center" />
      <el-table-column label="绑定账户" align="center" />
      <el-table-column label="信号策略" align="center" />
      <el-table-column label="风控策略" align="center" />
      <el-table-column label="交易策略" align="center" />
      <el-table-column align="center" width="300px">
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
      curTableIndex: -1
    }
  },
  methods: {
    handleCreate() {
      this.ctaModuleFormVisible = true
      this.curTableIndex = -1
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    async onSave(obj) {
      console.log(obj)
      if (this.curTableIndex < 0) {
        await ctaModuleApi.insertModule(obj)
      } else {
        await ctaModuleApi.updateModule(obj)
      }
      let result = await ctaModuleApi.getAllModules()
      console.log(result)
    }
  }
}
</script>

<style></style>
