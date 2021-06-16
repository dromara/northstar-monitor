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
    apiBaseUrl: (state) => {
      return `http://${state.host}:8888/northstar`
    },
    websocketBaseUrl: (state) => {
      return `http://${state.host}:51888`
    }
  }
}

export default hostModule
