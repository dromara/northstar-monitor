<template>
  <el-dialog
    width="768px"
    title="CTP网关配置"
    :visible.sync="dialogVisible"
    append-to-body
    :close-on-click-modal="false"
    :show-close="false"
    destroy-on-close
  >
    <el-form
      ref="ctpSettings"
      :model="ctpSettings"
      label-width="100px"
      width="200px"
      :rules="formRules"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="网关账户" prop="userId">
            <el-input
              v-model="ctpSettings.userId"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="网关密码" prop="password">
            <el-input
              v-model="ctpSettings.password"
              type="password"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="期货公司编码"
            label-width="130px"
            prop="brokerId"
          >
            <el-input
              v-model="ctpSettings.brokerId"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="网关IP" prop="host">
            <el-input v-model="ctpSettings.host" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="网关端口" prop="port">
            <el-input
              v-model="ctpSettings.port"
              autocomplete="off"
              type="number"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="授权码" prop="authCode">
            <el-input
              v-model="ctpSettings.authCode"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="AppID" prop="appId">
            <el-input v-model="ctpSettings.appId" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item
            label="UserProductInfo"
            label-width="150px"
            prop="userProductInfo"
          >
            <el-input
              v-model="ctpSettings.userProductInfo"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="saveCtpSetting">保 存</el-button>
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
    ctpSettingsSrc: {
      type: Object,
      default: () => {}
    },
    gatewayUsage: {
      type: String,
      default: 'TRADE'
    }
  },
  data() {
    return {
      formRules: {
        userId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '不能为空', trigger: 'blur' }],
        brokerId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        host: [{ required: true, message: '不能为空', trigger: 'blur' }],
        port: [{ required: true, message: '不能为空', trigger: 'blur' }],
        authCode: [{ required: true, message: '不能为空', trigger: 'blur' }],
        userProductInfo: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        appId: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      dialogVisible: false,
      ctpSettings: {
        userId: '',
        password: '',
        brokerId: '',
        host: '',
        port: '',
        authCode: '',
        userProductInfo: '',
        appId: ''
      }
    }
  },
  watch: {
    visible: function (val) {
      if (val) {
        this.dialogVisible = val
        Object.assign(this.ctpSettings, this.ctpSettingsSrc)
        this.ctpSettings.host =
          this.ctpSettingsSrc.mdHost || this.ctpSettingsSrc.tdHost
        this.ctpSettings.port =
          this.ctpSettingsSrc.mdPort || this.ctpSettingsSrc.tdPort
      }
    },
    dialogVisible: function (val) {
      if (!val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    close() {
      this.dialogVisible = false
      this.ctpSettings = this.$options.data().ctpSettings
    },
    saveCtpSetting() {
      this.ctpSettings.mdHost = this.ctpSettings.host
      this.ctpSettings.mdPort = this.ctpSettings.port
      this.ctpSettings.tdHost = this.ctpSettings.host
      this.ctpSettings.tdPort = this.ctpSettings.port
      this.$refs.ctpSettings.validate((valid) => {
        if (valid) {
          let obj = {}
          Object.assign(obj, this.ctpSettings)
          this.$emit('onSave', obj)
          this.close()
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
</style>
