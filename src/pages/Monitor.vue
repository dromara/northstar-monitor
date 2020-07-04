<template>
  <div class="monitor">
    <x-header :left-options="{showBack: false}" :right-options="{showMore: true}" @on-click-more="showMenu = true">{{ currentHeader }}</x-header>
    <trade-view v-if="currentHeader==='交易与账户-旧'"></trade-view>
    <trader-view v-else-if="currentHeader==='交易与账户'"></trader-view>
    <div>
      <actionsheet :menus="menus" v-model="showMenu" @on-click-menu="switchView" :close-on-clicking-mask="false"></actionsheet>
    </div>
  </div>
</template>

<script>
  import TradeView from '../views/TradeView'
  import TraderView from '../views/TraderView'

  export default {
    components: {
      TraderView,
      TradeView
    },
    name: 'monitor',
    data () {
      return {
        currentHeader: '交易与账户',
        menus: {
          menu1: '交易与账户',
          menu2: '交易与账户-旧'
        },
        showMenu: false
      }
    },
    methods: {
      switchView (menuKey, menuItem) {
        this.currentHeader = menuItem
      }
    }
  }
</script>

<style scoped>
  .monitor{
    height: 100%;
  }
  .view-common{
    height: calc(100% - 46px)
  }
</style>
