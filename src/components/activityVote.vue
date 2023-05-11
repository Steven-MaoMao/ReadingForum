<template>
    <el-card style="margin: 10px;">
        <template #header>
            <el-row>
                <el-col :span="15" style="display: flex; align-items: center; font-weight: 600; font-size: larger;">
                    {{ this.vote.name }}
                </el-col>
                <el-col :span="2" @click="gotoUser(this.vote.user.id)">
                    <el-avatar :src="this.$http.defaults.baseURL + this.vote.user.avatar">{{
                        this.vote.user.username }}</el-avatar>
                </el-col>
                <el-col :span="3" style="display: flex; align-items: center;" @click="gotoUser(this.vote.user.id)">
                    <div v-if="this.vote.user.nickname !== null">{{ this.vote.user.nickname }}</div>
                    <div v-else>{{ this.vote.user.username }}</div>
                </el-col>
                <el-col :span="4" style="display: flex; align-items: center;">
                    {{ this.vote.time }}
                </el-col>
                <!-- <el-col :span="3" style="display: flex; align-items: center;">
                    <el-button @click="onChangeSubgroupVoteDialogVisible(index)">修改投票</el-button>
                </el-col>
                <el-col :span="3" style="display: flex; align-items: center;">
                    <el-button @click="deleteSubgroupVote(this.subgroupFrameId)" type="danger">删除投票</el-button>
                </el-col> -->
            </el-row>
        </template>
        <el-row justify="center">
            <el-col :span="21">
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
                        赞成
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
                        反对
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
                <el-button type="primary" :disabled="isDisabled(this.vote.voterList)"
                    @click="voteYes(this.vote.id)">赞成</el-button>
            </el-col>
            <el-col :span="8" style="display: flex; justify-content: center;">
                <el-button type="danger" :disabled="isDisabled(this.vote.voterList)"
                    @click="voteNo(this.vote.id)">反对</el-button>
            </el-col>
        </el-row>
        <el-divider />
        <el-row>
            <el-col :offset="1" :span="10">
                <el-input v-model="newComment"></el-input>
            </el-col>
            <el-col :offset="1" :span="2">
                <el-button type="primary" @click="this.onComment">留言</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-card style="margin: 10px; margin-top: 30px; border-radius: 20px;" v-for="notice in noticeList">
                    <template #header>
                        <el-row>
                            <!-- <el-col :span="12" style="display: flex; align-items: center; font-weight: 600; font-size: larger;">
                                {{ notice.title }}
                            </el-col> -->
                            <el-col :span="2" @click="gotoUser(notice.user.id)">
                                <el-avatar :src="this.$http.defaults.baseURL + notice.user.avatar">{{
                                    notice.user.username }}</el-avatar>
                            </el-col>
                            <el-col :span="18" style="display: flex; align-items: center;"
                                @click="gotoUser(notice.user.id)">
                                <div v-if="notice.user.nickname !== null">{{ notice.user.nickname }}</div>
                                <div v-else>{{ notice.user.username }}</div>
                            </el-col>
                            <el-col :span="4" style="display: flex; align-items: center;">
                                {{ notice.time }}
                            </el-col>
                        </el-row>
                    </template>
                    <el-row>
                        <el-col>
                            {{ notice.text }}
                        </el-col>
                    </el-row>
                    <!-- <el-divider />
                    <el-row>
                        <el-col :span="4">
                            <el-button :disabled="this.userId != this.subgroupNoticeList[index].userId"
                                @click="onChangeSubgroupNoticeDialogVisible(index)">修改公告</el-button>
                        </el-col>
                        <el-col :span="4">
                            <el-button :disabled="this.userId != this.subgroupNoticeList[index].userId" type="danger"
                                @click="onDeleteSubgroupNotice(this.subgroupFrameId)">删除公告</el-button>
                        </el-col>
                    </el-row> -->
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
    props: ['subgroupId', 'moduleName', 'subgroupModuleId', 'subgroupFrameId'],
    data() {
        return {
            userId: null,
            noticeList: [],
            vote: {
                user: {},
            },
            newComment: null
        }
    },
    async mounted() {
        this.userId = JSON.parse(sessionStorage.getItem('id'))
        const { data: noticeListRes } = await this.$http.get('/subgroup/getSubgroupNotice?id=' + this.subgroupFrameId)
        this.noticeList = noticeListRes.data.subgroupNoticeList
        const { data: subgroupVoteListRes } = await this.$http.get('/subgroup/getSubgroupVote?subgroupModuleId=' + String(this.subgroupFrameId))
        this.vote = subgroupVoteListRes.data.subgroupVoteList[0]
    },
    methods: {
        gotoUser(id) {
            const url = String(window.location.href)
            const baseURL = url.split('/')[0]
            const newURL = baseURL + '/user?userId=' + String(id)
            window.location.href = newURL
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
        async onComment() {
            const { data: res } = await this.$http.post('/subgroup/newComment?comment=' + this.newComment + '&subgroupFrameId=' + this.subgroupFrameId)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: noticeListRes } = await this.$http.get('/subgroup/getSubgroupNotice?id=' + this.subgroupFrameId)
                this.noticeList = noticeListRes.data.subgroupNoticeList
                this.newComment = null
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

.title {
    color: white;
    border-radius: 20px;
    margin-bottom: 20px;
}
</style>