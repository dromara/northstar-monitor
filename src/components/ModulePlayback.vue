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
      <el-button class="btn-position ml-10" @click="startPlayback" :disabled="playbackRunning">
        开始回测
      </el-button>
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
        <template slot-scope="scope">
          <el-progress
            :text-inside="true"
            :stroke-width="22"
            :percentage="scope.row.process || 0"
            status="success"
          ></el-progress>
        </template>
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
      playbackRunning: false,
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
    visible: async function (val) {
      if (val) {
        this.dialogVisible = val
        this.playbackRunning = await playbackApi.getPlaybackReadiness()
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
      this.playbackRunning = true
      const playIds = await playbackApi.startPlay(this.dates[0], this.dates[1], this.chosenModule)
      const checkProcessJobs = playIds.map(
        (id, index) =>
          new Promise((r) => {
            const job = async () => {
              const process = await playbackApi.getProcess(id)
              this.chosenModule[index].process = process
              if (process < 100) {
                setTimeout(job, 3000)
              } else {
                r()
              }
            }
            job()
          })
      )
      Promise.all(checkProcessJobs).then(() => (this.playbackRunning = false))
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
