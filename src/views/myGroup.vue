<template>
    <el-container>
        <el-header height="auto" style="padding: 20px; box-shadow: var(--el-box-shadow-lighter);">
            <myHead :avatar="this.avatar"></myHead>
        </el-header>
        <div class="container">
            <el-main>
                <el-row class="block">
                    <el-col>
                        <el-row justify="space-between" style="font-size: xx-large; font-weight: 500; margin: 20px;">
                            <el-col :span="5">
                                <div>我的社团</div>
                            </el-col>
                            <el-col :span="3">
                                <el-button @click="createGroupDialogVisible = true"
                                    :disabled="this.groupId > 0">创建社团</el-button>
                            </el-col>
                        </el-row>
                        <el-row v-for="group in groupList">
                            <el-col :span="24">
                                <el-card shadow="hover" style="margin: 10px;" @click="gotoGroup(group.id)">
                                    <el-row style="width: 100%;">
                                        <el-col :span="2">
                                            <el-avatar :size="50" :src="this.$http.defaults.baseURL + group.avatar">
                                                {{ group.name }}
                                            </el-avatar>
                                        </el-col>
                                        <el-col :span="4">
                                            {{ group.name }}
                                        </el-col>
                                        <el-col :span="12">
                                            {{ group.introduction }}
                                        </el-col>
                                        <el-col :span="4" :offset="2">
                                            <el-row>
                                                <el-col :span="8">
                                                    <el-avatar :size="22"
                                                        :src="this.$http.defaults.baseURL + group.userAvatar">
                                                        {{ group.username }}
                                                    </el-avatar>
                                                </el-col>
                                                <el-col v-if="group.nickname" :span="16">
                                                    {{ group.nickname }}
                                                </el-col>
                                                <el-col v-else :span="16">
                                                    {{ group.username }}
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col>
                                                    {{ group.createTime }}
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <div style="flex-grow: 1; display: flex; justify-content: center;">
                                    <el-pagination background layout="prev, pager, next" :page-size=10 :total=totalGroup
                                        @current-change="groupCurrentChange" />
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-main>
        </div>
    </el-container>
    <el-dialog v-model="createGroupDialogVisible" title="创建社团" width="30%">
        <div class="dialog">
            <el-row justify="center" style="width: 70%;">
                <el-col :span="6">
                    <div style="margin-bottom: 20px;">社团名</div>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="this.newGroup.name" />
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 100%; margin-top: 20px;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onCreateGroup">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelCreateGroup">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
import myHead from '../components/myHead.vue'
import { ElMessage } from 'element-plus'
export default {
    components: { myHead },
    data() {
        return {
            groupList: [],
            totalGroup: null,
            avatar: JSON.parse(sessionStorage.getItem('avatar')),
            createGroupDialogVisible: false,
            newGroup: {
                name: null
            },
            groupId: JSON.parse(sessionStorage.getItem('groupId'))
        }
    },
    async mounted() {
        const { data: groupListRes } = await this.$http.get('/group/selectMyGroupByPage?page=1')
        this.groupList = groupListRes.data.groupList
        this.totalGroup = groupListRes.data.totalGroup
    },
    methods: {
        gotoGroup(id) {
            const url = String(window.location.href)
            const baseURL = url.split('/')[0]
            const newURL = baseURL + '/group?groupId=' + String(id)
            window.location.href = newURL
        },
        async groupCurrentChange(page) {
            const { data: groupListRes } = await this.$http.get('/group/selectMyGroupByPage?page=' + page)
            this.groupList = groupListRes.data.groupList
            this.totalGroup = groupListRes.data.totalGroup
        },
        async onCreateGroup() {
            const { data: res } = await this.$http.post('/group/createGroup', this.newGroup)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                sessionStorage.setItem('groupId', JSON.stringify(res.data.groupId))
                sessionStorage.setItem('groupManager', JSON.stringify(0))
                this.$router.push('/myGroup')
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCancelCreateGroup() {
            this.newGroup.name = null
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
</style>