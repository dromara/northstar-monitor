<template>
  <el-dialog
    :title="isUpdateMode ? '修改' : '新增'"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    class="cta-dialog"
    width="540px"
  >
    <ContractFinder :visible.sync="contractFinderVisible" />
    <el-container>
      <el-aside width="150px">
        <el-menu :default-active="activeIndex" @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-setting"></i>
            <span slot="title">基础信息</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-s-opportunity"></i>
            <span slot="title">信号策略</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-warning"></i>
            <span slot="title">风控策略</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-s-custom"></i>
            <span slot="title">交易策略</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main
        ><el-form
          ref="ctaSettings"
          :model="form"
          label-width="100px"
          class="cta-form"
          inline
          :rules="formRules"
        >
          <el-form-item v-if="activeIndex === '1'" label="模组名称">
            <el-input v-model="form.moduleName"></el-input>
          </el-form-item>
          <el-form-item v-if="activeIndex === '1'" label="绑定账户">
            <el-select v-model="form.accountGatewayId">
              <el-option
                v-for="account in accountOptions"
                :label="account"
                :value="account"
                :key="account"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="activeIndex === '1'" label="分配账户比例">
            <el-input
              type="number"
              v-model="form.allocatedAccountShare"
              class="with-unit"
            />
            <span class="value-unit">%</span>
          </el-form-item>
          <el-form-item v-if="activeIndex === '1'" label="是否启用">
            <el-switch v-model="form.enabled"> </el-switch>
          </el-form-item>
          <el-form-item v-if="activeIndex === '2'" label="信号策略">
            <el-select
              v-model="form.signalPolicy.componentMeta"
              @change="onChosenSignalPolicy"
              value-key="name"
              placeholder="请选择"
              key="信号策略"
            >
              <el-option
                v-for="(p, i) in signalPolicyOptions"
                :label="p.name"
                :value="p"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>
          <div v-if="activeIndex === '2'">
            <el-form-item
              v-for="(param, index) in signalPolicyParams"
              :label="param.label"
              :key="param.field"
            >
              <el-input
                v-model="form.signalPolicy.initParams[index]['value']"
                :class="param.unit ? 'with-unit' : ''"
                :type="param.type.toLowerCase()"
              />
              <span v-if="param.unit" class="value-unit">{{ param.unit }}</span>
            </el-form-item>
          </div>

          <el-form-item v-if="activeIndex === '3'" label="风控策略">
            <el-select
              v-model="choseRiskRules"
              @change="onChosenRiskRule"
              value-key="name"
              placeholder="请选择"
              key="风控策略"
              collapse-tags
              multiple
              clearable
            >
              <el-option
                v-for="(p, i) in riskRuleOptions"
                :label="p.name"
                :value="p"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>
          <div v-if="activeIndex === '3'">
            <div v-for="(rule, i) in form.riskControlRules" :key="i">
              <div>
                <el-form-item
                  v-for="(param, k) in rule.initParams"
                  :key="k"
                  :label="param.label"
                >
                  <el-input
                    v-model="form.riskControlRules[i].initParams[k]['value']"
                    :class="param.unit ? 'with-unit' : ''"
                    :type="param.type.toLowerCase()"
                  />
                  <span v-if="param.unit" class="value-unit">{{
                    param.unit
                  }}</span>
                </el-form-item>
              </div>
            </div>
          </div>
          <el-form-item v-if="activeIndex === '4'" label="交易策略">
            <el-select
              v-model="form.dealer.componentMeta"
              @change="onChosenDealer"
              value-key="name"
              placeholder="请选择"
              key="交易策略"
            >
              <el-option
                v-for="(p, i) in dealerOptions"
                :label="p.name"
                :value="p"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>
          <div v-if="activeIndex === '4'">
            <el-form-item
              v-for="(param, index) in dealerParams"
              :label="param.label"
              :key="param.field"
            >
              <el-input
                v-model="form.dealer.initParams[index]['value']"
                :class="param.unit ? 'with-unit' : ''"
                :type="param.type.toLowerCase()"
              />
              <span v-if="param.unit" class="value-unit">{{ param.unit }}</span>
            </el-form-item>
          </div>
        </el-form>
      </el-main>
    </el-container>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="contractFinderVisible = true"
        >合约查询</el-button
      >
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="saveCtaSetting">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ContractFinder from './ContractFinder'
import gatewayMgmtApi from '../api/gatewayMgmtApi'
import ctaModuleApi from '../api/ctaModuleApi'

