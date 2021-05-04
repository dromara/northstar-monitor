<template>
  <el-dialog
    :title="isUpdateMode ? '修改' : '新增'"
    :visible="visible"
    width="768px"
    :close-on-click-modal="false"
    @close="() => $emit('update:visible', false)"
  >
    <NsCtpForm
      :visible.sync="ctpFormVisible"
      :ctpSettingsSrc="form.settings"
      @onSave="(ctpSettings) => (form.settings = ctpSettings)"
    />
    <el-form
      ref="gatewayForm"
      :model="form"
      label-width="100px"
      width="200px"
      :rules="formRules"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item :label="`${typeLabel}ID`" prop="gatewayId">
            <el-input
              v-model="form.gatewayId"
              autocomplete="off"
              :disabled="isUpdateMode"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item :label="`${typeLabel}描述`" prop="description">
            <el-input v-model="form.description" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="`${typeLabel}类型`" prop="gatewayType">
            <el-select
              v-model="form.gatewayType"
              placeholder="未知"
              @change="onChooseGatewayType"
            >
              <el-option label="CTP" value="CTP"></el-option>
              <!-- <el-option label="IB网关" value="beijing"></el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="适配器类型" prop="gatewayAdapterType">
            <el-input
              v-model="form.gatewayAdapterType"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="`${typeLabel}用途`" prop="gatewayUsage">
            <el-select
              v-model="form.gatewayUsage"
              placeholder="未知"
              @change="onChooseGatewayType"
            >
              <el-option
                v-if="gatewayUsage === 'MARKET_DATA'"
                label="行情"
                value="MARKET_DATA"
              ></el-option>
              <el-option
                v-if="gatewayUsage === 'TRADE'"
                label="真实交易"
                value="TRADE"
              ></el-option>
              <el-option
                v-if="gatewayUsage === 'TRADE'"
                label="模拟交易"
                value="SIM_TRADE"
              ></el-option>
              <!-- <el-option label="IB网关" value="beijing"></el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" v-if="gatewayUsage === 'MARKET_DATA'">
          <el-form-item label="自动连接">
            <el-switch v-model="form.autoConnect"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="gatewayUsage === 'TRADE'">
          <el-form-item label="行情网关" prop="relativeGatewayId">
            <el-select
              v-model="form.relativeGatewayId"
              placeholder="请选择"
              @change="onChooseGatewayType"
            >
              <el-option
                :label="item.gatewayId"
                :value="item.gatewayId"
                v-for="(item, i) in linkedGatewayOptions"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="() => $emit('update:visible', false)">取 消</el-button>
      <el-button
        type="primary"
        @click="gatewaySettingConfig"
        :disabled="!form.gatewayType"
        >{{ typeLabel }}配置</el-button
      >
      <el-button type="primary" @click="saveGateway">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import NsCtpForm from '@/components/CtpForm'
import gatewayMgmtApi from '../api/gatewayMgmtServiceApi'
const GATEWAY_ADAPTER = {
  CTP: 'xyz.redtorch.gateway.ctp.x64v6v3v15v.CtpGatewayAdapter',
  IB: ''
}
const CONNECTION_STATE = {
  CONNECTING: 'CONNECTING',
  CONNECTED: 'CONNECTED',
  DISCONNECTING: 'DISCONNECTING',
  DISCONNECTED: 'DISCONNECTED'
}
export default {
  components: {
    NsCtpForm
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    gatewayDescription: {
      type: Object,
      default: () => {}
    },
    isUpdateMode: {
      type: Boolean,
      default: false
    },
    gatewayUsage: {
      type: String,
      default: 'TRADE'
    }
  },
  data() {
    return {
      linkedGatewayOptions: [],
      formRules: {
        gatewayId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        gatewayType: [{ required: true, message: '不能为空', trigger: 'blur' }],
        gatewayUsage: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        relativeGatewayId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      ctpFormVisible: false,
      form: {
        gatewayId: '',
        description: '',
        gatewayType: '',
        gatewayUsage: '',
        gatewayAdapterType: '',
        connectionState: CONNECTION_STATE.DISCONNECTED,
        autoConnect: true,
        relativeGatewayId: '',
        settings: null
      }
    }
  },
  computed: {
    typeLabel() {
      return this.gatewayUsage === 'TRADE' ? '账户' : '网关'
    }
  },
  mounted() {
    gatewayMgmtApi.findAll('MARKET_DATA').then((data) => {
      this.linkedGatewayOptions = data
    })
  },
  watch: {
    gatewayDescription: function (val) {
      Object.assign(this.form, val)
    }
  },
  methods: {
    onChooseGatewayType() {
      this.form.gatewayAdapterType = GATEWAY_ADAPTER[this.form.gatewayType]
    },
    gatewaySettingConfig() {
      if (this.form.gatewayType === 'CTP') {
        this.ctpFormVisible = true
      }
    },
    async saveGateway() {
      console.log(this.form)
      if (!this.form.settings || !Object.keys(this.form.settings).length) {
        throw new Error('网关配置不能为空')
      }
      this.$refs.gatewayForm
        .validate()
        .then(() => {
          let obj = {}
          Object.assign(obj, this.form)
          this.$emit('onSave', obj)
          this.$emit('update:visible', false)
          this.$refs.gatewayForm.resetFields()
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }
}
</script>

<style>
.el-dialog__body {
  padding: 10px 20px 0px;
}
</style>
