<template>
    <el-container>
        <el-header height="auto" style="padding: 20px;  ">
            <myHead :avatar="this.avatar"></myHead>
        </el-header>
        <el-drawer v-model="drawer" title="选择书籍大类" direction="ltr" size="20%">
            <el-row>
                <el-card shadow="hover" style="width: 100%; margin: 5px;" @click="drawer = false; isNotComputer = false">计算机类</el-card>
            </el-row>
            <el-row>
                <el-card shadow="hover" style="width: 100%; margin: 5px;" @click="drawer = false; isNotComputer = true">电子信息类</el-card>
            </el-row>
            <el-row>
                <el-card shadow="hover" style="width: 100%; margin: 5px;" @click="drawer = false; isNotComputer = true">力学类</el-card>
            </el-row>
            <el-row>
                <el-card shadow="hover" style="width: 100%; margin: 5px;" @click="drawer = false; isNotComputer = true">机械类</el-card>
            </el-row>
            <el-row>
                <el-card shadow="hover" style="width: 100%; margin: 5px;" @click="drawer = false; isNotComputer = true">土木工程类</el-card>
            </el-row>
            <el-row>
                <el-card shadow="hover" style="width: 100%; margin: 5px;" @click="drawer = false; isNotComputer = true">电气工程类</el-card>
            </el-row>
        </el-drawer>
        <el-container>
            <el-aside width="350px" style="padding: 20px;">
                <el-row class="block">
                    <el-col>
                        <el-row>
                            <el-button type="primary" style="width: 100%; height: 50px;"
                                @click="this.uploadBookDialogVisible = true">
                                <el-icon size="20">
                                    <Upload />
                                </el-icon>
                                <div style="font-weight: 600; font-size: larger; margin-left: 10px;">上传书籍</div>
                            </el-button>
                        </el-row>
                        <el-row style="margin-top: 20px;">
                            <el-button type="primary" style="width: 100%; height: 50px;" @click="drawer = true">
                                <el-icon size="20">
                                    <More />
                                </el-icon>
                                <div style="font-weight: 600; font-size: larger; margin-left: 10px;">选择主题</div>
                            </el-button>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row class="block">
                    <el-col>
                        <el-row v-if="this.isNotComputer">
                            <el-empty />
                        </el-row>
                        <el-card shadow="never" v-else>
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
                        <el-row v-if="this.isNotComputer">
                            <el-empty />
                        </el-row>
                        <el-card shadow="never" v-else>
                            <template #header>
                                <div>
                                    <span style="font-size: larger; font-weight: 600;">Top Five Tags</span>
                                </div>
                            </template>
                            <div v-for="tag in topFiveTag" :key="tag">
                                <el-link :underline="false" :href="this.baseLocation + '/bookList?tag=' + String(tag.id)">
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
                        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                            <div style="font-size: x-large; font-weight: 600;">Top Three Books</div>
                            <el-link @click="gotoBookList">更多>></el-link>
                        </div>
                        <el-row v-if="this.isNotComputer">
                            <el-empty />
                        </el-row>
                        <el-row justify="center" v-else>
                            <el-col :span="18">
                                <el-carousel type="card" height="600px">
                                    <el-carousel-item v-for="book in this.topThreeBook" :key="book">
                                        <el-card @click="gotoBook(book.id)"
                                            :body-style="{ 'width': '100%', 'height': '550px', 'margin': '20px', 'padding': '0px', 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }">
                                            <el-image :src="this.$http.defaults.baseURL + book.bookCover" fit="cover"
                                                style="width: 200px; height: 300px;">
                                            </el-image>
                                            <el-descriptions size="small" :column=1 style="width: 200px; margin-top: 10px;">
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
                    </el-col>
                </el-row>
                <el-row class="block">
                    <el-col>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                            <div style="font-size: x-large; font-weight: 600;">Latest Five Books</div>
                            <el-link @click="gotoBookList">更多>></el-link>
                        </div>
                        <el-row v-if="this.isNotComputer">
                            <el-empty />
                        </el-row>
                        <el-row v-else>
                            <el-col>
                                <ul class="latestFiveBookList">
                                    <li class="latestFiveBook" type="none" v-for="book in latestFiveBook">
                                        <el-card @click="gotoBook(book.id)" style="margin: 10px; height: 500px;"
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
                        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                            <div style="font-size: x-large; font-weight: 600;">Recommended Books</div>
                            <el-link @click="gotoBookList">更多>></el-link>
                        </div>
                        <el-row v-if="this.isNotComputer">
                            <el-empty />
                        </el-row>
                        <el-row v-else>
                            <el-col>
                                <ul class="latestFiveBookList">
                                    <li class="latestFiveBook" type="none" v-for="book in recommendBook">
                                        <el-card @click="gotoBook(book.id)" style="margin: 10px; height: 500px;"
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
                        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                            <div style="font-size: x-large; font-weight: 600;">Top Five Groups</div>
                            <el-link @click="gotoGroupList">更多>></el-link>
                        </div>
                        <el-row v-if="this.isNotComputer">
                            <el-empty />
                        </el-row>
                        <el-row v-else>
                            <el-col>
                                <ul class="latestFiveBookList">
                                    <li class="latestFiveBook" type="none" v-for="group in topFiveGroup">
                                        <el-card @click="gotogroup(group.id)" style="margin: 10px; height: 250px;"
                                            :body-style="{ 'margin': '20px', 'padding': '0px', 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }">
                                            <el-avatar :src="this.$http.defaults.baseURL + group.avatar" :size="100"
                                                style="margin-bottom: 10px;">{{ group.username
                                                }}</el-avatar>
                                            <el-descriptions size="small" :column=1
                                                style="margin-left: 20px; margin-bottom: 10px;">
                                                <el-descriptions-item label="社团名">{{ group.name
                                                }}</el-descriptions-item>
                                                <el-descriptions-item label="创建者" v-if="group.nickname">{{ group.nickname
                                                }}</el-descriptions-item>
                                                <el-descriptions-item label="创建者" v-else>{{ group.username
                                                }}</el-descriptions-item>
                                                <el-descriptions-item label="创建时间">{{ group.createTime
                                                }}</el-descriptions-item>
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
    <el-dialog v-model="uploadBookDialogVisible" title="上传书籍" width="40%" :before-close="beforeUploadBookDialogClose">
        <div class="dialog">
            <el-upload class="bookcover-uploader" ref="uploadRef" action="http://localhost:8080/book/uploadBookCover"
                :headers=headers :show-file-list="false" accept=".png, .jpeg, .jpg, .gif, .PNG, .JPEG, .JPG, .GIF"
                :on-success="handleSuccess" :on-error="handleError" :on-exceed="handleExceed" :before-upload="beforeUpload"
                :limit=1>
                <img v-if="this.newBook.bookCover" :src="this.$http.defaults.baseURL + this.newBook.bookCover"
                    class="bookcover" />
                <el-icon v-else class="bookcover-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
            <el-form :model="newBook" :rules="uploadBookRules" label-position="left" label-width="80px" style="width: 100%;"
                ref="uploadBookFormRef">
                <el-form-item label="书名" prop="name">
                    <el-input v-model="newBook.name"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="author">
                    <el-input v-model="newBook.author"></el-input>
                </el-form-item>
                <el-form-item label="出版社" prop="publisher">
                    <el-input v-model="newBook.publisher"></el-input>
                </el-form-item>
                <el-form-item label="出版时间" prop="publishTime">
                    <el-date-picker v-model="newBook.publishTime" type="month" value-format="YYYY-MM" />
                </el-form-item>
                <el-form-item label="译者" prop="translator">
                    <el-input v-model="newBook.translator"></el-input>
                </el-form-item>
                <el-form-item label="ISBN" prop="isbn">
                    <el-input v-model="newBook.isbn"></el-input>
                </el-form-item>
                <el-form-item label="作者简介" prop="authorIntruduction">
                    <el-input v-model="newBook.authorIntroduction" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="书籍简介" prop="bookIntroduction">
                    <el-input v-model="newBook.bookIntroduction" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <el-row justify="center" style="width: 100%; margin-top: 10px;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onUploadBook">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelUploadBook">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