export default {
  components: {
    ContractFinder
  },
  props: {
    isUpdateMode: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    ctaSettings: {
      type: Object,
      default: () => {}
    },
    module: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false,
      contractFinderVisible: false,
      accountOptions: [],
      signalPolicyOptions: [],
      signalPolicyParams: [],
      riskRuleOptions: [],
      riskRuleParams: {},
      dealerOptions: [],
      dealerParams: [],
      activeIndex: '1',
      choseRiskRules: [],
      form: {
        moduleName: '',
        accountGatewayId: '',
        allocatedAccountShare: '',
        signalPolicy: {
          componentMeta: {},
          initParams: []
        },
        riskControlRules: [],
        dealer: {
          componentMeta: {},
          initParams: []
        },
        enabled: true
      }
    }
  },
  async mounted() {
    gatewayMgmtApi
      .findAll('TRADE')
      .then((result) => (this.accountOptions = result.map((i) => i.gatewayId)))
    ctaModuleApi
      .getCtpSignalPolicies()
      .then((result) => (this.signalPolicyOptions = result))
    ctaModuleApi.getDealers().then((result) => (this.dealerOptions = result))

    this.riskRuleOptions = await ctaModuleApi.getRiskControlRules()
    this.riskRuleOptions.forEach(async (i) => {
      const paramsMap = await ctaModuleApi.componentParams(i)
      this.form.riskControlRules.push({
        componentMeta: i,
        initParams: Object.values(paramsMap).sort((a, b) => a.order - b.order)
      })
    })
  },
  watch: {
    visible: function (val) {
      if (val) {
        this.dialogVisible = val
        Object.assign(this.form, this.ctaSettings)
      }
    },
    dialogVisible: function (val) {
      if (!val) {
        this.$emit('update:visible', val)
      }
    },
    module: function (val) {
      this.form = Object.assign({}, val)
      this.signalPolicyParams = val.signalPolicy.initParams
      this.dealerParams = val.dealer.initParams
      this.choseRiskRules = val.riskControlRules.map((i) => i.componentMeta)
      this.onChosenRiskRule(this.choseRiskRules)
    }
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index
    },
    saveCtaSetting() {
      const pass =
        this.assertTrue(this.form.moduleName, '未指定模组名称') ||
        this.assertTrue(this.form.accountGatewayId, '未指定绑定账户') ||
        this.assertTrue(this.form.signalPolicy.name, '未指定信号策略')

      if (!pass) {
        return
      }
      const obj = Object.assign({}, this.form)
      this.$emit('onSave', obj)
      this.close()
    },
    close() {
      this.dialogVisible = false
    },
    assertTrue(expression, errMsg) {
      if (!expression) {
        this.$message.error(errMsg)
        return false
      }
      return true
    },
    onChosenRiskRule(objArr) {
      console.log(objArr)
      console.log(this.riskRuleOptions)
      // 处理数据增减
      // const ruleNames = this.choseRiskRules.map(i => i.name)
    },
    async onChosenDealer() {
      this.dealerParams = []
      let paramsMap = await ctaModuleApi.componentParams(
        this.form.dealer.componentMeta
      )
      this.form.dealer.initParams = []
      Object.values(paramsMap)
        .sort((a, b) => a.order - b.order)
        .map((i) => {
          this.form.dealer.initParams.push(i)
          return i
        })
        .forEach((i) => this.dealerParams.push(i))
    },
    async onChosenSignalPolicy() {
      this.signalPolicyParams = []
      let paramsMap = await ctaModuleApi.componentParams(
        this.form.signalPolicy.componentMeta
      )
      this.form.signalPolicy.initParams = []
      Object.values(paramsMap)
        .sort((a, b) => a.order - b.order)
        .map((i) => {
          this.form.signalPolicy.initParams.push(i)
          return i
        })
        .forEach((i) => this.signalPolicyParams.push(i))
    }
  }
}
</script>

<style scoped>
.cta-dialog {
  min-width: 376px;
}
.cta-form .el-input,
.cta-form .el-select {
  width: 200px;
}

.value-unit {
  /* font-size: 16px; */
  padding-left: 5px;
}
.cta-form .with-unit {
  width: 100px;
}
</style>
