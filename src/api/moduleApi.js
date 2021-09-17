import baseService from './baseRequest'

export default {
  getCtpSignalPolicies() {
    return baseService.get('/signal/policies')
  },
  getRiskControlRules() {
    return baseService.get('/riskControl/rules')
  },
  getDealers() {
    return baseService.get('/trade/dealers')
  },
  componentParams(policyMetaInfo) {
    return baseService.post(`/component/params`, policyMetaInfo)
  },
  insertModule(module) {
    return baseService.post('/module', module)
  },
  updateModule(module) {
    return baseService.put('/module', module)
  },
  getAllModules() {
    return baseService.get('/module')
  },
  toggleModuleState(name) {
    return baseService.get('/module/toggle?name=' + name)
  },
  getModuleInfo(name) {
    return baseService.get('/module/info?name=' + name)
  },
  getModuleDataRef(name) {
    return baseService.get('/module/refdata?name=' + name)
  },
  getModuleRecords(name) {
    return baseService.get('/module/records?name=' + name)
  },
  removeModule(name) {
    return baseService.delete('/module?name=' + name)
  }
}
