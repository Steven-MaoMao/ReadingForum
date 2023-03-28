<template>
    <el-container>
        <el-header>

        </el-header>
        <el-main>
            <el-row class="block">
                <el-col>
                    <el-row justify="center" style="margin-bottom: 40px;">
                        <el-col :span="20">
                            <el-avatar :size="100" shape="square" fit="cover" :src="this.avatarUrl">
                                {{ this.userInfo.username }}
                            </el-avatar>
                        </el-col>
                        <el-col :span="2">
                            <el-button @click="changeAvatarDialogVisible = true">上传头像</el-button>
                        </el-col>
                    </el-row>
                    <el-row justify="center">
                        <el-col :span="20">
                            <el-descriptions title="个人信息">
                                <el-descriptions-item label="用户名：">{{ userInfo.username }}</el-descriptions-item>
                                <el-descriptions-item label="昵称：">{{ userInfo.nickname }}</el-descriptions-item>
                                <el-descriptions-item label="性别：">{{ userInfo.gender }}</el-descriptions-item>
                                <el-descriptions-item label="生日：">{{ userInfo.birthday }}</el-descriptions-item>
                                <el-descriptions-item label="手机：">{{ userInfo.phone }}</el-descriptions-item>
                                <el-descriptions-item label="邮箱：">{{ userInfo.email }}</el-descriptions-item>
                                <el-descriptions-item label="地址：">{{ userInfo.location }}</el-descriptions-item>
                                <el-descriptions-item label="个性签名：">{{ userInfo.bio }}</el-descriptions-item>
                            </el-descriptions>
                        </el-col>
                        <el-col :span="2" style="display: flex; flex-direction: column; justify-content: space-between;">
                            <el-row>
                                <el-col>
                                    <el-button @click="changeUserInfoDialogVisible = true">修改信息</el-button>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-button @click="changePasswordDialogVisible = true">修改密码</el-button>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-button type="danger" @click="logout">退出登录</el-button>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row class="block">
                <el-col>
                    <el-tabs v-model="activeName" stretch>
                        <el-tab-pane label="我的收藏" name="favourite">User</el-tab-pane>
                        <el-tab-pane label="我的关注" name="following">Config</el-tab-pane>
                        <el-tab-pane label="我的粉丝" name="follower">Role</el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
    <el-dialog v-model="changeAvatarDialogVisible" title="上传头像" width="30%">
        <div class="dialog">
            <el-upload class="avatar-uploader" ref="uploadRef" action="http://localhost:8080/user/uploadAvatar"
                :headers=headers :show-file-list="false" accept=".png, .jpeg, .jpg, .gif" :on-success="handleSuccess"
                :on-error="handleError" :on-exceed="handleExceed" :before-upload="beforeUpload" :limit=1>
                <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
            <span style="font-size: xx-small;">头像文件格式限制.png .jpeg .jpg .gif，大小限制2M</span>
        </div>
    </el-dialog>
    <el-dialog v-model="changeUserInfoDialogVisible" title="修改信息">
        <div class="dialog">
            <el-form>

            </el-form>
        </div>
    </el-dialog>
    <el-dialog v-model="changePasswordDialogVisible" title="修改密码" width="30%">
        <div class="dialog">
            <el-row justify="center">
                <el-col :span="24">
                    <el-form ref="changePasswordFormRef" :model="changePasswordForm" :rules="changePasswordRules"
                        label-position="left" label-width="100px">
                        <el-form-item label="原密码" prop="oldPassword">
                            <el-input v-model="changePasswordForm.oldPassword" type="password" show-password />
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPassword">
                            <el-input v-model="changePasswordForm.newPassword" type="password" show-password />
                        </el-form-item>
                        <el-form-item label="重复新密码" prop="reNewPassword">
                            <el-input v-model="changePasswordForm.reNewPassword" type="password" show-password />
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 100%;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onChangePassword">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelChangePassword">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            userInfo: {
                username: '',
                nickname: '',
                gender: '',
                birthday: '',
                phone: '',
                email: '',
                location: '',
                bio: ''
            },
            changePasswordForm: {
                oldPassword: '',
                newPassword: '',
                reNewPassword: ''
            },
            changePasswordRules: {
                oldPassword: [{ required: true, pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,18}$/, message: '6-18位字母、数字、符号，至少两种', trigger: 'blur' }],
                newPassword: [{ required: true, pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,18}$/, message: '6-18位字母、数字、符号，至少两种', trigger: 'blur' }],
                reNewPassword: [{
                    required: true,
                    validator: (rule, value, callback) => {
                        if (value !== this.changePasswordForm.newPassword) {
                            callback(new Error('密码不一致'))
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur'
                }]
            },
            headers: {
                token: '',
            },
            activeName: 'favourite',
            changeAvatarDialogVisible: false,
            changeUserInfoDialogVisible: false,
            changePasswordDialogVisible: false,
            avatarUrl: ''
        }
    },
    mounted() {
        this.headers.token = JSON.parse(sessionStorage.getItem('token'))
        this.userInfo.username = JSON.parse(sessionStorage.getItem('username'))
        this.userInfo.avatar = JSON.parse(sessionStorage.getItem('avatar'))
        this.userInfo.nickname = JSON.parse(sessionStorage.getItem('nickname'))
        this.userInfo.gender = JSON.parse(sessionStorage.getItem('gender'))
        this.userInfo.birthday = JSON.parse(sessionStorage.getItem('birthday'))
        this.userInfo.phone = JSON.parse(sessionStorage.getItem('phone'))
        this.userInfo.email = JSON.parse(sessionStorage.getItem('email'))
        this.userInfo.location = JSON.parse(sessionStorage.getItem('location'))
        this.userInfo.bio = JSON.parse(sessionStorage.getItem('bio'))
        if (JSON.parse(sessionStorage.getItem('avatar')) !== null) {
            this.avatarUrl = this.$http.defaults.baseURL + JSON.parse(sessionStorage.getItem('avatar'))
        }
    },
    methods: {
        handleSuccess(responce, uploadFile, uploadFiles) {
            if (responce.code === 1) {
                ElMessage({
                    message: '上传成功！',
                    type: 'success'
                })
                this.avatarUrl = this.$http.defaults.baseURL + responce.data.path
                this.userInfo.avatar = responce.data.path
                sessionStorage.setItem('avatar', JSON.stringify(responce.data.path))
            } else {
                ElMessage({
                    message: '上传失败！',
                    type: 'error'
                })
            }
        },
        handleError(error, uploadFile, uploadFiles) {
            console.log(error)
            ElMessage({
                message: '上传失败！',
                type: 'error'
            })
        },
        handleExceed(files, uploadFiles) {
            this.$refs.uploadRef.clearFiles()
            const file = files[0]
            this.$refs.uploadRef.handleStart(file)
            this.$refs.uploadRef.submit()
        },
        beforeUpload(rawFile) {
            if (rawFile.type !== 'image/png' || rawFile.type !== 'image/jpeg' || rawFile.type !== 'image/gif') {
                ElMessage({
                    message: '文件格式不正确',
                    type: 'error'
                })
                return false
            } else if (rawFile.size / 1024 / 1024 > 2) {
                ElMessage({
                    message: '文件不能超过2M',
                    type: 'error'
                })
                return false
            }
            return true
        },
        onChangePassword() {
            this.$refs.changePasswordFormRef.validate(async (valid) => {
                if (!valid) return
                this.changePasswordForm.oldPassword = this.$md5(this.changePasswordForm.oldPassword)
                this.changePasswordForm.newPassword = this.$md5(this.changePasswordForm.newPassword)
                this.changePasswordForm.reNewPassword = null
                const { data: res } = await this.$http.put('/user/updatePassword', this.changePasswordForm)
                console.log(res)
                if (res.code === 1) {
                    ElMessage({
                        message: res.message,
                        type: 'success'
                    })
                    this.logout()
                } else {
                    ElMessage({
                        message: res.message,
                        type: 'error'
                    })
                    this.onCancelChangePassword()
                }
            })
        },
        onCancelChangePassword() {
            this.$refs.changePasswordFormRef.resetFields()
        },
        logout() {
            this.$cookies.remove('token')
            sessionStorage.clear()
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.el-container {
    align-items: center;
}

.el-main {
    width: 70%;
}

.block {
    margin: 20px;
    padding: 20px;
    box-shadow: var(--el-box-shadow-lighter);
}

.dialog {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.avatar-uploader {
    width: 200px;
    height: 200px;
    border: 2px dashed var(--el-border-color);
    margin: 50px;
}

.avatar-uploader:hover {
    border-color: var(--el-color-primary);
}

.avatar {
    width: 200px;
    height: 200px;
    object-fit: cover;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    text-align: center;
}
</style>