<template>
    <el-row>
        <el-col>
            <el-button type="primary" size="large" style="margin: 10px;" @click="onCreateBookRecommendDialogVisible">
                <el-icon>
                    <Plus />
                </el-icon>
                <span>
                    推荐书籍
                </span>
            </el-button>
        </el-col>
    </el-row>
    <el-divider />
    <el-row v-for="(bookRecommend, index) in bookRecommendList">
        <el-col>
            <el-card style="margin: 10px;">
                <template #header>
                    <el-row @click="gotoUser(bookRecommend.userId)">
                        <el-col :span="2" style="display: flex; align-items: center;">
                            <el-avatar :src="this.$http.defaults.baseURL + bookRecommend.user.avatar">{{
                                bookRecommend.user.username }}</el-avatar>
                        </el-col>
                        <el-col :span="18" v-if="bookRecommend.user.nickname"
                            style="display: flex; align-items: center; font-size: large; font-weight: 600;">
                            {{ bookRecommend.user.nickname }}
                        </el-col>
                        <el-col :span="18" v-else style="display: flex; align-items: center;">
                            {{ bookRecommend.user.username }}
                        </el-col>
                        <el-col :span="4" style="display: flex; align-items: center;">
                            {{ bookRecommend.time }}
                        </el-col>
                    </el-row>
                </template>
                <el-row>
                    <el-col :span="6">
                        <el-image :src="this.$http.defaults.baseURL + bookRecommend.book.bookCover" fit="cover"
                            style="width: 100%; height: 250px;" @click="gotoBook(bookRecommend.bookId)">
                        </el-image>
                    </el-col>
                    <el-col :span="17" :offset="1">
                        <el-row>
                            <el-col>
                                <el-descriptions title="书籍信息">
                                    <el-descriptions-item label="书名：">{{ bookRecommend.book.name }}</el-descriptions-item>
                                    <el-descriptions-item label="作者：">{{ bookRecommend.book.author }}</el-descriptions-item>
                                    <el-descriptions-item label="出版社：">{{ bookRecommend.book.publisher
                                    }}</el-descriptions-item>
                                    <el-descriptions-item label="出版时间：">{{ bookRecommend.book.publishTime
                                    }}</el-descriptions-item>
                                    <el-descriptions-item label="译者：">{{ bookRecommend.book.translator
                                    }}</el-descriptions-item>
                                    <el-descriptions-item label="ISBN：">{{ bookRecommend.book.ISBN }}</el-descriptions-item>
                                    <el-descriptions-item label="标签：">
                                        <el-tag v-for="tag in bookRecommend.book.tags" :round="true"
                                            style="margin-bottom: 5px; user-select: none;" @click="gotoTag(tag.id)">
                                            {{ tag.name }}
                                        </el-tag>
                                    </el-descriptions-item>
                                </el-descriptions>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <div style="font-weight: 600; margin-bottom: 10px;">推荐理由</div>
                                {{ bookRecommend.recommendReason }}
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 20px;">
                            <el-col :span="6">
                                <el-button :disabled="bookRecommend.userId != this.userId"
                                    @click="onUpdateBookRecommendDialogVisible(index)">修改书籍推荐</el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button :disabled="bookRecommend.userId != this.userId"
                                    @click="onDeleteBookRecommend(bookRecommend.id)" type="danger">删除书籍推荐</el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
    <el-dialog v-model="createBookRecommendDialogVisible" title="新增书籍推荐" width="40%"
        :before-close="beforeCreateBookRecommendDialogClose">
        <div class="dialog">
            <el-row justify="center" style="width: 80%;">
                <el-col :span="10">
                    <el-image :src="this.$http.defaults.baseURL + newBook.bookCover" fit="cover"
                        style="width: 100%; height: 250px;">
                    </el-image>
                </el-col>
                <el-col :span="12" :offset="2">
                    <el-row style="margin-top: 10px;">
                        <el-col>
                            <el-select v-model="newBookId" filterable @change="onBookChange">
                                <el-option v-for="book in bookList" :key="book.id" :label="book.name" :value="book.id" />
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 10px;">
                        <el-col>
                            <el-descriptions :column=1 size="small">
                                <el-descriptions-item label="书名：">{{ newBook.name }}</el-descriptions-item>
                                <el-descriptions-item label="作者：">{{ newBook.author }}</el-descriptions-item>
                                <el-descriptions-item label="出版社：">{{ newBook.publisher
                                }}</el-descriptions-item>
                                <el-descriptions-item label="出版时间：">{{ newBook.publishTime
                                }}</el-descriptions-item>
                                <el-descriptions-item label="译者：">{{ newBook.translator
                                }}</el-descriptions-item>
                                <el-descriptions-item label="ISBN：">{{ newBook.ISBN }}</el-descriptions-item>
                            </el-descriptions>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 80%; margin-top: 20px; margin-bottom: 20px;">
                <el-col :span="6">
                    推荐理由：
                </el-col>
                <el-col :span="18">
                    <el-input v-model="this.newBookRecommendReason" type="textarea"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 100%;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onCreateBookRecommend">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelCreateBookRecommend">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
    <el-dialog v-model="updateBookRecommendDialogVisible" title="修改书籍推荐" width="30%"
        :before-close="beforeUpdateBookRecommendDialogClose">
        <div class="dialog">
            <el-row justify="center" style="width: 70%; margin-bottom: 20px;">
                <el-col :span="6">
                    推荐理由：
                </el-col>
                <el-col :span="18">
                    <el-input v-model="this.newBookRecommendReason" type="textarea"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 100%;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onUpdateBookRecommend">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelUpdateBookRecommend">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
    props: ['subgroupId'],
    data() {
        return {
            bookList: [],
            bookRecommendList: [],
            createBookRecommendDialogVisible: false,
            updateBookRecommendDialogVisible: false,
            newBookId: null,
            newBook: {},
            updateIndex: null,
            newBookRecommendReason: null,
        }
    },
    async mounted() {
        this.userId = JSON.parse(sessionStorage.getItem('id'))
        const { data: res } = await this.$http.get('/subgroup/getBookRecommend?subgroupId=' + this.subgroupId)
        this.bookRecommendList = res.data.bookRecommendList
        const { data: bookListRes } = await this.$http.get('/book/allBook')
        this.bookList = bookListRes.data.bookList
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
        onCreateBookRecommendDialogVisible() {
            this.newBookId = null
            this.newBook = {}
            this.newBookRecommendReason = null
            this.createBookRecommendDialogVisible = true
        },
        onUpdateBookRecommendDialogVisible(index) {
            this.updateIndex = index
            this.newBookRecommendReason = this.bookRecommendList[index].recommendReason
            this.updateBookRecommendDialogVisible = true
        },
        async onCreateBookRecommend() {
            const { data: res } = await this.$http.post('/subgroup/addBookRecommend', { 'bookId': this.newBookId, 'recommendReason': this.newBookRecommendReason, 'userId': this.userId, 'subgroupId': this.subgroupId })
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: res1 } = await this.$http.get('/subgroup/getBookRecommend?subgroupId=' + this.subgroupId)
                this.bookRecommendList = res1.data.bookRecommendList
                this.beforeCreateBookRecommendDialogClose()
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async onUpdateBookRecommend() {
            const { data: res } = await this.$http.put('/subgroup/updateBookRecommendReason', { 'bookRecommendId': this.bookRecommendList[this.updateIndex].id, 'recommendReason': this.newBookRecommendReason })
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: res1 } = await this.$http.get('/subgroup/getBookRecommend?subgroupId=' + this.subgroupId)
                this.bookRecommendList = res1.data.bookRecommendList
                this.beforeUpdateBookRecommendDialogClose()
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCancelCreateBookRecommend() {
            this.newBookId = null
            this.newBook = {}
            this.newBookRecommendReason = null
        },
        onCancelUpdateBookRecommend() {
            this.newBookRecommendReason = this.bookRecommendList[this.updateIndex].recommendReason
        },
        beforeCreateBookRecommendDialogClose() {
            this.onCancelCreateBookRecommend()
            this.createBookRecommendDialogVisible = false
        },
        beforeUpdateBookRecommendDialogClose() {
            this.newBookRecommendReason = null
            this.updateIndex = null
            this.updateBookRecommendDialogVisible = false
        },
        async onDeleteBookRecommend(id) {
            const { data: res } = await this.$http.delete('/subgroup/deleteBookRecommend?id=' + id)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: res1 } = await this.$http.get('/subgroup/getBookRecommend?subgroupId=' + this.subgroupId)
                this.bookRecommendList = res1.data.bookRecommendList
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onBookChange(value) {
            for (const index in this.bookList) {
                if (this.bookList[index].id == value) {
                    this.newBook = this.bookList[index]
                    break
                }
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