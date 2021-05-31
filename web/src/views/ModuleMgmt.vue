<template>
  <div class="ns-page">
    <el-table height="100%">
      <el-table-column label="模组名称" />
      <el-table-column label="绑定账户" />
      <el-table-column label="信号策略" />
      <el-table-column label="风控策略" />
      <el-table-column label="交易策略" />
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
export default {
  data() {
    return {}
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style></style>
