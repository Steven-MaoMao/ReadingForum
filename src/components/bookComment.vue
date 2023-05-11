<template>
    <el-card style="margin: 10px;">
        <template #header>
            <el-row @click="gotoUser(this.bookList[0].user.id)">
                <!-- <el-col :span="2" style="display: flex; align-items: center;">
                    <el-avatar :src="this.$http.defaults.baseURL + this.bookList[0].user.avatar">{{
                        this.bookList[0].user.username }}</el-avatar>
                </el-col>
                <el-col :span="18" v-if="this.bookList[0].user.nickname"
                    style="display: flex; align-items: center; font-size: large; font-weight: 600;">
                    {{ this.bookList[0].user.nickname }}
                </el-col>
                <el-col :span="18" v-else style="display: flex; align-items: center;">
                    {{ this.bookList[0].user.username }}
                </el-col> -->
                <el-col :span="20" style="display: flex; align-items: center; font-weight: 600; font-size: larger;">
                    {{ this.bookList[0].book.name }}
                </el-col>
                <el-col :span="4" style="display: flex; align-items: center;">
                    {{ this.bookList[0].time }}
                </el-col>
            </el-row>
        </template>
        <el-row justify="space-evenly">
            <el-col :span="10">
                <el-row>
                    <el-col>
                        <el-image :src="this.$http.defaults.baseURL + this.bookList[0].book.bookCover" fit="cover"
                            style="width: 80%; height: 300px;" @click="gotoBook(this.bookList[0].bookId)">
                        </el-image>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 20px;">
                    <el-col>
                        <el-descriptions title="书籍信息" :column=1>
                            <el-descriptions-item label="书名：">{{ this.bookList[0].book.name }}</el-descriptions-item>
                            <el-descriptions-item label="作者：">{{ this.bookList[0].book.author }}</el-descriptions-item>
                            <el-descriptions-item label="出版社：">{{ this.bookList[0].book.publisher
                            }}</el-descriptions-item>
                            <el-descriptions-item label="出版时间：">{{ this.bookList[0].book.publishTime
                            }}</el-descriptions-item>
                            <el-descriptions-item label="译者：">{{ this.bookList[0].book.translator
                            }}</el-descriptions-item>
                            <el-descriptions-item label="ISBN：">{{ this.bookList[0].book.isbn }}</el-descriptions-item>
                            <el-descriptions-item label="标签：">
                                <el-tag v-for="tag in this.bookList[0].book.tags" :round="true"
                                    style="margin-bottom: 10px; user-select: none;" @click="gotoTag(tag.id)">
                                    {{ tag.name }}
                                </el-tag>
                            </el-descriptions-item>
                        </el-descriptions>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="10">
                <el-row style="margin-bottom: 40px;">
                    <el-col :span="16" :offset="1">
                        <el-input v-model="newComment"></el-input>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-button type="primary" @click="this.onComment">评论</el-button>
                    </el-col>
                </el-row>
                <el-card style="margin: 10px; border-radius: 20px;">
                    <template #header>
                        <el-row>
                            <!-- <el-col :span="12" style="display: flex; align-items: center; font-weight: 600; font-size: larger;">
                                {{ this.bookList[0].title }}
                            </el-col> -->
                            <el-col :span="6">
                                <el-avatar :src="this.$http.defaults.baseURL + this.bookList[0].user.avatar">{{
                                    this.bookList[0].user.username }}</el-avatar>
                            </el-col>
                            <el-col :span="8" style="display: flex; align-items: center;">
                                <div v-if="this.bookList[0].user.nickname !== null">{{ this.bookList[0].user.nickname }}
                                </div>
                                <div v-else>{{ this.bookList[0].user.username }}</div>
                            </el-col>
                            <el-col :span="10" style="display: flex; align-items: center;">
                                {{ this.bookList[0].time }}
                            </el-col>
                        </el-row>
                    </template>
                    <el-row>
                        <el-col>
                            {{ this.bookList[0].recommendReason }}
                        </el-col>
                    </el-row>
                </el-card>
                <el-card style="margin: 10px; margin-top: 30px; border-radius: 20px;" v-for="notice in noticeList">
                    <template #header>
                        <el-row>
                            <!-- <el-col :span="12" style="display: flex; align-items: center; font-weight: 600; font-size: larger;">
                                {{ notice.title }}
                            </el-col> -->
                            <el-col :span="6" @click="gotoUser(notice.user.id)">
                                <el-avatar :src="this.$http.defaults.baseURL + notice.user.avatar">{{
                                    notice.user.username }}</el-avatar>
                            </el-col>
                            <el-col :span="8" style="display: flex; align-items: center;" @click="gotoUser(notice.user.id)">
                                <div v-if="notice.user.nickname !== null">{{ notice.user.nickname }}</div>
                                <div v-else>{{ notice.user.username }}</div>
                            </el-col>
                            <el-col :span="10" style="display: flex; align-items: center;">
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
            bookList: [{
                book: {},
                user: {}
            }],
            noticeList: [],
            newComment: null
        }
    },
    async mounted() {
        this.userId = JSON.parse(sessionStorage.getItem('id'))
        const { data: noticeListRes } = await this.$http.get('/subgroup/getSubgroupNotice?id=' + this.subgroupFrameId)
        this.noticeList = noticeListRes.data.subgroupNoticeList
        const { data: bookListRes } = await this.$http.get('/subgroup/getBookRecommend?id=' + this.subgroupFrameId)
        this.bookList = bookListRes.data.bookRecommendList
    },
    methods: {
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
</style>