<template>
    <el-container>
        <el-header height="auto" style="padding: 20px; box-shadow: var(--el-box-shadow-lighter);">
            <myHead></myHead>
        </el-header>
        <div class="container">
            <el-main>
                <el-row class="block">
                    <el-col :span="2">标签：</el-col>
                    <el-col :span="22">
                        <el-radio-group style="width: 100%;" v-model="currentTag" @change="onTagChange">
                            <el-row style="width: 100%;">
                                <el-col :span="2">
                                    <el-radio-button :label=0>全部</el-radio-button>
                                </el-col>
                                <el-col :span="22">
                                    <span v-for="tag in tagList">
                                        <el-radio-button :label="tag.id">{{ tag.name }}</el-radio-button>
                                    </span>
                                </el-col>
                            </el-row>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row class="block">
                    <el-col>
                        <el-row>
                            <el-col>
                                <ul class="bookList">
                                    <li class="book" type="none" v-for="book in bookList">
                                        <el-card @click="gotoBook(book.id)" style="margin: 10px; height: 500px;"
                                            :body-style="{ 'margin': '20px', 'padding': '0px', 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }">
                                            <el-image :src="this.$http.defaults.baseURL + book.bookCover" fit="cover"
                                                style="width: 100%; height: 250px;">
                                            </el-image>
                                            <el-descriptions size="small" :column=1 style="margin-left: 20px;">
                                                <el-descriptions-item label="书名">{{ book.name
                                                }}</el-descriptions-item>
                                                <el-descriptions-item label="作者">{{ book.author
                                                }}</el-descriptions-item>
                                                <el-descriptions-item label="出版社">{{ book.publisher
                                                }}</el-descriptions-item>
                                                <el-descriptions-item label="标签">
                                                    <div style="display: flex; flex-direction: column;">
                                                        <el-tag v-for="tag in book.tags" :round="true" size="small">
                                                            {{ tag.name }}
                                                        </el-tag>
                                                    </div>
                                                </el-descriptions-item>
                                            </el-descriptions>
                                        </el-card>
                                    </li>
                                </ul>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <div style="flex-grow: 1; display: flex; justify-content: center;">
                                    <el-pagination background layout="prev, pager, next" :page-size=16 :total=totalBook
                                        @current-change="bookCurrentChange" />
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
            currentTag: null,
            tagList: [],
            bookList: [],
            totalBook: null
        }
    },
    async mounted() {
        if (this.$route.fullPath.includes('tag')) {
            this.currentTag = this.$route.query.tag
        } else {
            this.currentTag = 0
        }
        const { data: tagListRes } = await this.$http.get('/book/allTag')
        this.tagList = tagListRes.data.tagList
        const { data: bookListRes } = await this.$http.get('/book/bookByTagPage?tagId=' + this.currentTag + '&page=1')
        this.bookList = bookListRes.data.bookList
        this.totalBook = bookListRes.data.totalBook
    },
    methods: {
        onTagChange(value) {
            const url = String(window.location.href)
            const baseURL = url.split('/')[0]
            var newURL
            if (this.currentTag === 0) {
                newURL = baseURL + '/bookList'
            } else {
                newURL = baseURL + '/bookList?tag=' + this.currentTag
            }
            window.location.href = newURL
        },
        async bookCurrentChange(page) {
            const { data: bookListRes } = await this.$http.get('/book/bookByTagPage?tagId=' + this.currentTag + '&page=' + page)
            this.bookList = bookListRes.data.bookList
            this.totalBook = bookListRes.data.totalBook
        },
        gotoBook(id) {
            const url = String(window.location.href)
            const baseURL = url.split('/')[0]
            const newURL = baseURL + '/book?bookId=' + String(id)
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

.bookList {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    margin: 0%;
    padding: 0%;
}

.book {
    width: 25%;
}
</style>