<template>
  <div class="wrapper">
    <div class="logo"></div>
    <div class="panel">
      <el-form
        :model="userForm"
        status-icon
        :rules="rules"
        label-width="80px"
        class="demo-userForm"
      >
        <el-form-item label="用户名">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="userForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        name: '',
        pass: ''
      }
    }
  },
  methods: {
    login() {},
    resetForm() {}
  }
}
</script>

<style>
.panel {
  /* width: 20%; */
  width: 300px;
  min-width: 300px;
  margin: 20px 0;
}
.logo {
  background-image: url('~@/assets/logo.png');
  width: 300px;
  height: 300px;
}
.wrapper {
  display: flex;
  margin: auto;
  flex-direction: column;
}
</style>
