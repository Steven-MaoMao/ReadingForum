<template>
    <el-container>
        <el-header height="auto" style="padding: 20px; box-shadow: var(--el-box-shadow-lighter);">
            <myHead :avatar="avatar"></myHead>
        </el-header>
        <div class="notice">
            <marquee behavior="scroll" direction="left" scrollamount="5">
                社团公告：{{ this.groupInfo.notice }}
            </marquee>
        </div>
        <el-container>
            <el-aside width="350px" style="margin-top: 20px;">
                <div class="container">
                    <el-row class="block" style="width: 90%;">
                        <el-col>
                            <el-card shadow="never">
                                <template #header>
                                    <div>
                                        <span style="font-size: larger; font-weight: 600;">Group Members</span>
                                    </div>
                                </template>
                                <el-row v-for="user in groupMember" :key="user">
                                    <el-col :span="6">
                                        <el-avatar :src="this.$http.defaults.baseURL + user.avatar">{{
                                            user.username
                                        }}</el-avatar>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-link :href="this.baseLocation + '/user?userId=' + String(user.id)"
                                            v-if="user.nickname" style="height: 100%;">{{ user.nickname }}</el-link>
                                        <el-link :href="this.baseLocation + '/user?userId=' + String(user.id)" v-else
                                            style="height: 100%;">{{
                                                user.username }}</el-link>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button @click="setGroupManager(user.id)" v-if="user.groupManager === false"
                                            style="height: 100%;"
                                            :disabled="this.groupInfo.createUser !== this.userId || user.id === this.groupInfo.createUser">
                                            <el-icon>
                                                <Star />
                                            </el-icon>
                                        </el-button>
                                        <el-button type="primary" @click="dismissGroupManager(user.id)" v-else
                                            style="height: 100%;"
                                            :disabled="this.groupInfo.createUser !== this.userId || user.id === this.groupInfo.createUser">
                                            <el-icon>
                                                <StarFilled />
                                            </el-icon>
                                        </el-button>
                                    </el-col>
                                    <el-divider />
                                </el-row>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-row class="block" style="width: 90%;">
                        <el-col>
                            <el-card shadow="never">
                                <template #header>
                                    <div>
                                        <span style="font-size: larger; font-weight: 600;">Popular Favourite Book</span>
                                    </div>
                                </template>
                                <div v-for="book in topTenBook" :key="book">
                                    <el-link :underline="false"
                                        :href="this.baseLocation + '/book?bookId=' + String(book.id)">
                                        <el-icon class="el-icon--left">
                                            <View />
                                        </el-icon>{{ book.name }}
                                    </el-link>
                                    <el-divider />
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </el-aside>
            <div class="container">
                <el-main>
                    <el-row class="block">
                        <el-col>
                            <el-row justify="center" style="margin-bottom: 40px;">
                                <el-col :span="20">
                                    <el-avatar :size="100" shape="square" fit="cover"
                                        :src="this.$http.defaults.baseURL + this.groupInfo.avatar">
                                        {{ this.groupInfo.username }}
                                    </el-avatar>
                                </el-col>
                                <el-col :span="2">
                                    <el-button @click="changeAvatarDialogVisible = true"
                                        :disabled="!this.groupManager">上传头像</el-button>
                                </el-col>
                            </el-row>
                            <el-row justify="center">
                                <el-col :span="20">
                                    <el-descriptions title="社团信息">
                                        <el-descriptions-item label="社团名">{{ groupInfo.name }}</el-descriptions-item>
                                        <el-descriptions-item label="创建人" v-if="groupInfo.nickname">{{ groupInfo.nickname
                                        }}</el-descriptions-item>
                                        <el-descriptions-item label="创建人" v-else>{{ groupInfo.username
                                        }}</el-descriptions-item>
                                        <el-descriptions-item label="创建时间">{{ groupInfo.createTime }}</el-descriptions-item>
                                        <el-descriptions-item label="社团简介">{{ groupInfo.introduction
                                        }}</el-descriptions-item>
                                    </el-descriptions>
                                </el-col>
                                <el-col :span="2"
                                    style="display: flex; flex-direction: column; justify-content: space-between;">
                                    <el-row style="padding-bottom: 5px;">
                                        <el-col>
                                            <el-button @click="changeGroupIntroductionDialogVisible = true"
                                                :disabled="!this.groupManager">修改简介</el-button>
                                        </el-col>
                                    </el-row>
                                    <el-row style="padding-bottom: 5px;">
                                        <el-col>
                                            <el-button @click="changeGroupNoticeDialogVisible = true"
                                                :disabled="!this.groupManager">修改公告</el-button>
                                        </el-col>
                                    </el-row>
                                    <el-row style="padding-bottom: 5px;">
                                        <el-col>
                                            <el-button type="danger" @click="dropout"
                                                :disabled="this.groupInfo.createUser === this.userId">退出社团</el-button>
                                        </el-col>
                                    </el-row>
                                    <el-row style="padding-bottom: 5px;">
                                        <el-col>
                                            <el-button type="danger" @click="dissolve"
                                                :disabled="this.groupInfo.createUser !== this.userId">解散社团</el-button>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row class="block">
                        <el-col :span="5" style="padding-top: 10px; padding-left: 10px;">
                            <el-menu default-active="-1-0" @select="selectMenu">
                                <el-sub-menu index="-1">
                                    <template #title>
                                        <el-icon>
                                            <ChatLineSquare />
                                        </el-icon>
                                        <span>全体成员</span>
                                    </template>
                                    <el-menu-iten-group>
                                        <el-menu-item index="-1-0">
                                            <el-icon>
                                                <Reading />
                                            </el-icon>
                                            <span>收藏书籍</span>
                                        </el-menu-item>
                                    </el-menu-iten-group>
                                </el-sub-menu>
                                <el-sub-menu v-for="(subgroup, index) in subgroupList" :index="index">
                                    <template #title>
                                        <el-icon>
                                            <ChatLineSquare />
                                        </el-icon>
                                        <span>{{ subgroup.name }}</span>
                                    </template>
                                    <el-menu-iten-group>
                                        <el-menu-item :index="index + '-0'">
                                            <el-icon>
                                                <User />
                                            </el-icon>
                                            <span>小组成员</span>
                                        </el-menu-item>
                                        <el-menu-item :index="index + '-00'">
                                            <el-icon>
                                                <Plus />
                                            </el-icon>
                                            <span>添加组件</span>
                                        </el-menu-item>
                                        <el-menu-item :index="index + '-000'">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                            <span>删除组件</span>
                                        </el-menu-item>
                                    </el-menu-iten-group>
                                </el-sub-menu>
                                <el-menu-item index="-2">
                                    <el-icon>
                                        <Plus />
                                    </el-icon>
                                    <span>添加小组</span>
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                        <el-col :span="18" :offset="1">
                            <div v-if="this.selectMenuIndex == '-1-0'">
                                <el-row>
                                    <el-col>
                                        <ul class="groupFavouriteList">
                                            <li class="groupFavourite" type="none"
                                                v-for="groupFavourite in groupFavouriteList">
                                                <el-card @click="gotoBook(groupFavourite.id)"
                                                    style="margin: 10px; height: 500px;"
                                                    :body-style="{ 'margin': '20px', 'padding': '0px', 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }">
                                                    <el-image :src="this.$http.defaults.baseURL + groupFavourite.bookCover"
                                                        fit="cover" style="width: 100%; height: 250px;">
                                                    </el-image>
                                                    <el-descriptions size="small" :column=1 style="margin-left: 20px;">
                                                        <el-descriptions-item label="书名">{{ groupFavourite.name
                                                        }}</el-descriptions-item>
                                                        <el-descriptions-item label="作者">{{ groupFavourite.author
                                                        }}</el-descriptions-item>
                                                        <el-descriptions-item label="出版社">{{ groupFavourite.publisher
                                                        }}</el-descriptions-item>
                                                        <el-descriptions-item label="标签">
                                                            <div style="display: flex; flex-direction: column;">
                                                                <el-tag v-for="tag in groupFavourite.tags" :round="true"
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
                                <el-row style="margin-top: 20px;">
                                    <el-col>
                                        <div style="flex-grow: 1; display: flex; justify-content: center;">
                                            <el-pagination background layout="prev, pager, next" :page-size=16
                                                :total=totalGroupFavourite @current-change="groupFavouriteCurrentChange" />
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-2) == '-0'">
                                <el-row style="margin-top: 20px;">
                                    <el-col :span="3" :offset="1">
                                        小组改名：
                                    </el-col>
                                    <el-col :span="9">
                                        <el-input v-model="this.newSubgroupName"></el-input>
                                    </el-col>
                                    <el-col :span="2" :offset="1">
                                        <el-button
                                            @click="onUpdateSubgourpName(this.subgroupList[this.selectMenuIndex.slice(0, 1)].id)"
                                            type="primary">确认</el-button>
                                    </el-col>
                                    <el-col :span="2">
                                        <el-button @click="onCancelUpdateSubgourpName">取消</el-button>
                                    </el-col>
                                    <el-col :span="4" :offset="2">
                                        <el-button type="danger"
                                            @click="onDeleteSubgourpName(this.subgroupList[this.selectMenuIndex.slice(0, 1)].id)">解散小组</el-button>
                                    </el-col>
                                </el-row>
                                <el-divider />
                                <el-row>
                                    <el-col>
                                        <ul class="subgroupMemberList">
                                            <li type="none" class="subgroupMember"
                                                v-for="subgroupMember in this.subgroupList[this.selectMenuIndex.slice(0, 1)].subgroupMember">
                                                <el-card @click="gotoUser(subgroupMember.id)" style="margin: 10px;">
                                                    <el-row>
                                                        <el-col :span="12">
                                                            <el-avatar :size="50"
                                                                :src="this.$http.defaults.baseURL + subgroupMember.avatar">
                                                                {{ subgroupMember.username }}
                                                            </el-avatar>
                                                        </el-col>
                                                        <el-col :span="12">
                                                            <div v-if="subgroupMember.nickname">
                                                                {{ subgroupMember.nickname }}
                                                            </div>
                                                            <div v-else>
                                                                {{ subgroupMember.username }}
                                                            </div>
                                                        </el-col>
                                                    </el-row>
                                                </el-card>
                                            </li>
                                        </ul>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-3) == '-00'">
                                <el-tabs>
                                    <el-tab-pane label="User">User</el-tab-pane>
                                    <el-tab-pane label="Config">Config</el-tab-pane>
                                    <el-tab-pane label="Role">Role</el-tab-pane>
                                    <el-tab-pane label="Task">Task</el-tab-pane>
                                </el-tabs>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-4) == '-000'">

                            </div>
                            <div v-else-if="this.selectMenuIndex == '-2'">
                                <el-row style="margin-top: 20px;">
                                    <el-col :span="3" :offset="1">
                                        <span>小组名称：</span>
                                    </el-col>
                                    <el-col :span="13">
                                        <el-input v-model="newSubgroup.name"></el-input>
                                    </el-col>
                                </el-row>
                                <el-divider />
                                <el-row style="margin-top: 20px; margin-bottom: 20px;">
                                    <el-col>
                                        <el-transfer ref="newSubgroupMember" v-model="newSubgroup.member" :props="{
                                                key: 'id',
                                                label: 'username',
                                            }" :data="groupMember" :titles="['社团成员', '小组成员']" />
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <el-button type="primary" @click="onCreateSubgroup">创建</el-button>
                                    </el-col>
                                    <el-col :span="2">
                                        <el-button @click="onCancelCreateSubgroup">取消</el-button>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </el-main>
            </div>
        </el-container>
    </el-container>
    <el-dialog v-model="changeAvatarDialogVisible" title="上传头像" width="30%">
        <div class="dialog">
            <el-upload class="avatar-uploader" ref="uploadRef" action="http://localhost:8080/group/uploadAvatar"
                :headers=headers :show-file-list="false" accept=".png, .jpeg, .jpg, .gif, .PNG, .JPEG, .JPG, .GIF"
                :on-success="handleSuccess" :on-error="handleError" :on-exceed="handleExceed" :before-upload="beforeUpload"
                :limit=1>
                <img v-if="this.groupInfo.avatar" :src="this.$http.defaults.baseURL + this.groupInfo.avatar"
                    class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
            <span style="font-size: xx-small;">头像文件格式限制.png .jpeg .jpg .gif，大小限制2M</span>
        </div>
    </el-dialog>
    <el-dialog v-model="changeGroupIntroductionDialogVisible" title="修改简介" width="30%">
        <div class="dialog">
            <el-row justify="center" style="width: 70%;">
                <el-col :span="6">
                    <div style="margin-bottom: 20px;">社团简介</div>
                </el-col>
                <el-col :span="18">
                    <el-input type="textarea" v-model="this.newIntroduction" />
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 100%; margin-top: 20px;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onChangeIntroduction">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelChangeIntroduction">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
    <el-dialog v-model="changeGroupNoticeDialogVisible" title="修改简介" width="30%">
        <div class="dialog">
            <el-row justify="center" style="width: 70%;">
                <el-col :span="6">
                    <div style="margin-bottom: 20px;">社团公告</div>
                </el-col>
                <el-col :span="18">
                    <el-input type="textarea" v-model="this.newNotice" />
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 100%; margin-top: 20px;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onChangeNotice">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelChangeNotice">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
import myHead from '../components/myHead.vue'
import { ElMessage } from 'element-plus'
export default {
    components: { myHead },
    data() {
        return {
            userId: JSON.parse(sessionStorage.getItem('id')),
            groupId: null,
            groupManager: false,
            groupInfo: {},
            changeAvatarDialogVisible: false,
            changeGroupIntroductionDialogVisible: false,
            changeGroupNoticeDialogVisible: false,
            headers: {
                token: null,
            },
            avatar: JSON.parse(sessionStorage.getItem('avatar')),
            userId: null,
            newIntroduction: null,
            newNotice: null,
            groupMember: [],
            baseLocation: null,
            selectMenuIndex: '-1-0',
            groupFavouriteList: [],
            totalGroupFavourite: null,
            newSubgroup: {},
            newSubgroupName: null,
            topTenBook: [],
            subgroupList: [{
                // id: null,
                // name: null,
                // time: null,
                // groupId: null,
                // subgroupMember: [{
                //     id: null,
                //     username: null,
                //     nickname: null,
                //     avatar: null
                // }],
                // subgroupModule: []
            }]
        }
    },
    async mounted() {
        this.headers.token = JSON.parse(sessionStorage.getItem('token'))
        this.groupId = JSON.parse(sessionStorage.getItem('groupId'))
        this.groupManager = JSON.parse(sessionStorage.getItem('groupManager'))
        const { data: groupInfoRes } = await this.$http.get('/group/selectById?groupId=' + String(this.groupId))
        this.groupInfo = groupInfoRes.data.groupInfo
        this.userId = JSON.parse(sessionStorage.getItem('id'))
        this.newIntroduction = this.groupInfo.introduction
        this.newNotice = this.groupInfo.notice
        const { data: groupMemberRes } = await this.$http.get('/user/groupMember')
        this.groupMember = groupMemberRes.data.userList
        this.baseLocation = String(window.location.href).split('/')[0]
        const { data: groupFavouriteRes } = await this.$http.get('/group/groupFavouriteByIdPage?groupId=' + this.groupId + '&page=1')
        this.groupFavouriteList = groupFavouriteRes.data.bookList
        this.totalGroupFavourite = groupFavouriteRes.data.num
        const { data: subgroupListRes } = await this.$http.get('/subgroup/getSubgroup?groupId=' + String(this.groupId))
        this.subgroupList = subgroupListRes.data.subgroupList
        const { data: topTenBookRes } = await this.$http.get('/group/topTenFavourite?groupId=' + String(this.groupId))
        this.topTenBook = topTenBookRes.data.bookList
    },
    methods: {
        handleSuccess(responce, uploadFile, uploadFiles) {
            if (responce.code === 1) {
                ElMessage({
                    message: '上传成功！',
                    type: 'success'
                })
                this.groupInfo.avatar = responce.data.path
            } else {
                ElMessage({
                    message: '上传失败！',
                    type: 'error'
                })
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
        async dropout() {
            const { data: res } = await this.$http.put('/user/quitGroup')
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
            sessionStorage.setItem('groupId', JSON.stringify(0))
            sessionStorage.setItem('groupManager', JSON.stringify(0))
            this.$router.push('/')
        },
        async dissolve() {
            const { data: res } = await this.$http.delete('/group/dissolveGroup')
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
            sessionStorage.setItem('groupId', JSON.stringify(0))
            sessionStorage.setItem('groupManager', JSON.stringify(0))
            this.$router.push('/')
        },
        async onChangeIntroduction() {
            this.groupInfo.introduction = this.newIntroduction
            const { data: res } = await this.$http.put('/group/uploadGroup', this.groupInfo)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.changeGroupIntroductionDialogVisible = false
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCancelChangeIntroduction() {
            this.newIntroduction = this.groupInfo.introduction
        },
        async onChangeNotice() {
            this.groupInfo.notice = this.newNotice
            const { data: res } = await this.$http.put('/group/uploadGroup', this.groupInfo)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.changeGroupNoticeDialogVisible = false
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCancelChangeNotice() {
            this.newNotice = this.groupInfo.notice
        },
        async setGroupManager(id) {
            const { data: res } = await this.$http.put('/user/setGroupManager?userId=' + String(id))
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                for (var member in this.groupMember) {
                    if (this.groupMember[member].id === id) {
                        this.groupMember[member].groupManager = true
                        break
                    }
                }
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async dismissGroupManager(id) {
            const { data: res } = await this.$http.put('/user/dismissGroupManager?userId=' + String(id))
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                for (var member in this.groupMember) {
                    if (this.groupMember[member].id === id) {
                        this.groupMember[member].groupManager = false
                        break
                    }
                }
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async selectMenu(index) {
            this.selectMenuIndex = index
            console.log(this.selectMenuIndex)
            if (index == '-1-0') {
                const { data: groupFavouriteRes } = await this.$http.get('/group/groupFavouriteByIdPage?groupId=' + this.groupId + '&page=1')
                this.groupFavouriteList = groupFavouriteRes.data.bookList
                this.totalGroupFavourite = groupFavouriteRes.data.num
            }
        },
        async groupFavouriteCurrentChange(page) {
            const { data: groupFavouriteRes } = await this.$http.get('/group/groupFavouriteByIdPage?groupId=' + this.groupId + '&page=' + String(page))
            this.groupFavouriteList = groupFavouriteRes.data.bookList
            this.totalGroupFavourite = groupFavouriteRes.data.num
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
        async onCreateSubgroup() {
            const { data: res } = await this.$http.post('/subgroup/createSubgroup?name=' + this.newSubgroup.name + '&groupId=' + this.groupId, this.newSubgroup.member)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.onCancelCreateSubgroup()
                const { data: subgroupListRes } = await this.$http.get('/subgroup/getSubgroup?groupId=' + String(this.groupId))
                this.subgroupList = subgroupListRes.data.subgroupList
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCancelCreateSubgroup() {
            this.newSubgroup.name = null
            this.newSubgroup.member = []
        },
        async onUpdateSubgourpName(id) {
            const { data: res } = await this.$http.put('/subgroup/updateSubgroupName?id=' + id + '&name=' + this.newSubgroupName)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                for (const index in this.subgroupList) {
                    if (this.subgroupList[index].id == id) {
                        this.subgroupList[index].name = this.newSubgroupName
                        break
                    }
                }
                this.onCancelUpdateSubgourpName()
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCancelUpdateSubgourpName() {
            this.newSubgroupName = null
        },
        async onDeleteSubgourpName(id) {
            const { data: res } = await this.$http.delete('/subgroup/deleteSubgroup?id=' + id)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: subgroupListRes } = await this.$http.get('/subgroup/getSubgroup?groupId=' + String(this.groupId))
                this.subgroupList = subgroupListRes.data.subgroupList
                this.selectMenuIndex = '-1-0'
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
.notice {
    margin-top: 20px;
    padding: 10px;
    font-size: larger;
    box-shadow: var(--el-box-shadow-lighter);
}

.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.el-main {
    width: 100%;
}

.block {
    margin: 20px;
    padding: 20px;
    box-shadow: var(--el-box-shadow-lighter);
}

.dialog {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.avatar-uploader {
    width: 200px;
    height: 200px;
    border: 2px dashed var(--el-border-color);
    margin: 50px;
}

.avatar-uploader:hover {
    border-color: var(--el-color-primary);
}

.avatar {
    width: 200px;
    height: 200px;
    object-fit: cover;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    text-align: center;
}

.groupFavouriteList {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    margin: 0%;
    padding: 0%;
}

.groupFavourite {
    width: 25%;
}

.subgroupMemberList {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    margin: 0%;
    padding: 0%;
}

.subgroupMember {
    width: 25%;
}
</style>