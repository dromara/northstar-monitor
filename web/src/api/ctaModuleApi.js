import baseService from './baseRequest'

export default {
  getCtpSignalPolicies() {
    return baseService.get('/cta/signal/policies')
  },
  getRiskControlRules() {
    return baseService.get('/cta/riskControl/rules')
  },
  getDealers() {
    return baseService.get('/cta/trade/dealers')
  },
  componentParams(policyMetaInfo) {
    return baseService.post(`/cta/component/params`, policyMetaInfo)
  },
  insertModule(module) {
    return baseService.post('/cta/module', module)
  },
  updateModule(module) {
    return baseService.put('/cta/module', module)
  },
  getAllModules() {
    return baseService.get('/cta/module')
  },
  removeModule(name) {
    return baseService.delete('/cta/module?name=' + name)
  }
}
