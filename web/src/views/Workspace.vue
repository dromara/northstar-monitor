<template>
  <div class="ns-workspace">
    <div class="ns-header">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">网关管理</el-menu-item>
        <el-menu-item index="2">账户管理</el-menu-item>
        <el-menu-item index="3">策略模组管理</el-menu-item>
        <el-menu-item index="4">手工交易</el-menu-item>
      </el-menu>
    </div>
    <div class="ns-body">
      <iframe
        v-if="showIframe"
        ref="iframe"
        width="100%"
        height="100%"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        allowtransparency="yes"
        src="/#/icon"
      />
    </div>
  </div>
</template>

<script>
const PAGE = {
  1: '/#/gateway/mkt',
  2: '/#/gateway/trd',
  4: '/#/trade'
}
export default {
  data() {
    return {
      showIframe: true
    }
  },
  methods: {
    handleSelect(index) {
      this.showIframe = false
      this.$nextTick(() => {
        this.showIframe = true
        this.$nextTick(() => (this.$refs.iframe.src = PAGE[`${index}`]))
      })
    }
  }
}
</script>

<style scoped>
.ns-workspace {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.ns-header {
  border-bottom: solid 1px #e6e6e6;
  width: 100%;
}
.ns-body {
  height: 100%;
  width: 100%;
  display: flex;
}

.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
