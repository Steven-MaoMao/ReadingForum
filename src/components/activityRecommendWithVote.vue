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
        <el-divider />
        <el-row>
            <el-col :span="4" :offset="2" style="font-size: larger; font-weight: 500;">
                投票标题：
            </el-col>
            <el-col :span="18">
                {{ this.vote.name }}
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
            <el-col :span="4" :offset="2" style="font-size: larger; font-weight: 500;">
                投票描述：
            </el-col>
            <el-col :span="18">
                {{ this.vote.description }}
            </el-col>
        </el-row>
        <el-row justify="space-evenly" style="margin-top: 20px;">
            <el-col :span="6">
                <el-row justify="center" class="title" style="background-color: #409EFF;">
                    <el-col :span="3">
                        <el-icon>
                            <Check />
                        </el-icon>
                    </el-col>
                    <el-col :span="5">
                        {{ this.vote.yesWord }}
                    </el-col>
                </el-row>
                <div v-for="voter in this.vote.voterList" style="margin: 10px;">
                    <el-row v-if="voter.state == '赞成'" justify="center">
                        <el-col :span="8">
                            <el-avatar :src="this.$http.defaults.baseURL + voter.user.avatar">{{
                                voter.user.username }}</el-avatar>
                        </el-col>
                        <el-col style="display: flex; align-items: center;" :span="9" v-if="voter.nickname">
                            {{ voter.user.nickname }}
                        </el-col>
                        <el-col style="display: flex; align-items: center;" :span="9" v-else>
                            {{ voter.user.username }}
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="6">
                <el-row justify="center" class="title" style="background-color: #909399;">
                    <el-col :span="3">
                        <el-icon>
                            <Switch />
                        </el-icon>
                    </el-col>
                    <el-col :span="7">
                        待投票
                    </el-col>
                </el-row>
                <div v-for="voter in this.vote.voterList" style="margin: 10px;">
                    <el-row v-if="voter.state == '待投票'" justify="center">
                        <el-col :span="8">
                            <el-avatar :src="this.$http.defaults.baseURL + voter.user.avatar">{{
                                voter.user.username }}</el-avatar>
                        </el-col>
                        <el-col style="display: flex; align-items: center;" :span="9" v-if="voter.nickname">
                            {{ voter.user.nickname }}
                        </el-col>
                        <el-col style="display: flex; align-items: center;" :span="9" v-else>
                            {{ voter.user.username }}
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="6">
                <el-row justify="center" class="title" style="background-color: #F56C6C;">
                    <el-col :span="3">
                        <el-icon>
                            <Close />
                        </el-icon>
                    </el-col>
                    <el-col :span="5">
                        {{ this.vote.noWord }}
                    </el-col>
                </el-row>
                <div v-for="voter in this.vote.voterList" style="margin: 10px;">
                    <el-row v-if="voter.state == '反对'" justify="center">
                        <el-col :span="8">
                            <el-avatar :src="this.$http.defaults.baseURL + voter.user.avatar">{{
                                voter.user.username }}</el-avatar>
                        </el-col>
                        <el-col style="display: flex; align-items: center;" :span="9" v-if="voter.nickname">
                            {{ voter.user.nickname }}
                        </el-col>
                        <el-col style="display: flex; align-items: center;" :span="9" v-else>
                            {{ voter.user.username }}
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row justify="center" style="margin-top: 20px;">
            <el-col :span="8" style="display: flex; justify-content: center;">
                <el-button type="primary" :disabled="isDisabled(this.vote.voterList)" @click="voteYes(this.vote.id)">{{
                    this.vote.yesWord }}</el-button>
            </el-col>
            <el-col :span="8" style="display: flex; justify-content: center;">
                <el-button type="danger" :disabled="isDisabled(this.vote.voterList)" @click="voteNo(this.vote.id)">{{
                    this.vote.noWord }}</el-button>
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
            userInfo: {},
            vote: {
                user: {},
                yesWord: null,
                noWord: null
            },
        }
    },
    async mounted() {
        this.userId = JSON.parse(sessionStorage.getItem('id'))
        this.frame = this.subgroupFrame
        this.activityRecommendPic = this.frame.text.split("@")[0]
        this.textList = this.frame.text.split("@").slice(1)
        const { data: res } = await this.$http.get('/user/userInfoById?userId=' + this.subgroupFrame.userId)
        this.userInfo = res.data.userInfo
        const { data: subgroupVoteListRes } = await this.$http.get('/subgroup/getSubgroupVote?subgroupModuleId=' + String(this.subgroupFrameId))
        this.vote = subgroupVoteListRes.data.subgroupVoteList[0]
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
        },
        isDisabled(voterList) {
            for (const index in voterList) {
                if (voterList[index].user.id == this.userId && voterList[index].state == '待投票') {
                    return false
                }
            }
            return true
        },
        async voteYes(subgroupVoteId) {
            const { data: res } = await this.$http.put('/subgroup/voteYes?id=' + subgroupVoteId)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: subgroupVoteListRes } = await this.$http.get('/subgroup/getSubgroupVote?subgroupModuleId=' + String(this.subgroupFrameId))
                this.vote = subgroupVoteListRes.data.subgroupVoteList[0]
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async voteNo(subgroupVoteId) {
            const { data: res } = await this.$http.put('/subgroup/voteNo?id=' + subgroupVoteId)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: subgroupVoteListRes } = await this.$http.get('/subgroup/getSubgroupVote?subgroupModuleId=' + String(this.subgroupFrameId))
                this.vote = subgroupVoteListRes.data.subgroupVoteList[0]
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
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