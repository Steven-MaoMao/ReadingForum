<template>
    <el-container>
        <el-header height="auto" style="padding: 20px; box-shadow: var(--el-box-shadow-lighter);">
            <myHead></myHead>
        </el-header>
        <div class="container">
            <el-main>
                <el-row class="block">
                    <el-col>
                        <div style="font-size: xx-large; font-weight: 500; margin: 20px;">所有社团</div>
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
</template>

<script>
import myHead from '../components/myHead.vue'
export default {
    components: { myHead },
    data() {
        return {
            groupList: [],
            totalGroup: null
        }
    },
    async mounted() {
        const { data: groupListRes } = await this.$http.get('/group/selectAllByPage?page=1')
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
            const { data: groupListRes } = await this.$http.get('/group/selectAllByPage?page=' + page)
            this.groupList = groupListRes.data.groupList
            this.totalGroup = groupListRes.data.totalGroup
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