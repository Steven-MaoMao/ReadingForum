<template>
    <el-container>
        <el-header height="auto" style="padding: 20px;  ">
            <myHead :avatar="this.userInfo.avatar"></myHead>
        </el-header>
        <div class="container">
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
                            <el-col :span="2"
                                style="display: flex; flex-direction: column; justify-content: space-between;">
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
                        <el-tabs v-model="activeName" stretch @tab-change="handleTabChange">
                            <el-tab-pane label="我的收藏" name="favourite">
                                <div v-if="this.totalFavourite === 0">
                                    <el-empty />
                                </div>
                                <el-row v-else>
                                    <el-col>
                                        <ul class="favouriteList">
                                            <li class="favourite" type="none" v-for="favourite in favouriteList">
                                                <el-card @click="gotoBook(favourite.id)"
                                                    style="margin: 10px; height: 600px;"
                                                    :body-style="{ 'margin': '20px', 'padding': '0px', 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }">
                                                    <el-image :src="this.$http.defaults.baseURL + favourite.bookCover"
                                                        fit="cover" style="width: 100%; height: 250px;">
                                                    </el-image>
                                                    <el-descriptions size="small" :column=1 style="margin-left: 20px;">
                                                        <el-descriptions-item label="书名">{{ favourite.name
                                                        }}</el-descriptions-item>
                                                        <el-descriptions-item label="作者">{{ favourite.author
                                                        }}</el-descriptions-item>
                                                        <el-descriptions-item label="出版社">{{ favourite.publisher
                                                        }}</el-descriptions-item>
                                                        <el-descriptions-item label="标签">
                                                            <div style="display: flex; flex-direction: column;">
                                                                <el-tag v-for="tag in favourite.tags" :round="true"
                                                                    size="small">
                                                                    {{ tag.name }}
                                                                </el-tag>
                                                            </div>
                                                        </el-descriptions-item>
                                                    </el-descriptions>
                                                </el-card>
                                            </li>
                                        </ul>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <div style="flex-grow: 1; display: flex; justify-content: center;">
                                            <el-pagination background layout="prev, pager, next" :page-size=16
                                                :total=totalFavourite @current-change="favouriteCurrentChange" />
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                            <el-tab-pane label="我的关注" name="following">
                                <div v-if="this.totalFollowing === 0">
                                    <el-empty />
                                </div>
                                <el-row v-else v-for="following in followingList">
                                    <el-col :span="24">
                                        <el-card shadow="hover" class="following" @click="gotoUser(following.id)">
                                            <el-row style="width: 100%;">
                                                <el-col :span="2">
                                                    <el-avatar :size="50"
                                                        :src="this.$http.defaults.baseURL + following.avatar">
                                                        {{ following.username }}
                                                    </el-avatar>
                                                </el-col>
                                                <el-col :span="19" v-if="following.nickname">
                                                    {{ following.nickname }}
                                                </el-col>
                                                <el-col :span="19" v-else>
                                                    {{ following.username }}
                                                </el-col>
                                                <el-col :span="3">
                                                    <el-button type="danger" @click="deleteFollow(following.id)">取消关注</el-button>
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <div style="flex-grow: 1; display: flex; justify-content: center;">
                                            <el-pagination background layout="prev, pager, next" :page-size=10
                                                :total=totalFollowing @current-change="followingCurrentChange" />
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                            <el-tab-pane label="我的粉丝" name="follower">
                                <div v-if="this.totalFollower === 0">
                                    <el-empty />
                                </div>
                                <el-row v-else v-for="follower in followerList">
                                    <el-col :span="24">
                                        <el-card shadow="hover" class="following" @click="gotoUser(follower.id)">
                                            <el-row style="width: 100%;">
                                                <el-col :span="2">
                                                    <el-avatar :size="50"
                                                        :src="this.$http.defaults.baseURL + follower.avatar">
                                                        {{ follower.username }}
                                                    </el-avatar>
                                                </el-col>
                                                <el-col :span="19" v-if="follower.nickname">
                                                    {{ follower.nickname }}
                                                </el-col>
                                                <el-col :span="19" v-else>
                                                    {{ follower.username }}
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <div style="flex-grow: 1; display: flex; justify-content: center;">
                                            <el-pagination background layout="prev, pager, next" :page-size=10
                                                :total=totalFollower @current-change="followerCurrentChange" />
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
            </el-main>
        </div>
    </el-container>
    <el-dialog v-model="changeAvatarDialogVisible" title="上传头像" width="30%">
        <div class="dialog">
            <el-upload class="avatar-uploader" ref="uploadRef" action="http://localhost:8080/user/uploadAvatar"
                :headers=headers :show-file-list="false" accept=".png, .jpeg, .jpg, .gif, .PNG, .JPEG, .JPG, .GIF"
                :on-success="handleSuccess" :on-error="handleError" :on-exceed="handleExceed" :before-upload="beforeUpload"
                :limit=1>
                <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
            <span style="font-size: xx-small;">头像文件格式限制.png .jpeg .jpg .gif，大小限制2M</span>
        </div>
    </el-dialog>
    <el-dialog v-model="changeUserInfoDialogVisible" title="修改信息" width="40%"
        :before-close="beforeChangeUserInfoDialogClose">
        <div class="dialog">
            <el-row justify="center" style="width: 70%;">
                <el-col :span="24">
                    <el-form ref="changeUserInfoFormRef" :model="userInfo" :rules="changeUserInfoRules"
                        label-position="left" label-width="100px">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userInfo.username" disabled />
                        </el-form-item>
                        <el-form-item label="昵称" prop="nickname">
                            <el-input v-model="userInfo.nickname" />
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-radio-group v-model="userInfo.gender">
                                <el-radio label="男">男</el-radio>
                                <el-radio label="女">女</el-radio>
                                <el-radio :label=null>保密</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="生日" prop="birthday">
                            <el-date-picker v-model="userInfo.birthday" value-format="YYYY-MM-DD"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="手机" prop="phone">
                            <el-input v-model="userInfo.phone" />
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="userInfo.email" />
                        </el-form-item>
                        <el-form-item label="地址" prop="location">
                            <el-input v-model="userInfo.location" />
                        </el-form-item>
                        <el-form-item label="个性签名" prop="bio">
                            <el-input v-model="userInfo.bio" type="textarea" maxlength="80" show-word-limit />
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 100%;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onChangeUserInfo">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelChangeUserInfo">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
    <el-dialog v-model="changePasswordDialogVisible" title="修改密码" width="30%"
        :before-close="beforeChangePasswordDialogClose">
        <div class="dialog">
            <el-row justify="center" style="width: 70%;">
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
import myHead from '../components/myHead.vue'
export default {
    components: { myHead },
    data() {
        return {
            userInfo: {
                username: null,
                avatar: null,
                nickname: null,
                gender: null,
                birthday: null,
                phone: null,
                email: null,
                location: null,
                bio: null
            },
            changeUserInfoRules: {
                phone: [{ pattern: /^\d{11}$/, message: '手机号格式不正确', trigger: 'blur' }],
                email: [{ pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: 'Email格式不正确', trigger: 'blur' }],
            },
            changePasswordForm: {
                oldPassword: null,
                newPassword: null,
                reNewPassword: null
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
            favouriteList: [],
            totalFavourite: null,
            followingList: [],
            totalFollowing: null,
            followerList: [],
            totalFollower: null,
            headers: {
                token: null,
            },
            activeName: 'favourite',
            changeAvatarDialogVisible: false,
            changeUserInfoDialogVisible: false,
            changePasswordDialogVisible: false,
            avatarUrl: null
        }
    },
    async mounted() {
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
        const { data: favouriteRes } = await this.$http.get('/user/favouriteByPage?page=1')
        this.favouriteList = favouriteRes.data.bookList
        this.totalFavourite = favouriteRes.data.num
        const { data: followingRes } = await this.$http.get('/user/followingByPage?page=1')
        this.followingList = followingRes.data.userList
        this.totalFollowing = followingRes.data.num
        const { data: followerRes } = await this.$http.get('/user/followerByPage?page=1')
        this.followerList = followerRes.data.userList
        this.totalFollower = followerRes.data.num
    },
    methods: {
        handleTabChange(name) {
            console.log(name)
        },
        async favouriteCurrentChange(page) {
            const { data: res } = await this.$http.get('/user/favouriteByPage?page=' + page)
            this.favouriteList = res.data.bookList
            this.totalFavourite = res.data.num
        },
        async followingCurrentChange(page) {
            const { data: res } = await this.$http.get('/user/followingByPage?page=' + page)
            this.followingList = res.data.userList
            this.totalFollowing = res.data.num
        },
        async deleteFollow(followingId) {
            const { data: res } = await this.$http.delete('/user/deleteFollowing?followingId=' + followingId)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: followingRes } = await this.$http.get('/user/followingByPage?page=1')
                this.followingList = followingRes.data.userList
                this.totalFollowing = followingRes.data.num
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async followerCurrentChange(page) {
            const { data: res } = await this.$http.get('/user/followerByPage?page=' + page)
            this.followerList = res.data.userList
            this.totalFollower = res.data.num
        },
        gotoBook(id) {
            const url = String(window.location.href)
            const baseURL = url.split('/')[0]
            const newURL = baseURL + '/book?bookId=' + String(id)
            window.location.href = newURL
        },
        gotoUser(id) {
            const url = String(window.location.href)
            const baseURL = url.split('/')[0]
            const newURL = baseURL + '/user?userId=' + String(id)
            window.location.href = newURL
        },
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
            if (rawFile.type !== 'image/png' && rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/gif') {
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
        onChangeUserInfo() {
            this.$refs.changeUserInfoFormRef.validate(async (valid) => {
                if (!valid) return
                if (this.userInfo.nickname === '') this.userInfo.nickname = null
                if (this.userInfo.phone === '') this.userInfo.phone = null
                if (this.userInfo.email === '') this.userInfo.email = null
                if (this.userInfo.location === '') this.userInfo.location = null
                if (this.userInfo.bio === '') this.userInfo.bio = null
                const { data: res } = await this.$http.put('/user/updatePersonalInfo', this.userInfo)
                if (res.code === 1) {
                    ElMessage({
                        message: res.message,
                        type: 'success'
                    })
                    sessionStorage.setItem('nickname', JSON.stringify(this.userInfo.nickname))
                    sessionStorage.setItem('gender', JSON.stringify(this.userInfo.gender))
                    sessionStorage.setItem('birthday', JSON.stringify(this.userInfo.birthday))
                    sessionStorage.setItem('phone', JSON.stringify(this.userInfo.phone))
                    sessionStorage.setItem('email', JSON.stringify(this.userInfo.email))
                    sessionStorage.setItem('location', JSON.stringify(this.userInfo.location))
                    sessionStorage.setItem('bio', JSON.stringify(this.userInfo.bio))
                    this.changeUserInfoDialogVisible = false
                } else {
                    ElMessage({
                        message: res.message,
                        type: 'error'
                    })
                    this.onCancelChangeUserInfo()
                }
            })
        },
        onCancelChangeUserInfo() {
            this.userInfo.avatar = JSON.parse(sessionStorage.getItem('avatar'))
            this.userInfo.nickname = JSON.parse(sessionStorage.getItem('nickname'))
            this.userInfo.gender = JSON.parse(sessionStorage.getItem('gender'))
            this.userInfo.birthday = JSON.parse(sessionStorage.getItem('birthday'))
            this.userInfo.phone = JSON.parse(sessionStorage.getItem('phone'))
            this.userInfo.email = JSON.parse(sessionStorage.getItem('email'))
            this.userInfo.location = JSON.parse(sessionStorage.getItem('location'))
            this.userInfo.bio = JSON.parse(sessionStorage.getItem('bio'))
        },
        beforeChangeUserInfoDialogClose(done) {
            this.onCancelChangeUserInfo()
            done()
        },
        onChangePassword() {
            this.$refs.changePasswordFormRef.validate(async (valid) => {
                if (!valid) return
                this.changePasswordForm.oldPassword = this.$md5(this.changePasswordForm.oldPassword)
                this.changePasswordForm.newPassword = this.$md5(this.changePasswordForm.newPassword)
                this.changePasswordForm.reNewPassword = null
                const { data: res } = await this.$http.put('/user/updatePassword', this.changePasswordForm)
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
        beforeChangePasswordDialogClose(done) {
            this.onCancelChangePassword()
            done()
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
.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.el-main {
    width: 70%;
}

.block {
    margin: 20px;
    padding: 20px;
     
}

.favouriteList {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    margin: 0%;
    padding: 0%;
}

.favourite {
    width: 25%;
}

.following {
    margin: 10px;
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