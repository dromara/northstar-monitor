<template>
  <div class="common frame">
    <div class="title">北极星交易平台</div>
    <div class="title">监控端</div>

    <div  class="info">
        <x-input title="用户" v-model="form.userName"></x-input>
        <x-input title="密码" v-model="form.password" type="password"></x-input>
    </div>

    <x-button @click.native="confirm">登陆</x-button>
    <toast v-model="showErrMsg" type="warn">用户或密码不正确</toast>
  </div>
</template>

<script>
  import loginService from '../api/service/loginService'
  export default {
    name: 'login',
    data () {
      return {
        form: {
          userName: '',
          password: ''
        },
        showErrMsg: false
      }
    },
    mounted () {
      document.onkeydown = (e) => {
        if (e.key === 'Enter') {
          this.confirm()
        }
      }
    },
    methods: {
      async confirm () {
        console.log('confirm')
        loginService.setUserInfo(this.form.userName, this.form.password)
        try {
          await loginService.auth()
          this.$router.push('monitor')
        } catch (e) {
          this.showErrMsg = true
        }
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