import myHead from '../components/myHead.vue'
import { View } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
export default {
    components: { myHead },
    data() {
        return {
            baseLocation: null,
            topTenBook: [],
            topThreeBook: [],
            topFiveTag: [],
            latestFiveBook: [],
            recommendBook: [],
            topFiveGroup: [],
            avatar: JSON.parse(sessionStorage.getItem('avatar')),
            uploadBookDialogVisible: false,
            newBook: {
                name: null,
                bookCover: null,
                author: null,
                publisher: null,
                publishTime: null,
                translator: null,
                isbn: null,
                authorIntroduction: null,
                bookIntroduction: null,
                uploadUser: null
            },
            headers: {
                token: null,
            },
            uploadBookRules: {
                name: [{ required: true, message: '不能为空', trigger: 'blur' }],
                author: [{ required: true, message: '不能为空', trigger: 'blur' }],
                publisher: [{ required: true, message: '不能为空', trigger: 'blur' }]
            },
            userId: null,
            drawer: false,
            isNotComputer: false
        }
    },
    async mounted() {
        this.userId = JSON.parse(sessionStorage.getItem('id'))
        this.headers.token = JSON.parse(sessionStorage.getItem('token'))
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
        const { data: topFiveGroupRes } = await this.$http.get('/group/topFiveGroup')
        this.topFiveGroup = topFiveGroupRes.data.groupList
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
        gotoBookList() {
            this.$router.push('/bookList')
        },
        gotoGroupList() {
            this.$router.push('/groupList')
        },
        gotogroup(groupId) {
            const url = String(window.location.href)
            const baseURL = url.split('/')[0]
            const newURL = baseURL + '/group?groupId=' + String(groupId)
            window.location.href = newURL
        },
        handleSuccess(responce, uploadFile, uploadFiles) {
            if (responce.code === 1) {
                this.newBook.bookCover = responce.data.path
            }
        },
        handleError(error, uploadFile, uploadFiles) {
            console.log(error)
            ElMessage({
                message: '上传失败！',
                type: 'error'
            })
        },
        handleExceed(files, uploadFiles) {
            this.$refs.uploadRef.clearFiles()
            const file = files[0]
            this.$refs.uploadRef.handleStart(file)
            this.$refs.uploadRef.submit()
        },
        beforeUpload(rawFile) {
            if (rawFile.type !== 'image/png' && rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/gif') {
                ElMessage({
                    message: '文件格式不正确',
                    type: 'error'
                })
                return false
            } else if (rawFile.size / 1024 / 1024 > 2) {
                ElMessage({
                    message: '文件不能超过2M',
                    type: 'error'
                })
                return false
            }
            return true
        },
        onUploadBook() {
            this.$refs.uploadBookFormRef.validate(async (valid) => {
                if (!valid) return
                const { data: res } = await this.$http.post('/book/newBook', this.newBook)
                if (res.code === 1) {
                    ElMessage({
                        message: res.message,
                        type: 'success'
                    })
                    const { data: latestFiveBookRes } = await this.$http.get('/book/latestFiveBook')
                    this.latestFiveBook = latestFiveBookRes.data.bookList
                    this.beforeUploadBookDialogClose()
                } else {
                    ElMessage({
                        message: res.message,
                        type: 'error'
                    })
                }
            })
        },
        onCancelUploadBook() {
            this.newBook = {
                name: null,
                bookCover: null,
                author: null,
                publisher: null,
                publishTime: null,
                translator: null,
                isbn: null,
                authorIntroduction: null,
                bookIntroduction: null,
                uploadUser: null
            }
        },
        beforeUploadBookDialogClose(done) {
            this.onCancelUploadBook()
            this.uploadBookDialogVisible = false
        }
    }
}
</script>

<style scoped>
.block {
    margin: 20px;
    padding: 20px;

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

.dialog {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.bookcover-uploader {
    width: 200px;
    height: 200px;
    border: 2px dashed var(--el-border-color);
    margin: 20px;
}

.bookcover-uploader:hover {
    border-color: var(--el-color-primary);
}

.bookcover {
    width: 200px;
    height: 200px;
    object-fit: cover;
}

.bookcover-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    text-align: center;
}
</style>