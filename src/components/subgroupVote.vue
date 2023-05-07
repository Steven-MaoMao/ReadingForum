<template>
    <el-row justify="space-between">
        <el-col :span="4">
            <el-button type="primary" size="large" style="margin: 10px;" @click="createSubgroupVoteDialogVisible = true">
                <el-icon>
                    <Plus />
                </el-icon>
                <span>
                    发起投票
                </span>
            </el-button>
        </el-col>
        <el-col :span="5">
            <el-button type="primary" size="large" style="margin: 10px;"
                @click="changeSubgroupModuleNameDialogVisible = true">
                <el-icon>
                    <EditPen />
                </el-icon>
                <span>
                    组件改名
                </span>
            </el-button>
        </el-col>
    </el-row>
    <el-divider />
    <el-row v-for="(subgroupVote, index) in subgroupVoteList">
        <el-col>
            <el-card style="margin: 10px;">
                <template #header>
                    <el-row>
                        <el-col :span="9" style="display: flex; align-items: center; font-weight: 600; font-size: larger;">
                            {{ subgroupVote.name }}
                        </el-col>
                        <el-col :span="2" @click="gotoUser(subgroupVote.user.id)">
                            <el-avatar :src="this.$http.defaults.baseURL + subgroupVote.user.avatar">{{
                                subgroupVote.user.username }}</el-avatar>
                        </el-col>
                        <el-col :span="3" style="display: flex; align-items: center;"
                            @click="gotoUser(subgroupVote.user.id)">
                            <div v-if="subgroupVote.user.nickname !== null">{{ subgroupVote.user.nickname }}</div>
                            <div v-else>{{ subgroupVote.user.username }}</div>
                        </el-col>
                        <el-col :span="4" style="display: flex; align-items: center;">
                            {{ subgroupVote.time }}
                        </el-col>
                        <el-col :span="3" style="display: flex; align-items: center;">
                            <el-button @click="onChangeSubgroupVoteDialogVisible(index)">修改投票</el-button>
                        </el-col>
                        <el-col :span="3" style="display: flex; align-items: center;">
                            <el-button @click="deleteSubgroupVote(subgroupVote.id)" type="danger">删除投票</el-button>
                        </el-col>
                    </el-row>
                </template>
                <el-row>
                    <el-col>
                        {{ subgroupVote.description }}
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
                        <div v-for="voter in subgroupVote.voterList" style="margin: 10px;">
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
                        <div v-for="voter in subgroupVote.voterList" style="margin: 10px;">
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
                        <div v-for="voter in subgroupVote.voterList" style="margin: 10px;">
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
                        <el-button type="primary" :disabled="isDisabled(subgroupVote.voterList)"
                            @click="voteYes(subgroupVote.id)">赞成</el-button>
                    </el-col>
                    <el-col :span="8" style="display: flex; justify-content: center;">
                        <el-button type="danger" :disabled="isDisabled(subgroupVote.voterList)"
                            @click="voteNo(subgroupVote.id)">反对</el-button>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
    <el-dialog v-model="createSubgroupVoteDialogVisible" title="发起投票" width="40%"
        :before-close="beforeCreateSubgroupVoteDialogClose">
        <div class="dialog">
            <el-row justify="center" style="width: 90%; margin-bottom: 20px;">
                <el-col :span="2">
                    标题：
                </el-col>
                <el-col :span="22">
                    <el-input v-model="this.newSubgroupVote.name"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 90%; margin-bottom: 20px;">
                <el-col :span="2">
                    描述：
                </el-col>
                <el-col :span="22">
                    <el-input v-model="this.newSubgroupVote.description" type="textarea"></el-input>
                </el-col>
            </el-row>
            <el-transfer v-model="this.newSubgroupVote.voter" :props="{
                key: 'id',
                label: 'username',
            }" :data="this.subgroupMember" :titles="['小组成员', '可投票成员']" />
            <el-row justify="center" style="width: 100%; margin-top: 20px;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onCreateSubgroupVote">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelCreateSubgroupVote">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
    <el-dialog v-model="changeSubgroupModuleNameDialogVisible" title="组件改名" width="30%"
        :before-close="beforeChangeSubgroupModuleNameDialogClose">
        <div class="dialog">
            <el-row justify="center" style="width: 70%; margin-bottom: 20px;">
                <el-col :span="6">
                    组件名：
                </el-col>
                <el-col :span="18">
                    <el-input v-model="this.newSubgroupModuleName"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 100%;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onChangeSubgroupModuleName">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelChangeSubgroupModuleName">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
    <el-dialog v-model="changeSubgroupVoteDialogVisible" title="修改投票" width="30%"
        :before-close="beforeChangeSubgroupVoteDialogClose">
        <div class="dialog">
            <el-row justify="center" style="width: 70%; margin-bottom: 20px;">
                <el-col :span="4">
                    标题：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newVoteName"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 70%; margin-bottom: 20px;">
                <el-col :span="4">
                    描述：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newVoteDescription" type="textarea"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 100%;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onUpdateSubgroupVote">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelUpdateSubgroupVote">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
    props: ['subgroupId', 'moduleName', 'subgroupModuleId'],
    data() {
        return {
            userId: null,
            createSubgroupNoticeDialogVisible: false,
            changeSubgroupModuleNameDialogVisible: false,
            newSubgroupModuleName: null,
            subgroupVoteList: [],
            buttonDisabled: true,
            selectedIndex: null,
            createSubgroupVoteDialogVisible: false,
            newVoteName: null,
            newVoteDescription: null,
            newSubgroupVote: {
                name: null,
                description: null,
                voter: []
            },
            subgroupMember: [],
            groupId: null
        }
    },
    async mounted() {
        this.groupId = this.$route.query.groupId
        this.userId = JSON.parse(sessionStorage.getItem('id'))
        this.newSubgroupModuleName = this.moduleName
        const { data: subgroupVoteListRes } = await this.$http.get('/subgroup/getSubgroupVote?subgroupModuleId=' + String(this.subgroupModuleId))
        this.subgroupVoteList = subgroupVoteListRes.data.subgroupVoteList
        const { data: subgroupListRes } = await this.$http.get('/subgroup/getSubgroup?groupId=' + String(this.groupId))
        for (const index in subgroupListRes.data.subgroupList) {
            if (subgroupListRes.data.subgroupList[index].id == this.subgroupId) {
                this.subgroupMember = subgroupListRes.data.subgroupList[index].subgroupMember
                break
            }
        }
    },
    async updated() {

    },
    methods: {
        beforeChangeSubgroupModuleNameDialogClose() {
            this.onCancelChangeSubgroupModuleName()
            this.changeSubgroupModuleNameDialogVisible = false
        },
        async onChangeSubgroupModuleName() {
            const { data: res } = await this.$http.put('/subgroup/updateSubgroupModuleName?id=' + this.subgroupModuleId + '&name=' + this.newSubgroupModuleName)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.beforeChangeSubgroupModuleNameDialogClose()
                this.$router.go(0)
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCancelChangeSubgroupModuleName() {
            this.newSubgroupModuleName = this.moduleName
        },
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
                const { data: subgroupVoteListRes } = await this.$http.get('/subgroup/getSubgroupVote?subgroupModuleId=' + String(this.subgroupModuleId))
                this.subgroupVoteList = subgroupVoteListRes.data.subgroupVoteList
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
                const { data: subgroupVoteListRes } = await this.$http.get('/subgroup/getSubgroupVote?subgroupModuleId=' + String(this.subgroupModuleId))
                this.subgroupVoteList = subgroupVoteListRes.data.subgroupVoteList
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async deleteSubgroupVote(id) {
            const { data: res } = await this.$http.delete('/subgroup/deleteSubgroupVote?id=' + id)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: subgroupVoteListRes } = await this.$http.get('/subgroup/getSubgroupVote?subgroupModuleId=' + String(this.subgroupModuleId))
                this.subgroupVoteList = subgroupVoteListRes.data.subgroupVoteList
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onChangeSubgroupVoteDialogVisible(index) {
            this.selectedIndex = index
            this.newVoteName = this.subgroupVoteList[index].name
            this.newVoteDescription = this.subgroupVoteList[index].description
            this.changeSubgroupVoteDialogVisible = true
        },
        beforeChangeSubgroupVoteDialogClose() {
            this.selectedIndex = null
            this.newVoteName = null
            this.newVoteDescription = null
            this.changeSubgroupVoteDialogVisible = false
        },
        async onUpdateSubgroupVote() {
            this.subgroupVoteList[this.selectedIndex].name = this.newVoteName
            this.subgroupVoteList[this.selectedIndex].description = this.newVoteDescription
            const { data: res } = await this.$http.put('/subgroup/updateSubgroupVote', this.subgroupVoteList[this.selectedIndex])
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: subgroupVoteListRes } = await this.$http.get('/subgroup/getSubgroupVote?subgroupModuleId=' + String(this.subgroupModuleId))
                this.subgroupVoteList = subgroupVoteListRes.data.subgroupVoteList
                this.beforeChangeSubgroupVoteDialogClose()
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCancelUpdateSubgroupVote() {
            this.newVoteName = this.subgroupVoteList[this.selectedIndex].name
            this.newVoteDescription = this.subgroupVoteList[this.selectedIndex].description
        },
        beforeCreateSubgroupVoteDialogClose() {
            this.onCancelCreateSubgroupVote()
            this.createSubgroupVoteDialogVisible = false
        },
        async onCreateSubgroupVote() {
            const { data: res } = await this.$http.post('/subgroup/createSubgroupVote?name=' + String(this.newSubgroupVote.name) + '&description=' + String(this.newSubgroupVote.description) + '&subgroupModuleId=' + String(this.subgroupModuleId), this.newSubgroupVote.voter)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: subgroupVoteListRes } = await this.$http.get('/subgroup/getSubgroupVote?subgroupModuleId=' + String(this.subgroupModuleId))
                this.subgroupVoteList = subgroupVoteListRes.data.subgroupVoteList
                this.beforeCreateSubgroupVoteDialogClose()
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCancelCreateSubgroupVote() {
            this.newSubgroupVote = {
                name: null,
                description: null,
                voter: []
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