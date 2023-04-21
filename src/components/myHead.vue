<template>
    <!-- <el-container>
        <el-header> -->
    <el-row justify="space-around">
        <el-col :span="4" style="display: flex; justify-content: center; align-items: center;">
            <a class="title" @click="this.$router.push('/')">阅读论坛</a>
        </el-col>
        <el-col :span="12" style="display: flex; justify-content: center; align-items: center;">
            <el-row justify="space-between" style="flex-grow: 1;">
                <el-col :span="20">
                    <el-input v-model="this.keyword"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button @click="search">搜索</el-button>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="2" style="display: flex; justify-content: center; align-items: center;">
            <el-popover>
                <template #reference>
                    <el-avatar :src="this.$http.defaults.baseURL + this.userInfo.avatar">{{ this.userInfo.username
                    }}</el-avatar>
                </template>
                <el-row>
                    <el-col v-if="this.userInfo.nickname !== null"
                        style="display: flex; justify-content: center; font-size: large; font-weight: 600;">
                        {{ this.userInfo.nickname }}
                    </el-col>
                    <el-col v-else>
                        {{ this.userInfo.username }}
                    </el-col>
                </el-row>
                <el-divider />
                <el-row style="font-size: large; font-weight: 600;">
                    <el-col :span="8" style="display: flex; justify-content: center;">{{ this.favouriteNum }}</el-col>
                    <el-col :span="8" style="display: flex; justify-content: center;">{{ this.followingNum }}</el-col>
                    <el-col :span="8" style="display: flex; justify-content: center;">{{ this.followerNum }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" style="display: flex; justify-content: center;">收藏</el-col>
                    <el-col :span="8" style="display: flex; justify-content: center;">关注</el-col>
                    <el-col :span="8" style="display: flex; justify-content: center;">粉丝</el-col>
                </el-row>
                <el-divider />
                <el-row justify="center">
                    <el-col :span="24" style="display: flex; justify-content: center;">
                        <el-button @click="this.$router.push('/home')">个人中心</el-button>
                    </el-col>
                </el-row>
                <el-row justify="center">
                    <el-col :span="24" style="display: flex; justify-content: center; margin-top: 10px;">
                        <el-button type="danger" @click="logout">退出登录</el-button>
                    </el-col>
                </el-row>
            </el-popover>
        </el-col>
    </el-row>
    <!-- </el-header>
        <el-container>
            <el-aside>

            </el-aside>
            <el-main>

            </el-main>
        </el-container>
    </el-container> -->
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            userInfo: {},
            favouriteNum: null,
            followingNum: null,
            followerNum: null,
            keyword: null
        }
    },
    async mounted() {
        this.userInfo.username = JSON.parse(sessionStorage.getItem('username'))
        this.userInfo.avatar = JSON.parse(sessionStorage.getItem('avatar'))
        this.userInfo.nickname = JSON.parse(sessionStorage.getItem('nickname'))
        this.userInfo.gender = JSON.parse(sessionStorage.getItem('gender'))
        this.userInfo.birthday = JSON.parse(sessionStorage.getItem('birthday'))
        this.userInfo.phone = JSON.parse(sessionStorage.getItem('phone'))
        this.userInfo.email = JSON.parse(sessionStorage.getItem('email'))
        this.userInfo.location = JSON.parse(sessionStorage.getItem('location'))
        this.userInfo.bio = JSON.parse(sessionStorage.getItem('bio'))
        this.userInfo.groupId = JSON.parse(sessionStorage.getItem('groupId'))
        this.userInfo.groupManager = JSON.parse(sessionStorage.getItem('groupManager'))
        const { data: res } = await this.$http.get('/user/num')
        this.favouriteNum = res.data.favouriteNum
        this.followingNum = res.data.followingNum
        this.followerNum = res.data.followerNum
    },
    methods: {
        logout() {
            this.$cookies.remove('token')
            sessionStorage.clear()
            this.$router.push('/login')
        },
        search() {
            if (this.keyword === null || this.keyword === '') {
                ElMessage({
                    message: '搜索框为空！',
                    type: 'error'
                })
            } else {
                const url = String(window.location.href)
                const baseURL = url.split('/')[0]
                const newURL = baseURL + '/search?keyword=' + this.keyword
                window.location.href = newURL
                // this.$router.push('/search?keyword=' + this.keyword)
            }
        }
    }
}
</script>

<style scoped>
.title {
    font-size: xx-large;
    font-weight: 600;
    user-select: none;
}
</style>