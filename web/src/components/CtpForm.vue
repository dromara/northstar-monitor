<template>
  <el-dialog
    width="768px"
    title="CTP网关配置"
    :visible="visible"
    append-to-body
    :close-on-click-modal="false"
    :show-close="false"
    @close="onClose"
  >
    <el-form
      ref="ctpSettings"
      :model="ctpSettings"
      label-width="100px"
      width="200px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="网关账户" :required="true" prop="userId">
            <el-input
              v-model="ctpSettings.userId"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="网关密码" :required="true" prop="password">
            <el-input
              v-model="ctpSettings.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="期货公司编码"
            label-width="130px"
            :required="true"
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
          <el-form-item label="网关IP" :required="true" prop="host">
            <el-input v-model="ctpSettings.host" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="网关端口" :required="true" prop="port">
            <el-input v-model="ctpSettings.port" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="授权码" :required="true" prop="authCode">
            <el-input
              v-model="ctpSettings.authCode"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="AppID" :required="true" prop="appId">
            <el-input v-model="ctpSettings.appId" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item
            label="UserProductInfo"
            label-width="150px"
            :required="true"
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
      <el-button @click="() => $emit('update:visible', false)">取 消</el-button>
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
    ctpSettingsSrc: function (val) {
      Object.assign(this.ctpSettings, val)
    }
  },
  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    saveCtpSetting() {
      if (this.gatewayUsage === 'MARKET_DATA') {
        this.ctpSettings.mdHost = this.ctpSettings.host
        this.ctpSettings.mdPort = this.ctpSettings.port
      } else {
        this.ctpSettings.tdHost = this.ctpSettings.host
        this.ctpSettings.tdPort = this.ctpSettings.port
      }
      let obj = {}
      Object.assign(obj, this.ctpSettings)
      this.$emit('onSave', obj)
      this.$emit('update:visible', false)
      this.$refs.ctpSettings.resetFields()
    }
  }
}
</script>

<style>
.el-dialog__body {
  padding: 10px 20px 0px;
}
</style>
