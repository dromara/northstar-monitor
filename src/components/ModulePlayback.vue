<template>
  <el-dialog
    title="模组回测"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    class="module-dialog"
    width="600px"
  >
    <div class="warning-text"><i class="el-icon-warning" /> 只有停用的模组才能进行回测</div>
    <el-row>
      <el-date-picker
        v-model="dates"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
      <el-button class="btn-position ml-10" @click="startPlayback">开始回测</el-button>
    </el-row>
    <el-table
      :data="data"
      style="width: 100%"
      height="400"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45" align="center"> </el-table-column>
      <el-table-column prop="moduleName" label="模组名称" width="120" align="center">
      </el-table-column>
      <el-table-column prop="name" label="回测进度" align="center">
        <el-progress
          :text-inside="true"
          :stroke-width="22"
          :percentage="80"
          status="success"
        ></el-progress>
      </el-table-column>
    </el-table>
    <div slot="footer"></div>
  </el-dialog>
</template>

<script>
import playbackApi from '@/api/playbackApi'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      dates: [],
      chosenModule: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() || time.getTime() < new Date('2021-10-01').getTime()
        }
      }
    }
  },
  watch: {
    visible: function (val) {
      if (val) {
        this.dialogVisible = val
        console.log(this.data)
      }
    },
    dialogVisible: function (val) {
      if (!val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    async startPlayback() {
      if (!this.dates.length) {
        throw new Error('回测起止日期未填')
      }
      if (!this.chosenModule.length) {
        throw new Error('未选中回测模组')
      }
      const playIds = await playbackApi.startPlay(this.dates[0], this.dates[1], this.chosenModule)
      // const checkProcess = () => {}
      this.chosenModule.map((item, index) => {
        item.playId = playIds[index]
        item.playProcess = 0
        return item
      })
    },
    handleSelectionChange(selection) {
      this.chosenModule = selection
    }
  }
}
</script>

<style>
.btn-position {
  position: absolute;
}
input.el-range-input {
  background-color: transparent !important;
}
.el-date-table td.in-range div,
.el-date-table td.in-range div:hover,
.el-date-table.is-week-mode .el-date-table__row.current div,
.el-date-table.is-week-mode .el-date-table__row:hover div {
  background-color: darkgray;
}
</style>
