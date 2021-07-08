const hostModule = {
  state: () => ({
    host: location.hostname
  }),
  mutations: {
    updateHost(state, host) {
      state.host = host
    }
  },
  actions: {},
  getters: {
    apiBaseUrl: () => {
      return `/northstar`
    },
    websocketBaseUrl: () => {
      return `/`
    }
  }
}

export default hostModule
