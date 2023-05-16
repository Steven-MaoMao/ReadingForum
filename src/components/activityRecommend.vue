<template>
    <el-card style="margin: 10px;">
        <template #header>
            <el-row @click="gotoUser(frame.userId)">
                <el-col :span="2" style="display: flex; align-items: center;">
                    <el-avatar :src="this.$http.defaults.baseURL + userInfo.avatar">{{
                        userInfo.username }}</el-avatar>
                </el-col>
                <el-col :span="18" v-if="userInfo.nickname"
                    style="display: flex; align-items: center; font-size: large; font-weight: 600;">
                    {{ userInfo.nickname }}
                </el-col>
                <el-col :span="18" v-else style="display: flex; align-items: center;">
                    {{ userInfo.username }}
                </el-col>
                <el-col :span="4" style="display: flex; align-items: center;">
                    {{ frame.time }}
                </el-col>
            </el-row>
        </template>
        <el-row>
            <el-col :span="6">
                <el-image :src="this.$http.defaults.baseURL + this.activityRecommendPic" fit="cover"
                    style="width: 100%; height: 250px;">
                </el-image>
            </el-col>
            <el-col :span="17" :offset="1">
                <el-row>
                    <el-col>
                        <div v-for="text in this.textList" style="margin-bottom: 20px;">
                            <el-row style="font-size: larger; font-weight: 600;">{{ text.split('$')[0] }}:</el-row>
                            <el-row>{{ text.split('$')[1] }}</el-row>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 20px;">
                    <!-- <el-col :span="6">
                        <el-button :disabled="frame.userId != this.userId"
                            @click="onUpdateBookRecommendDialogVisible(index)">修改书籍推荐</el-button>
                    </el-col> -->
                    <el-col :span="6">
                        <el-button :disabled="frame.userId != this.userId" @click="onDeleteFrame(this.subgroupFrameId)"
                            type="danger">删除书籍推荐</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
    props: ['subgroupId', 'moduleName', 'subgroupModuleId', 'subgroupFrameId', 'subgroupFrame'],
    data() {
        return {
            userId: null,
            frame: {
                time: null,
            },
            activityRecommendPic: null,
            textList: [],
            userInfo: {}
        }
    },
    async mounted() {
        this.userId = JSON.parse(sessionStorage.getItem('id'))
        this.frame = this.subgroupFrame
        this.activityRecommendPic = this.frame.text.split("@")[0]
        this.textList = this.frame.text.split("@").slice(1)
        const { data: res } = await this.$http.get('/user/userInfoById?userId=' + this.subgroupFrame.userId)
        this.userInfo = res.data.userInfo
        console.log(this.userInfo)
    },
    methods: {
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
        async onDeleteFrame(id) {
            const { data: res } = await this.$http.delete('/subgroup/deleteSubgroupFrame?id=' + id)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.$router.go(0)
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
.dialog {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>