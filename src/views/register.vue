<template>
    <el-row justify="center">
        <el-col>
            <div class="main">
                <el-row justify="center">
                    <el-col :span="24">
                        <span class="title">注册</span>
                    </el-col>
                </el-row>
                <el-row justify="center">
                    <el-col :span="24">
                        <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules"
                            label-position="left" label-width="80px">
                            <el-form-item label="账号" prop="username">
                                <el-input v-model="registerForm.username" />
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="registerForm.password" type="password" show-password />
                            </el-form-item>
                            <el-form-item label="重复密码" prop="repassword">
                                <el-input v-model="registerForm.repassword" type="password" show-password />
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row justify="center">
                    <el-col :span="6">
                        <el-button type="primary" @click="onRegister">注册</el-button>
                    </el-col>
                    <el-col :span="6">
                        <el-button @click="onCancel">取消</el-button>
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
            registerForm: {
                username: null,
                password: null,
                repassword: null
            },
            data: {
                username: null,
                password: null
            },
            registerFormRules: {
                username: [{ required: true, pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/, message: '6-18位字母、数字、下划线', trigger: 'blur' }],
                password: [{ required: true, pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,18}$/, message: '6-18位字母、数字、符号，至少两种', trigger: 'blur' }],
                repassword: [{
                    required: true,
                    validator: (rule, value, callback) => {
                        if (value !== this.registerForm.password) {
                            callback(new Error('密码不一致'))
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        onRegister() {
            this.$refs.registerFormRef.validate(async (valid) => {
                if (!valid) return
                this.data.username = this.registerForm.username
                this.data.password = this.$md5(this.registerForm.password)
                const { data: res } = await this.$http.post('/user/register', this.data)
                if (res.code === 1) {
                    ElMessage({
                        message: res.message,
                        type: 'success'
                    })
                    this.$router.push('/login')
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
            this.$refs.registerFormRef.resetFields()
        }
    }
}
</script>

<style scoped>
.main {
    width: 400px;
    height: 300px;
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
</style>