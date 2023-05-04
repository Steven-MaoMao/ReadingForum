<template>
    <el-container>
        <el-header height="auto" style="padding: 20px; box-shadow: var(--el-box-shadow-lighter);">
            <myHead :avatar="avatar"></myHead>
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
                                <el-button @click="joinGroup">加入社团</el-button>
                            </el-col>
                        </el-row>
                        <el-row justify="center">
                            <el-col :span="20">
                                <el-descriptions title="社团信息">
                                    <el-descriptions-item label="社团名">{{ groupInfo.name }}</el-descriptions-item>
                                    <el-descriptions-item label="创建人" v-if="groupInfo.nickname">{{ groupInfo.nickname
                                    }}</el-descriptions-item>
                                    <el-descriptions-item label="创建人" v-else>{{ groupInfo.username }}</el-descriptions-item>
                                    <el-descriptions-item label="创建时间">{{ groupInfo.createTime }}</el-descriptions-item>
                                    <el-descriptions-item label="社团简介">{{ groupInfo.introduction }}</el-descriptions-item>
                                </el-descriptions>
                            </el-col>
                            <el-col :span="2"
                                style="display: flex; flex-direction: column; justify-content: space-between;">

                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-main>
        </div>
    </el-container>
</template>

<script>
import myHead from '../components/myHead.vue'
import { ElMessage } from 'element-plus'
export default {
    components: { myHead },
    data() {
        return {
            groupId: null,
            groupInfo: {}
        }
    },
    async mounted() {
        this.groupId = this.$route.query.groupId
        const { data: groupInfoRes } = await this.$http.get('/group/selectById?groupId=' + String(this.groupId))
        this.groupInfo = groupInfoRes.data.groupInfo
    },
    methods: {
        async joinGroup() {
            const { data: res } = await this.$http.put('/user/joinGroup?groupId=' + String(this.groupId))
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                sessionStorage.setItem('groupId', JSON.stringify(this.groupId))
                sessionStorage.setItem('groupManager', JSON.stringify(0))
                this.$router.push('/myGroup')
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
</style>