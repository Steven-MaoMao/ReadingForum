<template>
  <el-row justify="center">
    <el-col>
      <div class="main">
        <el-row justify="center">
          <el-col :span="20">
            <span class="title">登录</span>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="20">
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-position="left"
              label-width="80px">
              <el-form-item label="账号" prop="username">
                <el-input v-model="loginForm.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" show-password />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="6">
            <el-button type="primary" @click="onSubmit">登录</el-button>
          </el-col>
          <el-col :span="6">
            <el-button @click="onCancel">取消</el-button>
          </el-col>
        </el-row>
        <el-row justify="end">
          <el-col :span="8">
            <el-button text @click="onToRegister">没有账号>></el-button>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [{ required: true, pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/, message: '6-18位字母、数字、下划线', trigger: 'blur' }],
        password: [{ required: true, pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,18}$/, message: '6-18位字母、数字、符号，至少包含两种', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        this.loginForm.password = this.$md5(this.loginForm.password)
        const { data: res } = await this.$http.post('/user/login', this.loginForm)
        if (res.code === 1) {
          ElMessage({
            message: res.message,
            type: 'success'
          })
          this.$cookies.set('token', res.data.token, '1d')
        } else {
          ElMessage({
            message: res.message,
            type: 'error'
          })
          this.onCancel()
        }
      })
    },
    onCancel() {
      this.$refs.loginFormRef.resetFields()
    },
    onToRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.main {
  width: 400px;
  height: 250px;
  margin-top: 200px;
  padding: 10px;
  box-shadow: var(--el-box-shadow-dark);
}

.el-row {
  margin: 10px;
}

.el-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: larger;
  margin: 10px;
}

.register {
  font-size: x-small;
}
</style>