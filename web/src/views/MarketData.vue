<template>
  <div class="ns-market">
    <div ref="side" class="ns-side-panel highlight">
      <iframe
        width="100%"
        height="100%"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        allowtransparency="yes"
        src="/#/tradeUrl"
      />
    </div>
    <div class=""></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tradeUrl: '',
      animateClass: ''
    }
  },
  mounted() {
    this.animateClass = 'animatebounce'
    this.tradeUrl = 'http://localhost:8080/#/trade'
  }
}
</script>

<style>
.ns-market {
  width: 100%;
  display: flex;
  overflow: hidden;
}
.ns-side-panel {
}
.highlight {
  border: 1px solid red;
}

.highlight {
}
</style>
