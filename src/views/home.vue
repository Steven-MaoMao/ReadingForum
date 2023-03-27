<template>
    <el-container>
        <el-header>

        </el-header>
        <el-main>
            <el-row class="block">
                <el-col>
                    <el-row justify="center" style="margin-bottom: 40px;">
                        <el-col :span="20">
                            <el-avatar :size="100"> user </el-avatar>
                        </el-col>
                        <el-col :span="2">
                            <el-button @click="changeAvatarDialogVisible = true">上传头像</el-button>
                        </el-col>
                    </el-row>
                    <el-row justify="center">
                        <el-col :span="20">
                            <el-descriptions title="个人信息">
                                <el-descriptions-item label="用户名">{{ userInfo.username }}</el-descriptions-item>
                                <el-descriptions-item label="昵称">{{ userInfo.nickname }}</el-descriptions-item>
                                <el-descriptions-item label="性别">{{ userInfo.gender }}</el-descriptions-item>
                                <el-descriptions-item label="生日">{{ userInfo.birthday }}</el-descriptions-item>
                                <el-descriptions-item label="手机">{{ userInfo.phone }}</el-descriptions-item>
                                <el-descriptions-item label="邮箱">{{ userInfo.email }}</el-descriptions-item>
                                <el-descriptions-item label="地址">{{ userInfo.location }}</el-descriptions-item>
                                <el-descriptions-item label="个性签名">{{ userInfo.bio }}</el-descriptions-item>
                            </el-descriptions>
                        </el-col>
                        <el-col :span="2">
                            <el-button @click="changeUserInfoDialogVisible = true">修改信息</el-button>
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
    <el-dialog v-model="changeAvatarDialogVisible" title="上传头像">
        <el-upload action="http://localhost:8080/user/uploadAvatar" :headers=headers accept=".jpg">
            <el-button type="primary">Click to upload</el-button>
            <template #tip>
                <div class="el-upload__tip">
                    jpg/png files with a size less than 500KB.
                </div>
            </template>
        </el-upload>
    </el-dialog>
    <el-dialog v-model="changeUserInfoDialogVisible" title="修改信息">

    </el-dialog>
</template>

<script>
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
            headers: {
                token: '',
            },
            activeName: 'favourite',
            changeAvatarDialogVisible: false,
            changeUserInfoDialogVisible: false
        }
    },
    mounted() {
        this.headers.token = this.$cookies.get('token')
        this.userInfo.username = sessionStorage.getItem('username')
        this.userInfo.nickname = sessionStorage.getItem('nickname')
        this.userInfo.gender = sessionStorage.getItem('gender')
        this.userInfo.birthday = sessionStorage.getItem('birthday')
        this.userInfo.phone = sessionStorage.getItem('phone')
        this.userInfo.email = sessionStorage.getItem('email')
        this.userInfo.location = sessionStorage.getItem('location')
        this.userInfo.bio = sessionStorage.getItem('bio')
    },
    methods: {

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
</style>