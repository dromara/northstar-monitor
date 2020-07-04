<template>
  <div class="btn-trade-wrapper">
    <div ref="button" class="btn-trade" :class="type" @click="clickEvent">
      <div class="content"><slot></slot></div>
      <div class="divider"></div>
      <div class="content">{{ content }}</div>
    </div>
  </div>
</template>

<script>
  import jq from 'jquery'

  export default {
    name: 'trader-button',
    props: ['content', 'type'],
    data () {
      return {}
    },
    methods: {
      clickEvent () {
        let obj = jq(this.$refs['button'])
        obj.addClass('btn-trade-click')
        setTimeout(() => {
          obj.removeClass('btn-trade-click')
        }, 100)
      }
    }
  }
</script>

<style scoped>

  .btn-trade-wrapper {
    padding: 0.5em;
    box-sizing: border-box;
    -moz-box-sizing: border-box; /* Firefox */
    -webkit-box-sizing: border-box; /* Safari */
    position: relative;
    width: 33.33%;
    float: left;
    height: 100%;
  }

  .btn-trade {
    vertical-align: center;
    padding: 0em 1em;
    border-radius: 0.5em;
  }

  .btn-trade-click {
    border-color: rgba(186, 186, 223, 0.80);
    background-color: rgba(186, 186, 223, 0.35);
  }

  .divider {
    border-top: 1px solid gainsboro;
  }
  .content {
    text-align: center;
    padding: 0.4em;
  }

</style>
