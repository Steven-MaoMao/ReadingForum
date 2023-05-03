<template>
    <el-container>
        <el-header height="auto" style="padding: 20px; box-shadow: var(--el-box-shadow-lighter);">
            <myHead :avatar="this.avatar"></myHead>
        </el-header>
        <div class="container">
            <el-main>
                <el-row class="block">
                    <el-col>
                        <el-row justify="center" style="margin-bottom: 40px;">
                            <el-col :span="20">
                                <el-avatar :size="100" shape="square" fit="cover"
                                    :src="this.$http.defaults.baseURL + this.userInfo.avatar">
                                    {{ this.userInfo.username }}
                                </el-avatar>
                            </el-col>
                            <el-col :span="2">
                                <el-button v-if="this.isFollowed === false" @click="follow">关注</el-button>
                                <el-button v-else @click="disFollow" type="danger">取消关注</el-button>
                            </el-col>
                        </el-row>
                        <el-row justify="center">
                            <el-col :span="24">
                                <el-descriptions title="个人信息">
                                    <el-descriptions-item label="用户名：">{{ userInfo.username }}</el-descriptions-item>
                                    <el-descriptions-item label="昵称：">{{ userInfo.nickname }}</el-descriptions-item>
                                    <el-descriptions-item label="性别：">{{ userInfo.gender }}</el-descriptions-item>
                                    <el-descriptions-item label="生日：">{{ userInfo.birthday }}</el-descriptions-item>
                                    <el-descriptions-item label="手机：">{{ userInfo.phone }}</el-descriptions-item>
                                    <el-descriptions-item label="邮箱：">{{ userInfo.email }}</el-descriptions-item>
                                    <el-descriptions-item label="地址：">{{ userInfo.location }}</el-descriptions-item>
                                    <el-descriptions-item label="个性签名：">{{ userInfo.bio }}</el-descriptions-item>
                                </el-descriptions>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row class="block">
                    <el-col>
                        <el-tabs v-model="activeName" stretch @tab-change="handleTabChange">
                            <el-tab-pane label="他的收藏" name="favourite">
                                <div v-if="this.totalFavourite === 0">
                                    <el-empty />
                                </div>
                                <el-row v-else>
                                    <el-col>
                                        <ul class="favouriteList">
                                            <li class="favourite" type="none" v-for="favourite in favouriteList">
                                                <el-card @click="gotoBook(favourite.id)"
                                                    style="margin: 10px; height: 600px;"
                                                    :body-style="{ 'margin': '20px', 'padding': '0px', 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }">
                                                    <el-image :src="this.$http.defaults.baseURL + favourite.bookCover"
                                                        fit="cover" style="width: 100%; height: 250px;">
                                                    </el-image>
                                                    <el-descriptions size="small" :column=1 style="margin-left: 20px;">
                                                        <el-descriptions-item label="书名">{{ favourite.name
                                                        }}</el-descriptions-item>
                                                        <el-descriptions-item label="作者">{{ favourite.author
                                                        }}</el-descriptions-item>
                                                        <el-descriptions-item label="出版社">{{ favourite.publisher
                                                        }}</el-descriptions-item>
                                                        <el-descriptions-item label="标签">
                                                            <div style="display: flex; flex-direction: column;">
                                                                <el-tag v-for="tag in favourite.tags" :round="true"
                                                                    size="small">
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
                                                :total=totalFavourite @current-change="favouriteCurrentChange" />
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                            <el-tab-pane label="他的关注" name="following">
                                <div v-if="this.totalFollowing === 0">
                                    <el-empty />
                                </div>
                                <el-row v-else v-for="following in followingList">
                                    <el-col :span="24">
                                        <el-card shadow="hover" class="following" @click="gotoUser(following.id)">
                                            <el-row style="width: 100%;">
                                                <el-col :span="2">
                                                    <el-avatar :size="50"
                                                        :src="this.$http.defaults.baseURL + following.avatar">
                                                        {{ following.username }}
                                                    </el-avatar>
                                                </el-col>
                                                <el-col :span="22" v-if="following.nickname">
                                                    {{ following.nickname }}
                                                </el-col>
                                                <el-col :span="22" v-else>
                                                    {{ following.username }}
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <div style="flex-grow: 1; display: flex; justify-content: center;">
                                            <el-pagination background layout="prev, pager, next" :page-size=10
                                                :total=totalFollowing @current-change="followingCurrentChange" />
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                            <el-tab-pane label="他的粉丝" name="follower">
                                <div v-if="this.totalFollower === 0">
                                    <el-empty />
                                </div>
                                <el-row v-else v-for="follower in followerList">
                                    <el-col :span="24">
                                        <el-card shadow="hover" class="following" @click="gotoUser(follower.id)">
                                            <el-row style="width: 100%;">
                                                <el-col :span="2">
                                                    <el-avatar :size="50"
                                                        :src="this.$http.defaults.baseURL + follower.avatar">
                                                        {{ follower.username }}
                                                    </el-avatar>
                                                </el-col>
                                                <el-col :span="22" v-if="follower.nickname">
                                                    {{ follower.nickname }}
                                                </el-col>
                                                <el-col :span="22" v-else>
                                                    {{ follower.username }}
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <div style="flex-grow: 1; display: flex; justify-content: center;">
                                            <el-pagination background layout="prev, pager, next" :page-size=10
                                                :total=totalFollower @current-change="followerCurrentChange" />
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
import { ElMessage } from 'element-plus'
import myHead from '../components/myHead.vue'
export default {
    components: { myHead },
    data() {
        return {
            userId: null,
            userInfo: {
                username: null,
                avatar: null,
                nickname: null,
                gender: null,
                birthday: null,
                phone: null,
                email: null,
                location: null,
                bio: null
            },
            activeName: 'favourite',
            favouriteList: [],
            totalFavourite: null,
            followingList: [],
            totalFollowing: null,
            followerList: [],
            totalFollower: null,
            isFollowed: false,
            avatar: JSON.parse(sessionStorage.getItem('avatar'))
        }
    },
    async mounted() {
        this.userId = this.$route.query.userId
        const { data: res } = await this.$http.get('/user/userInfoById?userId=' + this.userId)
        this.userInfo = res.data.userInfo
        const { data: favouriteRes } = await this.$http.get('/user/favouriteByPageId?id=' + this.userId + '&page=1')
        this.favouriteList = favouriteRes.data.bookList
        this.totalFavourite = favouriteRes.data.num
        const { data: followingRes } = await this.$http.get('/user/followingByPageId?followerId=' + this.userId + '&page=1')
        this.followingList = followingRes.data.userList
        this.totalFollowing = followingRes.data.num
        const { data: followerRes } = await this.$http.get('/user/followerByPageId?followingId=' + this.userId + '&page=1')
        this.followerList = followerRes.data.userList
        this.totalFollower = followerRes.data.num
        const { data: isFollowedRes } = await this.$http.get('/user/isFollowed?followingId=' + this.userId)
        if (isFollowedRes.code === 1) {
            this.isFollowed = true
        }
    },
    methods: {
        handleTabChange(name) {
            console.log(name)
        },
        async favouriteCurrentChange(page) {
            const { data: res } = await this.$http.get('/user/favouriteByPage?id=' + this.userId + '&page=' + page)
            this.favouriteList = res.data.bookList
            this.totalFavourite = res.data.num
        },
        async followingCurrentChange(page) {
            const { data: res } = await this.$http.get('/user/followingByPage?id=' + this.userId + '&page=' + page)
            this.followingList = res.data.userList
            this.totalFollowing = res.data.num
        },
        async followerCurrentChange(page) {
            const { data: res } = await this.$http.get('/user/followerByPage?id=' + this.userId + '&page=' + page)
            this.followerList = res.data.userList
            this.totalFollower = res.data.num
        },
        async follow() {
            const { data: res } = await this.$http.post('/user/follow', { 'followingId': this.userId })
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.isFollowed = true
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async disFollow() {
            const { data: res } = await this.$http.delete('/user/deleteFollowing?followingId=' + this.userId)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.isFollowed = false
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
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

.favouriteList {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    margin: 0%;
    padding: 0%;
}

.favourite {
    width: 25%;
}

.following {
    margin: 10px;
}
</style>