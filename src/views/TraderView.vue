<!-- 新版 -->
<template>
  <div class="view-common">
    <account-part class="account-part"></account-part>
    <trader-part class="trade-part"></trader-part>
  </div>
</template>

<script>
  import AccountPart from '../parts/AccountPart'
  import TraderPart from '../parts/TraderPart'
  export default {
    name: 'trader-view',
    components: {
      AccountPart,
      TraderPart
    }
  }
</script>

<style scoped>
.account-part{
  height: calc(100% - 200px);
  overflow: auto;
}
.trade-part{
  position: absolute;
  bottom: 0px;
  width: 100%;
}
</style>
