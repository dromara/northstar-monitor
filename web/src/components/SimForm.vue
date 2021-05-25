<template>
  <el-dialog
    width="500px"
    title="SIM模拟网关配置"
    :visible="visible"
    append-to-body
    :close-on-click-modal="false"
    :show-close="false"
    @close="onClose"
  >
    <el-form
      ref="settingForm"
      :model="settings"
      label-width="330px"
      width="200px"
      :rules="formRules"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="模拟交易双向手续费（单位：最小变动价位）："
            :required="true"
            prop="ticksOfCommission"
          >
            <el-input-number
              v-model="settings.ticksOfCommission"
              :min="0"
              :max="5"
              autocomplete="off"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9" :offset="1">
          <div class="ns-row-wrapper">模拟账户余额： {{ simBalance }}</div>
        </el-col>
        <el-col :span="6" :offset="3">
          <el-input
            v-model="settings.deposit"
            type="number"
            autocomplete="off"
            clearable
            placeholder="出入金额"
          ></el-input>
        </el-col>
        <el-col :span="3" offset="1">
          <el-button>出入金</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="() => $emit('update:visible', false)">取 消</el-button>
      <el-button type="primary" @click="saveSetting">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    settingsSrc: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formRules: {
        ticksOfCommission: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      simBalance: 1000000,
      settings: {
        ticksOfCommission: ''
      }
    }
  },
  watch: {
    settingsSrc: function (val) {
      Object.assign(this.settings, val)
    }
  },
  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    saveSetting() {
      this.$refs.settingForm.validate((valid) => {
        if (valid) {
          let obj = {}
          Object.assign(obj, this.settings)
          this.$emit('onSave', obj)
          this.$emit('update:visible', false)
          this.$refs.settingForm.resetFields()
        }
      })
    }
  }
}
</script>

<style>
.el-dialog__body {
  padding: 10px 20px 0px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}
.ns-row-wrapper {
  margin-bottom: 18px;
}
</style>
