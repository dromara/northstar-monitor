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
    websocketBaseUrl: (state) => {
      return `http://${state.host}:51888`
    }
  }
}

export default hostModule
