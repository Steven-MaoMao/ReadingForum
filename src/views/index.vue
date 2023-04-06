<template>
    <el-container>
        <el-header height="auto" style="padding: 20px; box-shadow: var(--el-box-shadow-lighter);">
            <myHead></myHead>
        </el-header>
        <el-container>
            <el-aside width="350px" style="padding: 20px;">
                <el-row class="block">
                    <el-col>
                        <el-card shadow="never">
                            <template #header>
                                <div>
                                    <span style="font-size: larger; font-weight: 600;">Top Ten Books</span>
                                </div>
                            </template>
                            <div v-for="book in topTenBook" :key="book">
                                <el-link :underline="false" :href="this.baseLocation + '/book?bookId=' + String(book.id)">
                                    <el-icon class="el-icon--left">
                                        <View />
                                    </el-icon>{{ book.name }}
                                </el-link>
                                <el-divider />
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row class="block">
                    <el-col>
                        <el-card shadow="never">
                            <template #header>
                                <div>
                                    <span style="font-size: larger; font-weight: 600;">Top Five Tags</span>
                                </div>
                            </template>
                            <div v-for="tag in topFiveTag" :key="tag">
                                <el-link :underline="false">
                                    <el-icon class="el-icon--left">
                                        <View />
                                    </el-icon>{{ tag.name }}
                                </el-link>
                                <el-divider />
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main>
                <el-row class="block">
                    <el-col>
                        <div style="font-size: x-large; font-weight: 600; margin-bottom: 20px;">Top Three Books</div>
                        <el-carousel type="card" height="600px">
                            <el-carousel-item v-for="book in this.topThreeBook" :key="book">
                                <el-card @click="gotoBook(book.id)"
                                    :body-style="{ 'width': '100%', 'height': '500px', 'margin': '20px', 'padding': '0px', 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }">
                                    <el-image :src="this.$http.defaults.baseURL + book.bookCover" fit="cover"
                                        style="width: 200px; height: 300px;">
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
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>
                <el-row class="block">
                    <el-col>
                        <div style="font-size: x-large; font-weight: 600; margin-bottom: 20px;">Latest Five Books</div>
                        <el-row>
                            <el-col>
                                <ul class="latestFiveBookList">
                                    <li class="latestFiveBook" type="none" v-for="book in latestFiveBook">
                                        <el-card @click="gotoBook(book.id)" style="margin: 10px; height: 420px;"
                                            :body-style="{ 'margin': '20px', 'padding': '0px', 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }">
                                            <el-image :src="this.$http.defaults.baseURL + book.bookCover" fit="cover"
                                                style="width: 100%; height: 200px;">
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
                    </el-col>
                </el-row>
                <el-row class="block">
                    <el-col>
                        <div style="font-size: x-large; font-weight: 600; margin-bottom: 20px;">Recommended Books</div>
                        <el-row>
                            <el-col>
                                <ul class="latestFiveBookList">
                                    <li class="latestFiveBook" type="none" v-for="book in recommendBook">
                                        <el-card @click="gotoBook(book.id)" style="margin: 10px; height: 420px;"
                                            :body-style="{ 'margin': '20px', 'padding': '0px', 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }">
                                            <el-image :src="this.$http.defaults.baseURL + book.bookCover" fit="cover"
                                                style="width: 100%; height: 200px;">
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
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import myHead from '../components/myHead.vue'
import { View } from '@element-plus/icons-vue'
export default {
    components: { myHead },
    data() {
        return {
            baseLocation: null,
            topTenBook: [],
            topThreeBook: [],
            topFiveTag: [],
            latestFiveBook: [],
            recommendBook: []
        }
    },
    async mounted() {
        this.baseLocation = String(window.location.href).split('/')[0]
        const { data: topTenBookRes } = await this.$http.get('/book/topTenBook')
        this.topTenBook = topTenBookRes.data.bookList
        this.topThreeBook = this.topTenBook.slice(0, 3)
        const { data: topFiveTagRes } = await this.$http.get('/book/topFiveTag')
        this.topFiveTag = topFiveTagRes.data.tagList
        const { data: latestFiveBookRes } = await this.$http.get('/book/latestFiveBook')
        this.latestFiveBook = latestFiveBookRes.data.bookList
        const { data: recommendBookRes } = await this.$http.get('/recommend/recommendByFavourite')
        this.recommendBook = recommendBookRes.data.bookList
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
    }
}
</script>

<style scoped>
.block {
    margin: 20px;
    padding: 20px;
    box-shadow: var(--el-box-shadow-lighter);
}

.latestFiveBookList {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    margin: 0%;
    padding: 0%;
}

.latestFiveBook {
    width: 20%;
}
</style>