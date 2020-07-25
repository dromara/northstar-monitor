<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import './assets/index.css'

  export default {
    name: 'app',
    methods: {
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  #app{
    height: 100%;
  }
</style>
