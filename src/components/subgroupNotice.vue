<template>
    <!-- <el-row justify="space-between">
        <el-col :span="4">
            <el-button type="primary" size="large" style="margin: 10px;"
                @click="onCreateSubgroupNoticeDialogVisible(index)">
                <el-icon>
                    <Plus />
                </el-icon>
                <span>
                    新公告
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
    <el-divider /> -->
    <el-row v-for="(subgroupNotice, index) in subgroupNoticeList">
        <el-col>
            <el-card style="margin: 10px;">
                <template #header>
                    <el-row>
                        <el-col :span="14" style="display: flex; align-items: center; font-weight: 600; font-size: larger;">
                            {{ subgroupNotice.title }}
                        </el-col>
                        <el-col :span="2" @click="gotoUser(subgroupNotice.user.id)">
                            <el-avatar :src="this.$http.defaults.baseURL + subgroupNotice.user.avatar">{{
                                subgroupNotice.user.username }}</el-avatar>
                        </el-col>
                        <el-col :span="4" style="display: flex; align-items: center;"
                            @click="gotoUser(subgroupNotice.user.id)">
                            <div v-if="subgroupNotice.user.nickname !== null">{{ subgroupNotice.user.nickname }}</div>
                            <div v-else>{{ subgroupNotice.user.username }}</div>
                        </el-col>
                        <el-col :span="4" style="display: flex; align-items: center;">
                            {{ subgroupNotice.time }}
                        </el-col>
                    </el-row>
                </template>
                <el-row>
                    <el-col>
                        {{ subgroupNotice.text }}
                    </el-col>
                </el-row>
                <el-divider />
                <el-row>
                    <el-col :span="4">
                        <el-button :disabled="this.userId != this.subgroupNoticeList[index].userId"
                            @click="onChangeSubgroupNoticeDialogVisible(index)">修改公告</el-button>
                    </el-col>
                    <el-col :span="4">
                        <el-button :disabled="this.userId != this.subgroupNoticeList[index].userId" type="danger"
                            @click="onDeleteSubgroupNotice(this.subgroupFrameId)">删除公告</el-button>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
    <el-dialog v-model="createSubgroupNoticeDialogVisible" title="新公告" width="30%"
        :before-close="beforeCreateSubgroupNoticeDialogClose">
        <div class="dialog">
            <el-row justify="center" style="width: 70%; margin-bottom: 20px;">
                <el-col :span="4">
                    标题：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newTitle"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 70%; margin-bottom: 20px;">
                <el-col :span="4">
                    内容：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newText" type="textarea"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 100%;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onCreateSubgroupNotice">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelCreateSubgroupNotice">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
    <el-dialog v-model="changeSubgroupNoticeDialogVisible" title="修改公告" width="30%"
        :before-close="beforeChangeSubgroupNoticeDialogClose">
        <div class="dialog">
            <el-row justify="center" style="width: 70%; margin-bottom: 20px;">
                <el-col :span="4">
                    标题：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newTitle"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 70%; margin-bottom: 20px;">
                <el-col :span="4">
                    内容：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newText" type="textarea"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 100%;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onUpdateSubgroupNotice">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelUpdateSubgroupNotice">取消</el-button>
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
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
    props: ['subgroupId', 'moduleName', 'subgroupModuleId', 'subgroupFrameId'],
    data() {
        return {
            subgroupNoticeList: [],
            createSubgroupNoticeDialogVisible: false,
            changeSubgroupNoticeDialogVisible: false,
            changeSubgroupModuleNameDialogVisible: false,
            updateIndex: null,
            newTitle: null,
            newText: null,
            userId: null,
            newSubgroupModuleName: null
        }
    },
    async mounted() {
        this.userId = JSON.parse(sessionStorage.getItem('id'))
        this.newSubgroupModuleName = this.moduleName
        const { data: res } = await this.$http.get('/subgroup/getSubgroupNotice?id=' + this.subgroupFrameId)
        this.subgroupNoticeList = res.data.subgroupNoticeList
    },
    async updated() {
        //this.newSubgroupModuleName = this.moduleName
        const { data: res } = await this.$http.get('/subgroup/getSubgroupNotice?id=' + this.subgroupFrameId)
        this.subgroupNoticeList = res.data.subgroupNoticeList
    },
    methods: {
        gotoUser(id) {
            const url = String(window.location.href)
            const baseURL = url.split('/')[0]
            const newURL = baseURL + '/user?userId=' + String(id)
            window.location.href = newURL
        },
        async onDeleteSubgroupNotice(id) {
            const { data: res } = await this.$http.delete('/subgroup/deleteSubgroupNotice?id=' + id)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: res1 } = await this.$http.get('/subgroup/getSubgroupNotice?id=' + this.subgroupFrameId)
                this.subgroupNoticeList = res1.data.subgroupNoticeList
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCreateSubgroupNoticeDialogVisible(index) {
            this.updateIndex = index
            this.newTitle = null
            this.newText = null
            this.createSubgroupNoticeDialogVisible = true
        },
        onChangeSubgroupNoticeDialogVisible(index) {
            this.updateIndex = index
            this.newTitle = this.subgroupNoticeList[index].title
            this.newText = this.subgroupNoticeList[index].text
            this.changeSubgroupNoticeDialogVisible = true
        },
        beforeCreateSubgroupNoticeDialogClose() {
            this.onCancelCreateSubgroupNotice()
            this.updateIndex = null
            this.createSubgroupNoticeDialogVisible = false
        },
        beforeChangeSubgroupNoticeDialogClose() {
            this.onCancelUpdateSubgroupNotice()
            this.updateIndex = null
            this.changeSubgroupNoticeDialogVisible = false
        },
        beforeChangeSubgroupModuleNameDialogClose() {
            this.onCancelChangeSubgroupModuleName()
            this.changeSubgroupModuleNameDialogVisible = false
        },
        async onCreateSubgroupNotice() {
            const { data: res } = await this.$http.post('/subgroup/createSubgroupNotice?subgroupId=' + this.subgroupId, { 'subgroupModelId': this.subgroupModuleId, 'title': this.newTitle, 'text': this.newText, 'userId': this.userId })
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: res1 } = await this.$http.get('/subgroup/getSubgroupNotice?id=' + this.subgroupFrameId)
                this.subgroupNoticeList = res1.data.subgroupNoticeList
                this.beforeCreateSubgroupNoticeDialogClose()
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async onUpdateSubgroupNotice() {
            const { data: res } = await this.$http.put('/subgroup/updateSubgroupNotice', { 'id': this.subgroupNoticeList[this.updateIndex].id, 'title': this.newTitle, 'text': this.newText })
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: res1 } = await this.$http.get('/subgroup/getSubgroupNotice?id=' + this.subgroupFrameId)
                this.subgroupNoticeList = res1.data.subgroupNoticeList
                this.beforeChangeSubgroupNoticeDialogClose()
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
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
        onCancelCreateSubgroupNotice() {
            this.newTitle = null
            this.newText = null
        },
        onCancelUpdateSubgroupNotice() {
            this.newTitle = this.subgroupNoticeList[this.updateIndex].title
            this.newText = this.subgroupNoticeList[this.updateIndex].text
        },
        onCancelChangeSubgroupModuleName() {
            this.newSubgroupModuleName = this.moduleName
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