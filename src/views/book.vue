<template>
    <el-container>
        <el-header height="auto" style="padding: 20px; box-shadow: var(--el-box-shadow-lighter);">
            <myHead :avatar="this.avatar"></myHead>
        </el-header>
        <div class="container">
            <el-main>
                <el-row class="block">
                    <el-col>
                        <el-row justify="space-around" style="margin-bottom: 40px;">
                            <el-col :span="8">
                                <el-image :src="this.$http.defaults.baseURL + this.bookInfo.bookCover" fit="cover"
                                    style="width: 250px; height: 300px;"></el-image>
                            </el-col>
                            <el-col :span="6">
                                <el-descriptions title="书籍信息" :column="1">
                                    <el-descriptions-item label="书名：">{{ bookInfo.name }}</el-descriptions-item>
                                    <el-descriptions-item label="作者：">{{ bookInfo.author }}</el-descriptions-item>
                                    <el-descriptions-item label="出版社：">{{ bookInfo.publisher }}</el-descriptions-item>
                                    <el-descriptions-item label="出版时间：">{{ bookInfo.publishTime }}</el-descriptions-item>
                                    <el-descriptions-item label="译者：">{{ bookInfo.translator }}</el-descriptions-item>
                                    <el-descriptions-item label="ISBN：">{{ bookInfo.isbn }}</el-descriptions-item>
                                    <el-descriptions-item label="标签：">
                                        <div style="display: flex; flex-direction: column; width: 60%;">
                                            <el-tag v-for="tag in bookInfo.tags" :round="true"
                                                style="margin-bottom: 5px; user-select: none;" @click="gotoTag(tag.id)">
                                                {{ tag.name }}
                                            </el-tag>
                                        </div>
                                    </el-descriptions-item>
                                </el-descriptions>
                            </el-col>
                            <el-col :span="9" :offset="1">
                                书籍评分：
                                <el-row style="margin-bottom: 20px;">
                                    <el-col :span="6" style="display: flex; align-items: center;">
                                        <span style="font-size: x-large;">
                                            {{ this.bookRate.average }} / 5
                                        </span>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-rate v-model="this.bookRate.average" disabled size="large"></el-rate>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        5分：
                                    </el-col>
                                    <el-col :span="18">
                                        <el-progress :percentage="this.bookRate.five" />
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        4分：
                                    </el-col>
                                    <el-col :span="18">
                                        <el-progress :percentage="this.bookRate.four" />
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        3分：
                                    </el-col>
                                    <el-col :span="18">
                                        <el-progress :percentage="this.bookRate.three" />
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        2分：
                                    </el-col>
                                    <el-col :span="18">
                                        <el-progress :percentage="this.bookRate.two" />
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        1分：
                                    </el-col>
                                    <el-col :span="18">
                                        <el-progress :percentage="this.bookRate.one" />
                                    </el-col>
                                </el-row>
                                <el-row style="margin-top: 20px;">
                                    <el-col :span="6">推荐人：</el-col>
                                    <el-col :span="14">
                                        <el-card @click="gotoUser(bookInfo.uploadUser)">
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-avatar :size="50"
                                                        :src="this.$http.defaults.baseURL + bookInfo.user.avatar">
                                                        {{ bookInfo.user.username }}
                                                    </el-avatar>
                                                </el-col>
                                                <el-col :span="12">
                                                    <div v-if="bookInfo.user.nickname">
                                                        {{ bookInfo.user.nickname }}
                                                    </div>
                                                    <div v-else>
                                                        {{ bookInfo.user.username }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <el-row style="margin-top: 30px;">
                                    <el-col>
                                        <el-button v-if="this.isFavourite === false" @click="favourite">收藏</el-button>
                                        <el-button v-else @click="disFavourite" type="danger">取消收藏</el-button>
                                    </el-col>
                                </el-row>
                                <!-- <el-row v-if="this.groupManager" style="margin-top: 10px;">
                                    <el-col>
                                        <el-button v-if="this.isGroupFavourite === false"
                                            @click="groupFavourite">加入社团收藏</el-button>
                                        <el-button v-else @click="disGroupFavourite" type="danger">移出社团收藏</el-button>
                                    </el-col>
                                </el-row> -->
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row class="block">
                    <el-col>
                        <el-card shadow="never">
                            <template #header>
                                <span style="font-size: large; font-weight: 500;">
                                    作者简介：
                                </span>
                            </template>
                            <div v-if="this.bookInfo.authorIntroduction !== null">
                                {{ this.bookInfo.authorIntroduction }}
                            </div>
                            <div v-else>
                                <el-empty />
                            </div>
                        </el-card>
                        <el-card shadow="never" style="margin-top: 20px;">
                            <template #header>
                                <span style="font-size: large; font-weight: 500;">
                                    书本简介：
                                </span>
                            </template>
                            <div v-if="this.bookInfo.bookIntroduction !== null">
                                {{ this.bookInfo.bookIntroduction }}
                            </div>
                            <div v-else>
                                <el-empty />
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row class="block">
                    <el-col>
                        <el-row>
                            <el-col :span="2" style="display: flex; align-items: center;">
                                <span>评分：</span>
                            </el-col>
                            <el-col :span="20">
                                <el-rate v-model="this.bookRate.myRate" size="large" :texts="['很差', '较差', '一般', '较好', '很好']"
                                    show-text />
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" @click="updateMyRate">确认</el-button>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 20px;">
                            <el-col :span="2" style="display: flex; align-items: center;">
                                <span>评论：</span>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="this.myComment" type="textarea" style="width: 80%;"></el-input>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" @click="updateMyComment">评论</el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row class="block">
                    <el-col>
                        <span style="font-size: x-large; font-weight: 500;">书籍评论：</span>
                        <el-divider />
                        <el-empty v-if="this.bookComment.length == 0" description="description" />
                        <el-row v-else v-for="comment in this.bookComment">
                            <el-col>
                                <el-card style="margin: 10px;">
                                    <template #header>
                                        <div @click="this.$router.push('/user?userId=' + comment.id)">
                                            <el-row>
                                                <el-col :span="2">
                                                    <el-avatar :src="this.$http.defaults.baseURL + comment.avatar">{{
                                                        comment.username }}</el-avatar>
                                                </el-col>
                                                <el-col :span="17" style="display: flex; align-items: center;">
                                                    <div v-if="comment.nickname !== null">{{ comment.nickname }}</div>
                                                    <div v-else>{{ comment.username }}</div>
                                                </el-col>
                                                <el-col :span="5" style="display: flex; align-items: center;">
                                                    {{ comment.time }}
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </template>
                                    <div>
                                        {{ comment.comment }}
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <div style="flex-grow: 1; display: flex; justify-content: center;">
                                    <el-pagination background layout="prev, pager, next" :page-size=10 :total=totalComment
                                        @current-change="commentCurrentChange" />
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
import { ElMessage } from 'element-plus'
import myHead from '../components/myHead.vue'
export default {
    components: { myHead },
    data() {
        return {
            bookId: null,
            bookInfo: {
                user: {},
            },
            isFavourite: false,
            bookRate: {
                myRate: 0,
                average: 0,
                num: 0,
                five: 0,
                four: 0,
                three: 0,
                two: 0,
                one: 0
            },
            myComment: null,
            bookComment: [],
            totalComment: null,
            avatar: JSON.parse(sessionStorage.getItem('avatar')),
            groupId: null,
            groupManager: false,
            isGroupFavourite: false
        }
    },
    async mounted() {
        // this.groupId = JSON.parse(sessionStorage.getItem('groupId'))
        this.groupManager = JSON.parse(sessionStorage.getItem('groupManager'))
        this.bookId = this.$route.query.bookId
        const { data: res } = await this.$http.get('/book/bookInfoById?id=' + this.bookId)
        this.bookInfo = res.data.bookInfo
        const { data: rateRes } = await this.$http.get('/book/bookRate?bookId=' + this.bookId)
        if (rateRes.data !== null) {
            this.bookRate = rateRes.data
        }
        const { data: commentRes } = await this.$http.get('/book/bookCommentByPage?bookId=' + this.bookId + '&page=1')
        this.bookComment = commentRes.data.commentList
        this.totalComment = commentRes.data.totalComment
        const { data: isFavouriteRes } = await this.$http.get('/book/isFavourite?bookId=' + this.bookId)
        if (isFavouriteRes.code === 1) {
            this.isFavourite = true
        }
        const { data: isGroupFavouriteRes } = await this.$http.get('/group/isGroupFavourite?bookId=' + this.bookId + '&groupId=' + this.groupId)
        if (isGroupFavouriteRes.code === 1) {
            this.isGroupFavourite = true
        }
    },
    methods: {
        async favourite() {
            const { data: res } = await this.$http.post('/book/favourite', { 'bookId': this.bookId })
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.isFavourite = true
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async disFavourite() {
            const { data: res } = await this.$http.delete('/book/deleteFavourite?bookId=' + this.bookId)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.isFavourite = false
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async groupFavourite() {
            const { data: res } = await this.$http.post('/group/groupFavourite?groupId=' + String(this.groupId) + '&bookId=' + String(this.bookId))
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.isGroupFavourite = true
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async disGroupFavourite() {
            const { data: res } = await this.$http.delete('/group/deleteGroupFavourite?groupId=' + String(this.groupId) + '&bookId=' + String(this.bookId))
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.isGroupFavourite = false
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async updateMyRate() {
            const { data: res } = await this.$http.post('/book/updateRate', { 'bookId': this.bookId, 'rate': this.bookRate.myRate })
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: rateRes } = await this.$http.get('/book/bookRate?bookId=' + this.bookId)
                this.bookRate = rateRes.data
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async updateMyComment() {
            const { data: res } = await this.$http.post('/book/comment', { 'bookId': this.bookId, 'comment': this.myComment })
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: commentRes } = await this.$http.get('/book/bookCommentByPage?bookId=' + this.bookId + '&page=1')
                this.bookComment = commentRes.data.commentList
                this.totalComment = commentRes.data.totalComment
                this.myComment = null
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async commentCurrentChange(page) {
            const { data: commentRes } = await this.$http.get('/book/bookCommentByPage?bookId=' + this.bookId + '&page=' + page)
            this.bookComment = commentRes.data.commentList
            this.totalComment = commentRes.data.totalComment
        },
        gotoTag(tag) {
            const url = String(window.location.href)
            const baseURL = url.split('/')[0]
            const newURL = baseURL + '/bookList?tag=' + String(tag)
            window.location.href = newURL
        },
        gotoUser(id) {
            const url = String(window.location.href)
            const baseURL = url.split('/')[0]
            const newURL = baseURL + '/user?userId=' + String(id)
            window.location.href = newURL
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