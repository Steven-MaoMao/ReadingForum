<template>
    <el-container>
        <el-header height="auto" style="padding: 20px; box-shadow: var(--el-box-shadow-lighter);">
            <myHead></myHead>
        </el-header>
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
                                <el-button @click="changeAvatarDialogVisible = true">上传头像</el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-main>
        </div>
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
</template>

<script>
import myHead from '../components/myHead.vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
export default {
    components: { myHead },
    data() {
        return {
            groupId: null,
            groupManager: false,
            groupInfo: {},
            changeAvatarDialogVisible: false,
            headers: {
                token: null,
            },
        }
    },
    async mounted() {
        this.headers.token = JSON.parse(sessionStorage.getItem('token'))
        this.groupId = sessionStorage.getItem('groupId')
        this.groupManager = sessionStorage.getItem('groupManager')
        const { data: groupInfoRes } = await this.$http.get('/group/selectById?groupId=' + String(this.groupId))
        this.groupInfo = groupInfoRes.data.groupInfo
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