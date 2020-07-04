<template>
  <div class="common frame">
    <div class="title">北极星交易平台</div>
    <div class="title">监控端</div>

    <div  class="info">
        <x-input title="用户" v-model="form.userName"></x-input>
        <x-input title="密码" v-model="form.password" type="password"></x-input>
    </div>

    <x-button @click.native="confirm">登陆</x-button>
    <toast v-model="errHint" type="warn">用户或密码不正确</toast>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        form: {
          userName: '',
          password: ''
        },
        errHint: false
      }
    },
    methods: {
      confirm () {
        console.log('confirm')
        let pass = this.form.userName === 'admin' && this.form.password === '123456'
        if (pass) {
          this.$router.push('monitor')
          return
        }
        this.errHint = true
        setTimeout(() => {
          this.errHint = false
        }, 2000)
      }
    }
  }
</script>

<style scoped>
  .title {
    font-size: 2rem;
    text-align: center;
    margin-top: 1em;
  }
  .frame {
    padding: 5rem;
  }
  .info {
    border-radius: 5px;
    border: 1px solid gray;
    margin-top: 2.5em;
    margin-bottom: 3em;
    padding-right: 1em;
  }
</style>
