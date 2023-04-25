<template>
    <el-container>
        <el-header height="auto" style="padding: 20px; box-shadow: var(--el-box-shadow-lighter);">
            <myHead :avatar="avatar"></myHead>
        </el-header>
        <div class="notice">
            <marquee behavior="scroll" direction="left" scrollamount="5">
                社团公告：{{ this.groupInfo.notice }}
            </marquee>
        </div>
        <el-container>
            <el-aside width="350px" style="margin-top: 20px;">
                <div class="container">
                    <el-row class="block" style="width: 90%;">
                        <el-col>
                            <el-card shadow="never">
                                <template #header>
                                    <div>
                                        <span style="font-size: larger; font-weight: 600;">Group Members</span>
                                    </div>
                                </template>
                                <el-row v-for="user in groupMember" :key="user">
                                    <el-col :span="6">
                                        <el-avatar :src="this.$http.defaults.baseURL + user.avatar">{{
                                            user.username
                                        }}</el-avatar>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-link :href="this.baseLocation + '/user?userId=' + String(user.id)"
                                            v-if="user.nickname" style="height: 100%;">{{ user.nickname }}</el-link>
                                        <el-link :href="this.baseLocation + '/user?userId=' + String(user.id)" v-else
                                            style="height: 100%;">{{
                                                user.username }}</el-link>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button @click="setGroupManager(user.id)" v-if="user.groupManager === false"
                                            style="height: 100%;"
                                            :disabled="this.groupInfo.createUser !== this.userId || user.id === this.groupInfo.createUser">
                                            <el-icon>
                                                <Star />
                                            </el-icon>
                                        </el-button>
                                        <el-button type="primary" @click="dismissGroupManager(user.id)" v-else
                                            style="height: 100%;"
                                            :disabled="this.groupInfo.createUser !== this.userId || user.id === this.groupInfo.createUser">
                                            <el-icon>
                                                <StarFilled />
                                            </el-icon>
                                        </el-button>
                                    </el-col>
                                    <el-divider />
                                </el-row>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </el-aside>
            <div class="container">
                <el-main>
                    <el-row class="block">
                        <el-col>
                            <el-row justify="center" style="margin-bottom: 40px;">
                                <el-col :span="20">
                                    <el-avatar :size="100" shape="square" fit="cover"
                                        :src="this.$http.defaults.baseURL + this.groupInfo.avatar">
                                        {{ this.groupInfo.username }}
                                    </el-avatar>
                                </el-col>
                                <el-col :span="2">
                                    <el-button @click="changeAvatarDialogVisible = true"
                                        :disabled="!this.groupManager">上传头像</el-button>
                                </el-col>
                            </el-row>
                            <el-row justify="center">
                                <el-col :span="20">
                                    <el-descriptions title="社团信息">
                                        <el-descriptions-item label="社团名">{{ groupInfo.name }}</el-descriptions-item>
                                        <el-descriptions-item label="创建人" v-if="groupInfo.nickname">{{ groupInfo.nickname
                                        }}</el-descriptions-item>
                                        <el-descriptions-item label="创建人" v-else>{{ groupInfo.username
                                        }}</el-descriptions-item>
                                        <el-descriptions-item label="创建时间">{{ groupInfo.createTime }}</el-descriptions-item>
                                        <el-descriptions-item label="社团简介">{{ groupInfo.introduction
                                        }}</el-descriptions-item>
                                    </el-descriptions>
                                </el-col>
                                <el-col :span="2"
                                    style="display: flex; flex-direction: column; justify-content: space-between;">
                                    <el-row>
                                        <el-col>
                                            <el-button @click="changeGroupIntroductionDialogVisible = true"
                                                :disabled="!this.groupManager">修改简介</el-button>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col>
                                            <el-button type="danger" @click="dropout"
                                                :disabled="this.groupInfo.createUser === this.userId">退出社团</el-button>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col>
                                            <el-button type="danger" @click="dissolve"
                                                :disabled="this.groupInfo.createUser !== this.userId">解散社团</el-button>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-main>
            </div>
        </el-container>
    </el-container>
    <el-dialog v-model="changeAvatarDialogVisible" title="上传头像" width="30%">
        <div class="dialog">
            <el-upload class="avatar-uploader" ref="uploadRef" action="http://localhost:8080/group/uploadAvatar"
                :headers=headers :show-file-list="false" accept=".png, .jpeg, .jpg, .gif, .PNG, .JPEG, .JPG, .GIF"
                :on-success="handleSuccess" :on-error="handleError" :on-exceed="handleExceed" :before-upload="beforeUpload"
                :limit=1>
                <img v-if="this.groupInfo.avatar" :src="this.$http.defaults.baseURL + this.groupInfo.avatar"
                    class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
            <span style="font-size: xx-small;">头像文件格式限制.png .jpeg .jpg .gif，大小限制2M</span>
        </div>
    </el-dialog>
    <el-dialog v-model="changeGroupIntroductionDialogVisible" title="修改简介" width="30%">
        <div class="dialog">
            <el-row justify="center" style="width: 70%;">
                <el-col :span="6">
                    <div style="margin-bottom: 20px;">社团简介</div>
                </el-col>
                <el-col :span="18">
                    <el-input type="textarea" v-model="this.newIntroduction" />
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 100%; margin-top: 20px;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onChangeIntroduction">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelChangeIntroduction">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
import myHead from '../components/myHead.vue'
import { Plus, Star, StarFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
export default {
    components: { myHead },
    data() {
        return {
            userId: JSON.parse(sessionStorage.getItem('id')),
            groupId: null,
            groupManager: false,
            groupInfo: {},
            changeAvatarDialogVisible: false,
            changeGroupIntroductionDialogVisible: false,
            headers: {
                token: null,
            },
            avatar: JSON.parse(sessionStorage.getItem('avatar')),
            userId: null,
            newIntroduction: null,
            groupMember: [],
            baseLocation: null
        }
    },
    async mounted() {
        this.headers.token = JSON.parse(sessionStorage.getItem('token'))
        this.groupId = JSON.parse(sessionStorage.getItem('groupId'))
        this.groupManager = JSON.parse(sessionStorage.getItem('groupManager'))
        const { data: groupInfoRes } = await this.$http.get('/group/selectById?groupId=' + String(this.groupId))
        this.groupInfo = groupInfoRes.data.groupInfo
        this.userId = JSON.parse(sessionStorage.getItem('id'))
        this.newIntroduction = this.groupInfo.introduction
        const { data: groupMemberRes } = await this.$http.get('/user/groupMember')
        this.groupMember = groupMemberRes.data.userList
        this.baseLocation = String(window.location.href).split('/')[0]
    },
    methods: {
        handleSuccess(responce, uploadFile, uploadFiles) {
            if (responce.code === 1) {
                ElMessage({
                    message: '上传成功！',
                    type: 'success'
                })
                this.groupInfo.avatar = responce.data.path
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
        async dropout() {
            const { data: res } = await this.$http.put('/user/quitGroup')
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
            sessionStorage.setItem('groupId', JSON.stringify(0))
            sessionStorage.setItem('groupManager', JSON.stringify(0))
            this.$router.push('/')
        },
        async dissolve() {
            const { data: res } = await this.$http.delete('/group/dissolveGroup')
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
            sessionStorage.setItem('groupId', JSON.stringify(0))
            sessionStorage.setItem('groupManager', JSON.stringify(0))
            this.$router.push('/')
        },
        async onChangeIntroduction() {
            this.groupInfo.introduction = this.newIntroduction
            const { data: res } = await this.$http.put('/group/uploadGroup', this.groupInfo)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.changeGroupIntroductionDialogVisible = false
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCancelChangeIntroduction() {
            this.newIntroduction = this.groupInfo.introduction
        },
        async setGroupManager(id) {
            const { data: res } = await this.$http.put('/user/setGroupManager?userId=' + String(id))
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                for (var member in this.groupMember) {
                    if (this.groupMember[member].id === id) {
                        this.groupMember[member].groupManager = true
                        break
                    }
                }
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async dismissGroupManager(id) {
            const { data: res } = await this.$http.put('/user/dismissGroupManager?userId=' + String(id))
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                for (var member in this.groupMember) {
                    if (this.groupMember[member].id === id) {
                        this.groupMember[member].groupManager = false
                        break
                    }
                }
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        }
    }
}
</script>

<style scoped>
.notice {
    margin-top: 20px;
    padding: 10px;
    font-size: larger;
    box-shadow: var(--el-box-shadow-lighter);
}

.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.el-main {
    width: 100%;
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