<template>
    <el-container>
        <el-header height="auto" style="padding: 20px;  ">
            <myHead :avatar="this.avatar"></myHead>
        </el-header>
        <div class="container">
            <el-main>
                <el-row class="block">
                    <el-col class="tip">
                        搜索关键词：{{ this.keyword }}
                    </el-col>
                </el-row>
                <el-row class="block">
                    <el-col>
                        <el-tabs stretch>
                            <el-tab-pane label="书籍">
                                <div v-if="this.totalBook === 0">
                                    <el-empty />
                                </div>
                                <el-row v-else>
                                    <el-col>
                                        <ul class="bookList">
                                            <li class="book" type="none" v-for="book in bookList">
                                                <el-card @click="gotoBook(book.id)" style="margin: 10px; height: 600px;"
                                                    :body-style="{ 'margin': '20px', 'padding': '0px', 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }">
                                                    <el-image :src="this.$http.defaults.baseURL + book.bookCover"
                                                        fit="cover" style="width: 100%; height: 250px;">
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
                                            <el-pagination background layout="prev, pager, next" :page-size=16
                                                :total=totalBook @current-change="bookCurrentChange" />
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                            <el-tab-pane label="用户">
                                <div v-if="this.totalUser === 0">
                                    <el-empty />
                                </div>
                                <el-row v-else v-for="user in userList">
                                    <el-col :span="24">
                                        <el-card shadow="hover" class="user" @click="gotoUser(user.id)">
                                            <el-row style="width: 100%;">
                                                <el-col :span="2">
                                                    <el-avatar :size="50" :src="this.$http.defaults.baseURL + user.avatar">
                                                        {{ user.username }}
                                                    </el-avatar>
                                                </el-col>
                                                <el-col :span="22" v-if="user.nickname">
                                                    {{ user.nickname }}
                                                </el-col>
                                                <el-col :span="22" v-else>
                                                    {{ user.username }}
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <div style="flex-grow: 1; display: flex; justify-content: center;">
                                            <el-pagination background layout="prev, pager, next" :page-size=10
                                                :total=totalUser @current-change="userCurrentChange" />
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                            <el-tab-pane label="社团">
                                <div v-if="this.totalGroup === 0">
                                    <el-empty />
                                </div>
                                <el-row v-else v-for="group in groupList">
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
                                            <el-pagination background layout="prev, pager, next" :page-size=10
                                                :total=totalGroup @current-change="groupCurrentChange" />
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                        </el-tabs>
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
            keyword: null,
            bookList: [],
            totalBook: null,
            userList: [],
            totalUser: null,
            groupList: [],
            totalGroup: null,
            avatar: JSON.parse(sessionStorage.getItem('avatar'))
        }
    },
    async mounted() {
        this.keyword = this.$route.query.keyword
        const { data: bookRes } = await this.$http.get('/book/searchBook?keyword=' + this.keyword + '&page=1')
        this.bookList = bookRes.data.bookList
        this.totalBook = bookRes.data.totalBook
        const { data: userRes } = await this.$http.get('/user/searchUser?keyword=' + this.keyword + '&page=1')
        this.userList = userRes.data.userList
        this.totalUser = userRes.data.totalUser
        const { data: groupRes } = await this.$http.get('/group/searchGroup?keyword=' + this.keyword + '&page=1')
        this.groupList = groupRes.data.groupList
        this.totalGroup = groupRes.data.totalGroup
    },
    methods: {
        async bookCurrentChange(page) {
            const { data: bookRes } = await this.$http.get('/book/searchBook?keyword=' + this.keyword + '&page=' + page)
            this.bookList = bookRes.data.bookList
            this.totalBook = bookRes.data.totalBook
        },
        async userCurrentChange(page) {
            const { data: userRes } = await this.$http.get('/user/searchUser?keyword=' + this.keyword + '&page=' + page)
            this.userList = userRes.data.userList
            this.totalUser = userRes.data.totalUser
        },
        async groupCurrentChange(page) {
            const { data: groupRes } = await this.$http.get('/group/searchGroup?keyword=' + this.keyword + '&page=' + page)
            this.groupList = groupRes.data.groupList
            this.totalGroup = groupRes.data.totalGroup
        },
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
        gotoGroup(id) {
            const url = String(window.location.href)
            const baseURL = url.split('/')[0]
            const newURL = baseURL + '/group?groupId=' + String(id)
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
     
}

.tip {
    font-size: x-large;
    font-weight: 400;
    padding: 10px;
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

.user {
    margin: 10px;
}
</style>