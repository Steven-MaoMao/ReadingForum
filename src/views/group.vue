<template>
    <el-container>
        <el-header height="auto" style="padding: 20px;  ">
            <myHead :avatar="avatar"></myHead>
        </el-header>
        <div class="notice" v-if="this.isGroupMember">
            <el-divider />
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
                                    <el-col :span="6" v-if="this.isGroupMember">
                                        <el-button @click="setGroupManager(user.id)" v-if="user.groupManager === false"
                                            style="height: 100%;"
                                            :disabled="!this.groupManager || user.id == this.groupInfo.createUser">
                                            <el-icon>
                                                <Star />
                                            </el-icon>
                                        </el-button>
                                        <el-button type="primary" @click="dismissGroupManager(user.id)" v-else
                                            style="height: 100%;"
                                            :disabled="!this.groupManager || user.id == this.groupInfo.createUser">
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
                    <el-row class="block" style="width: 90%;" v-if="this.groupManager && this.groupApplicant.length > 0">
                        <el-col>
                            <el-card shadow="never">
                                <template #header>
                                    <div>
                                        <span style="font-size: larger; font-weight: 600;">Group Applicants</span>
                                    </div>
                                </template>
                                <el-row v-for="user in groupApplicant" :key="user">
                                    <el-col :span="6">
                                        <el-avatar :src="this.$http.defaults.baseURL + user.avatar">{{
                                            user.username
                                        }}</el-avatar>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-link :href="this.baseLocation + '/user?userId=' + String(user.id)"
                                            v-if="user.nickname" style="height: 100%;">{{ user.nickname }}</el-link>
                                        <el-link :href="this.baseLocation + '/user?userId=' + String(user.id)" v-else
                                            style="height: 100%;">{{
                                                user.username }}</el-link>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button type="primary" @click="joinGroupPermit(user.id)" style="height: 100%;">
                                            <el-icon size="20">
                                                <Check />
                                            </el-icon>
                                        </el-button>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button type="danger" @click="joinGroupReject(user.id)" style="height: 100%;">
                                            <el-icon size="20">
                                                <Close />
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
                                <el-col :span="2" v-if="this.isGroupMember">
                                    <el-button @click="changeAvatarDialogVisible = true"
                                        :disabled="!this.groupManager">上传头像</el-button>
                                </el-col>
                                <el-col :span="2" v-else>
                                    <el-button @click="joinGroup">加入社团</el-button>
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
                                <el-col :span="2" v-if="this.isGroupMember"
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
                                <!-- <el-sub-menu index="-1">
                                    <template #title>
                                        <el-icon>
                                            <ChatLineSquare />
                                        </el-icon>
                                        <span>全体成员</span>
                                    </template>
                                    <el-menu-item-group> -->
                                <el-menu-item index="-1-0">
                                    <el-icon>
                                        <Reading />
                                    </el-icon>
                                    <span>收藏书籍</span>
                                </el-menu-item>
                                <!-- </el-menu-item-group>
                                </el-sub-menu> -->
                                <el-menu-item v-for="(subgroup, index) in subgroupList"
                                    :index="index + '-' + subgroup.frameId">
                                    <div v-if="subgroup.frameId == 1">
                                        <el-icon>
                                            <Bell />
                                        </el-icon>
                                    </div>
                                    <div v-else-if="subgroup.frameId == 2">
                                        <el-icon>
                                            <Star />
                                        </el-icon>
                                    </div>
                                    <div v-else-if="subgroup.frameId == 3">
                                        <el-icon>
                                            <Switch />
                                        </el-icon>
                                    </div>
                                    <div v-else-if="subgroup.frameId == 4">
                                        <el-icon>
                                            <ChatDotSquare />
                                        </el-icon>
                                    </div>
                                    <div v-else-if="subgroup.frameId == 5">
                                        <el-icon>
                                            <Location />
                                        </el-icon>
                                    </div>
                                    <div v-else-if="subgroup.frameId == 6">
                                        <el-icon>
                                            <Reading />
                                        </el-icon>
                                    </div>
                                    <div v-else-if="subgroup.frameId == 7">
                                        <el-icon>
                                            <Notebook />
                                        </el-icon>
                                    </div>
                                    <div v-else-if="subgroup.frameId == 8">
                                        <el-icon>
                                            <Star />
                                        </el-icon>
                                    </div>
                                    <div v-else-if="subgroup.frameId == 9">
                                        <el-icon>
                                            <Star />
                                        </el-icon>
                                    </div>
                                    <div v-else-if="subgroup.frameId == 10">
                                        <el-icon>
                                            <Star />
                                        </el-icon>
                                    </div>
                                    <div v-else-if="subgroup.frameId == 11">
                                        <el-icon>
                                            <Star />
                                        </el-icon>
                                    </div>
                                    <span>{{ subgroup.name }}</span>
                                </el-menu-item>
                                <!-- <el-sub-menu v-if="this.isGroupMember" v-for="(subgroup, index) in subgroupList"
                                    :index="index">
                                    <template #title>
                                        <el-icon>
                                            <ChatLineSquare />
                                        </el-icon>
                                        <span>{{ subgroup.name }}</span>
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item :index="index + '-0'">
                                            <el-icon>
                                                <User />
                                            </el-icon>
                                            <span>小组成员</span>
                                        </el-menu-item>
                                        <div v-for="md in subgroup.moduleList">
                                            <el-menu-item v-if="md.id == 1"
                                                :index="index + '-' + md.name + '-' + md.subgroupModuleId + '-1'">
                                                <el-icon>
                                                    <Bell />
                                                </el-icon>
                                                <span>{{ md.name }}</span>
                                            </el-menu-item>
                                            <el-menu-item v-else-if="md.id == 2"
                                                :index="index + '-' + md.name + '-' + md.subgroupModuleId + '-2'">
                                                <el-icon>
                                                    <Star />
                                                </el-icon>
                                                <span>{{ md.name }}</span>
                                            </el-menu-item>
                                            <el-menu-item v-else-if="md.id == 3"
                                                :index="index + '-' + md.name + '-' + md.subgroupModuleId + '-3'">
                                                <el-icon>
                                                    <Connection />
                                                </el-icon>
                                                <span>{{ md.name }}</span>
                                            </el-menu-item>
                                        </div>
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
                                    </el-menu-item-group>
                                </el-sub-menu> -->
                                <el-menu-item v-if="this.isGroupMember" index="-01">
                                    <el-icon>
                                        <Plus />
                                    </el-icon>
                                    <span>添加板块</span>
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                        <el-col :span="18" :offset="1">
                            <div v-if="this.selectMenuIndex == '-1-0'">
                                <el-row>
                                    <el-col>
                                        <el-button type="primary" size="large" style="margin: 10px;"
                                            @click="this.onGroupFavouriteDialogVisible" :disabled="!this.groupManager">
                                            <el-icon>
                                                <Plus />
                                            </el-icon>
                                            <span>
                                                收藏书籍
                                            </span>
                                        </el-button>
                                    </el-col>
                                </el-row>
                                <el-divider />
                                <el-row>
                                    <el-col>
                                        <ul class="groupFavouriteList">
                                            <li class="groupFavourite" type="none"
                                                v-for="groupFavourite in groupFavouriteList">
                                                <el-card @click="gotoBook(groupFavourite.id)"
                                                    style="margin: 10px; height: 600px;"
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
                            <!-- <div v-else-if="this.selectMenuIndex.slice(-2) == '-0'">
                                <el-row style="margin-top: 20px;">
                                    <el-col :span="3" :offset="1">
                                        小组改名：
                                    </el-col>
                                    <el-col :span="9">
                                        <el-input v-model="this.newSubgroupName"></el-input>
                                    </el-col>
                                    <el-col :span="2" :offset="1">
                                        <el-button
                                            @click="onUpdateSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)"
                                            type="primary">确认</el-button>
                                    </el-col>
                                    <el-col :span="2">
                                        <el-button @click="onCancelUpdateSubgourpName">取消</el-button>
                                    </el-col>
                                    <el-col :span="4" :offset="2">
                                        <el-button type="danger"
                                            @click="onDeleteSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)">解散小组</el-button>
                                    </el-col>
                                </el-row>
                                <el-divider />
                                <el-row>
                                    <el-col>
                                        <ul class="subgroupMemberList">
                                            <li type="none" class="subgroupMember"
                                                v-for="subgroupMember in this.subgroupList[this.selectMenuIndex.split('-')[0]].subgroupMember">
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
                            <div v-else-if="this.selectMenuIndex.slice(-2) == '-1'">
                                <subgroupNotice :subgroupId="this.subgroupList[this.selectMenuIndex.split('-')[0]].id"
                                    :moduleName="this.selectMenuIndex.split('-')[1]"
                                    :subgroupModuleId="this.selectMenuIndex.split('-')[2]">
                                </subgroupNotice>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-2) == '-2'">
                                <bookRecommend :subgroupId="this.subgroupList[this.selectMenuIndex.split('-')[0]].id"
                                    :moduleName="this.selectMenuIndex.split('-')[1]"
                                    :subgroupModuleId="this.selectMenuIndex.split('-')[2]">
                                </bookRecommend>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-2) == '-3'">
                                <subgroupVote :subgroupId="this.subgroupList[this.selectMenuIndex.split('-')[0]].id"
                                    :moduleName="this.selectMenuIndex.split('-')[1]"
                                    :subgroupModuleId="this.selectMenuIndex.split('-')[2]">
                                </subgroupVote>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-3) == '-00'">
                                <el-row style="margin-top: 20px;">
                                    <el-col :span="8">
                                        <el-select v-model="this.newModuleId" size="large">
                                            <el-option v-for="md in this.moduleList" :key="md.id" :label="md.name"
                                                :value="md.id" />
                                        </el-select>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-input v-model="this.newModuleName" size="large"></el-input>
                                    </el-col>
                                    <el-col :span="4" :offset="1">
                                        <el-button type="primary" size="large"
                                            @click="onAddSubgroupModule(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)">确定</el-button>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-4) == '-000'">
                                <el-row style="margin-top: 20px;">
                                    <el-col :span="8">
                                        <el-select v-model="this.deleteModuleName" size="large">
                                            <el-option
                                                v-for="md in this.subgroupList[this.selectMenuIndex.split('-')[0]].moduleList"
                                                :key="md.name" :label="md.name" :value="md.name" />
                                        </el-select>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-button type="danger" size="large"
                                            @click="onDeleteSubgroupModule(this.subgroupList[this.selectMenuIndex.split('-')[0]].name)">确定</el-button>
                                    </el-col>
                                </el-row>
                            </div> -->
                            <div v-else-if="this.selectMenuIndex.slice(-2) == '-1'">
                                <el-row>
                                    <el-col>
                                        <el-collapse v-if="this.groupManager">
                                            <el-collapse-item title="小组改名">
                                                <el-row style="margin-top: 20px;">
                                                    <el-col :span="3" :offset="1">
                                                        小组改名：
                                                    </el-col>
                                                    <el-col :span="9">
                                                        <el-input v-model="this.newSubgroupName"></el-input>
                                                    </el-col>
                                                    <el-col :span="2" :offset="1">
                                                        <el-button
                                                            @click="onUpdateSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)"
                                                            type="primary">确认</el-button>
                                                    </el-col>
                                                    <el-col :span="2">
                                                        <el-button @click="onCancelUpdateSubgourpName">取消</el-button>
                                                    </el-col>
                                                    <el-col :span="4" :offset="2">
                                                        <el-button type="danger"
                                                            @click="onDeleteSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)">解散小组</el-button>
                                                    </el-col>
                                                </el-row>
                                                <el-divider />
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-button type="primary" size="large" style="margin: 10px;"
                                            @click="onCreateSubgroupNoticeDialogVisible()">
                                            <el-icon>
                                                <Plus />
                                            </el-icon>
                                            <span>
                                                新公告
                                            </span>
                                        </el-button>
                                        <el-button type="danger" size="large" style="margin: 10px;"
                                            @click="onDeleteSubgroup()" :disabled="!this.groupManager">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                            <span>
                                                删除组件
                                            </span>
                                        </el-button>
                                        <div
                                            v-for="subgroupFrame in this.subgroupList[this.selectMenuIndex.split('-')[0]].subgroupFrameList">
                                            <subgroupNotice
                                                :subgroupId="this.subgroupList[this.selectMenuIndex.split('-')[0]].id"
                                                :moduleName="this.selectMenuIndex.split('-')[1]"
                                                :subgroupModuleId="this.selectMenuIndex.split('-')[2]"
                                                :subgroupFrameId="subgroupFrame.id">
                                            </subgroupNotice>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-2) == '-2'">
                                <el-row>
                                    <el-col>
                                        <el-collapse v-if="this.groupManager">
                                            <el-collapse-item title="小组改名">
                                                <el-row style="margin-top: 20px;">
                                                    <el-col :span="3" :offset="1">
                                                        小组改名：
                                                    </el-col>
                                                    <el-col :span="9">
                                                        <el-input v-model="this.newSubgroupName"></el-input>
                                                    </el-col>
                                                    <el-col :span="2" :offset="1">
                                                        <el-button
                                                            @click="onUpdateSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)"
                                                            type="primary">确认</el-button>
                                                    </el-col>
                                                    <el-col :span="2">
                                                        <el-button @click="onCancelUpdateSubgourpName">取消</el-button>
                                                    </el-col>
                                                    <el-col :span="4" :offset="2">
                                                        <el-button type="danger"
                                                            @click="onDeleteSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)">解散小组</el-button>
                                                    </el-col>
                                                </el-row>
                                                <el-divider />
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-button type="primary" size="large" style="margin: 10px;"
                                            @click="onCreateBookRecommendDialogVisible">
                                            <el-icon>
                                                <Plus />
                                            </el-icon>
                                            <span>
                                                推荐书籍
                                            </span>
                                        </el-button>
                                        <el-button type="danger" size="large" style="margin: 10px;"
                                            @click="onDeleteSubgroup()" :disabled="!this.groupManager">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                            <span>
                                                删除组件
                                            </span>
                                        </el-button>
                                        <div
                                            v-for="subgroupFrame in this.subgroupList[this.selectMenuIndex.split('-')[0]].subgroupFrameList">
                                            <bookRecommend
                                                :subgroupId="this.subgroupList[this.selectMenuIndex.split('-')[0]].id"
                                                :moduleName="this.selectMenuIndex.split('-')[1]"
                                                :subgroupModuleId="this.selectMenuIndex.split('-')[2]"
                                                :subgroupFrameId="subgroupFrame.id">
                                            </bookRecommend>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-2) == '-3'">
                                <el-row>
                                    <el-col>
                                        <el-collapse v-if="this.groupManager">
                                            <el-collapse-item title="小组改名">
                                                <el-row style="margin-top: 20px;">
                                                    <el-col :span="3" :offset="1">
                                                        小组改名：
                                                    </el-col>
                                                    <el-col :span="9">
                                                        <el-input v-model="this.newSubgroupName"></el-input>
                                                    </el-col>
                                                    <el-col :span="2" :offset="1">
                                                        <el-button
                                                            @click="onUpdateSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)"
                                                            type="primary">确认</el-button>
                                                    </el-col>
                                                    <el-col :span="2">
                                                        <el-button @click="onCancelUpdateSubgourpName">取消</el-button>
                                                    </el-col>
                                                    <el-col :span="4" :offset="2">
                                                        <el-button type="danger"
                                                            @click="onDeleteSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)">解散小组</el-button>
                                                    </el-col>
                                                </el-row>
                                                <el-divider />
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-button type="primary" size="large" style="margin: 10px;"
                                            @click="createSubgroupVoteDialogVisible = true">
                                            <el-icon>
                                                <Plus />
                                            </el-icon>
                                            <span>
                                                发起投票
                                            </span>
                                        </el-button>
                                        <el-button type="danger" size="large" style="margin: 10px;"
                                            @click="onDeleteSubgroup()" :disabled="!this.groupManager">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                            <span>
                                                删除组件
                                            </span>
                                        </el-button>
                                        <div
                                            v-for="subgroupFrame in this.subgroupList[this.selectMenuIndex.split('-')[0]].subgroupFrameList">
                                            <subgroupVote
                                                :subgroupId="this.subgroupList[this.selectMenuIndex.split('-')[0]].id"
                                                :moduleName="this.selectMenuIndex.split('-')[1]"
                                                :subgroupModuleId="this.selectMenuIndex.split('-')[2]"
                                                :subgroupFrameId="subgroupFrame.id">
                                            </subgroupVote>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-2) == '-4'">
                                <el-row>
                                    <el-col>
                                        <el-collapse v-if="this.groupManager">
                                            <el-collapse-item title="小组改名">
                                                <el-row style="margin-top: 20px;">
                                                    <el-col :span="3" :offset="1">
                                                        小组改名：
                                                    </el-col>
                                                    <el-col :span="9">
                                                        <el-input v-model="this.newSubgroupName"></el-input>
                                                    </el-col>
                                                    <el-col :span="2" :offset="1">
                                                        <el-button
                                                            @click="onUpdateSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)"
                                                            type="primary">确认</el-button>
                                                    </el-col>
                                                    <el-col :span="2">
                                                        <el-button @click="onCancelUpdateSubgourpName">取消</el-button>
                                                    </el-col>
                                                    <el-col :span="4" :offset="2">
                                                        <el-button type="danger"
                                                            @click="onDeleteSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)">解散小组</el-button>
                                                    </el-col>
                                                </el-row>
                                                <el-divider />
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-button type="primary" size="large" style="margin: 10px;"
                                            @click="onCreateBookRecommendDialogVisible">
                                            <el-icon>
                                                <Plus />
                                            </el-icon>
                                            <span>
                                                书籍探讨
                                            </span>
                                        </el-button>
                                        <el-button type="danger" size="large" style="margin: 10px;"
                                            @click="onDeleteSubgroup()" :disabled="!this.groupManager">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                            <span>
                                                删除组件
                                            </span>
                                        </el-button>
                                        <div
                                            v-for="subgroupFrame in this.subgroupList[this.selectMenuIndex.split('-')[0]].subgroupFrameList">
                                            <bookComment
                                                :subgroupId="this.subgroupList[this.selectMenuIndex.split('-')[0]].id"
                                                :moduleName="this.selectMenuIndex.split('-')[1]"
                                                :subgroupModuleId="this.selectMenuIndex.split('-')[2]"
                                                :subgroupFrameId="subgroupFrame.id">
                                            </bookComment>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-2) == '-5'">
                                <el-row>
                                    <el-col>
                                        <el-collapse v-if="this.groupManager">
                                            <el-collapse-item title="小组改名">
                                                <el-row style="margin-top: 20px;">
                                                    <el-col :span="3" :offset="1">
                                                        小组改名：
                                                    </el-col>
                                                    <el-col :span="9">
                                                        <el-input v-model="this.newSubgroupName"></el-input>
                                                    </el-col>
                                                    <el-col :span="2" :offset="1">
                                                        <el-button
                                                            @click="onUpdateSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)"
                                                            type="primary">确认</el-button>
                                                    </el-col>
                                                    <el-col :span="2">
                                                        <el-button @click="onCancelUpdateSubgourpName">取消</el-button>
                                                    </el-col>
                                                    <el-col :span="4" :offset="2">
                                                        <el-button type="danger"
                                                            @click="onDeleteSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)">解散小组</el-button>
                                                    </el-col>
                                                </el-row>
                                                <el-divider />
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-button type="primary" size="large" style="margin: 10px;"
                                            @click="createSubgroupVoteDialogVisible = true">
                                            <el-icon>
                                                <Plus />
                                            </el-icon>
                                            <span>
                                                发起投票
                                            </span>
                                        </el-button>
                                        <el-button type="danger" size="large" style="margin: 10px;"
                                            @click="onDeleteSubgroup()" :disabled="!this.groupManager">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                            <span>
                                                删除组件
                                            </span>
                                        </el-button>
                                        <div
                                            v-for="subgroupFrame in this.subgroupList[this.selectMenuIndex.split('-')[0]].subgroupFrameList">
                                            <activityVote
                                                :subgroupId="this.subgroupList[this.selectMenuIndex.split('-')[0]].id"
                                                :moduleName="this.selectMenuIndex.split('-')[1]"
                                                :subgroupModuleId="this.selectMenuIndex.split('-')[2]"
                                                :subgroupFrameId="subgroupFrame.id">
                                            </activityVote>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-2) == '-7'">
                                <el-row>
                                    <el-col>
                                        <el-collapse v-if="this.groupManager">
                                            <el-collapse-item title="小组改名">
                                                <el-row style="margin-top: 20px;">
                                                    <el-col :span="3" :offset="1">
                                                        小组改名：
                                                    </el-col>
                                                    <el-col :span="9">
                                                        <el-input v-model="this.newSubgroupName"></el-input>
                                                    </el-col>
                                                    <el-col :span="2" :offset="1">
                                                        <el-button
                                                            @click="onUpdateSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)"
                                                            type="primary">确认</el-button>
                                                    </el-col>
                                                    <el-col :span="2">
                                                        <el-button @click="onCancelUpdateSubgourpName">取消</el-button>
                                                    </el-col>
                                                    <el-col :span="4" :offset="2">
                                                        <el-button type="danger"
                                                            @click="onDeleteSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)">解散小组</el-button>
                                                    </el-col>
                                                </el-row>
                                                <el-divider />
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-button type="primary" size="large" style="margin: 10px;"
                                            @click="createBookVoteDialogVisible = true">
                                            <el-icon>
                                                <Plus />
                                            </el-icon>
                                            <span>
                                                发起书籍投票讨论
                                            </span>
                                        </el-button>
                                        <el-button type="danger" size="large" style="margin: 10px;"
                                            @click="onDeleteSubgroup()" :disabled="!this.groupManager">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                            <span>
                                                删除组件
                                            </span>
                                        </el-button>
                                        <div
                                            v-for="subgroupFrame in this.subgroupList[this.selectMenuIndex.split('-')[0]].subgroupFrameList">
                                            <bookVoteComment
                                                :subgroupId="this.subgroupList[this.selectMenuIndex.split('-')[0]].id"
                                                :moduleName="this.selectMenuIndex.split('-')[1]"
                                                :subgroupModuleId="this.selectMenuIndex.split('-')[2]"
                                                :subgroupFrameId="subgroupFrame.id">
                                            </bookVoteComment>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-2) == '-6'">
                                <el-row>
                                    <el-col>
                                        <el-collapse v-if="this.groupManager">
                                            <el-collapse-item title="小组改名">
                                                <el-row style="margin-top: 20px;">
                                                    <el-col :span="3" :offset="1">
                                                        小组改名：
                                                    </el-col>
                                                    <el-col :span="9">
                                                        <el-input v-model="this.newSubgroupName"></el-input>
                                                    </el-col>
                                                    <el-col :span="2" :offset="1">
                                                        <el-button
                                                            @click="onUpdateSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)"
                                                            type="primary">确认</el-button>
                                                    </el-col>
                                                    <el-col :span="2">
                                                        <el-button @click="onCancelUpdateSubgourpName">取消</el-button>
                                                    </el-col>
                                                    <el-col :span="4" :offset="2">
                                                        <el-button type="danger"
                                                            @click="onDeleteSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)">解散小组</el-button>
                                                    </el-col>
                                                </el-row>
                                                <el-divider />
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-button type="primary" size="large" style="margin: 10px;"
                                            @click="createBookVoteDialogVisible = true">
                                            <el-icon>
                                                <Plus />
                                            </el-icon>
                                            <span>
                                                发起书籍投票
                                            </span>
                                        </el-button>
                                        <el-button type="danger" size="large" style="margin: 10px;"
                                            @click="onDeleteSubgroup()" :disabled="!this.groupManager">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                            <span>
                                                删除组件
                                            </span>
                                        </el-button>
                                        <div
                                            v-for="subgroupFrame in this.subgroupList[this.selectMenuIndex.split('-')[0]].subgroupFrameList">
                                            <bookVote :subgroupId="this.subgroupList[this.selectMenuIndex.split('-')[0]].id"
                                                :moduleName="this.selectMenuIndex.split('-')[1]"
                                                :subgroupModuleId="this.selectMenuIndex.split('-')[2]"
                                                :subgroupFrameId="subgroupFrame.id">
                                            </bookVote>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-2) == '-8'">
                                <el-row>
                                    <el-col>
                                        <el-collapse v-if="this.groupManager">
                                            <el-collapse-item title="小组改名">
                                                <el-row style="margin-top: 20px;">
                                                    <el-col :span="3" :offset="1">
                                                        小组改名：
                                                    </el-col>
                                                    <el-col :span="9">
                                                        <el-input v-model="this.newSubgroupName"></el-input>
                                                    </el-col>
                                                    <el-col :span="2" :offset="1">
                                                        <el-button
                                                            @click="onUpdateSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)"
                                                            type="primary">确认</el-button>
                                                    </el-col>
                                                    <el-col :span="2">
                                                        <el-button @click="onCancelUpdateSubgourpName">取消</el-button>
                                                    </el-col>
                                                    <el-col :span="4" :offset="2">
                                                        <el-button type="danger"
                                                            @click="onDeleteSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)">解散小组</el-button>
                                                    </el-col>
                                                </el-row>
                                                <el-divider />
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-button type="primary" size="large" style="margin: 10px;"
                                            @click="createActivityRecommend = true">
                                            <el-icon>
                                                <Plus />
                                            </el-icon>
                                            <span>
                                                发起推荐
                                            </span>
                                        </el-button>
                                        <el-button type="danger" size="large" style="margin: 10px;"
                                            @click="onDeleteSubgroup()" :disabled="!this.groupManager">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                            <span>
                                                删除组件
                                            </span>
                                        </el-button>
                                        <div
                                            v-for="subgroupFrame in this.subgroupList[this.selectMenuIndex.split('-')[0]].subgroupFrameList">
                                            <activityRecommend
                                                :subgroupId="this.subgroupList[this.selectMenuIndex.split('-')[0]].id"
                                                :moduleName="this.selectMenuIndex.split('-')[1]"
                                                :subgroupModuleId="this.selectMenuIndex.split('-')[2]"
                                                :subgroupFrameId="subgroupFrame.id" :subgroupFrame="subgroupFrame">
                                            </activityRecommend>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-2) == '-9'">
                                <el-row>
                                    <el-col>
                                        <el-collapse v-if="this.groupManager">
                                            <el-collapse-item title="小组改名">
                                                <el-row style="margin-top: 20px;">
                                                    <el-col :span="3" :offset="1">
                                                        小组改名：
                                                    </el-col>
                                                    <el-col :span="9">
                                                        <el-input v-model="this.newSubgroupName"></el-input>
                                                    </el-col>
                                                    <el-col :span="2" :offset="1">
                                                        <el-button
                                                            @click="onUpdateSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)"
                                                            type="primary">确认</el-button>
                                                    </el-col>
                                                    <el-col :span="2">
                                                        <el-button @click="onCancelUpdateSubgourpName">取消</el-button>
                                                    </el-col>
                                                    <el-col :span="4" :offset="2">
                                                        <el-button type="danger"
                                                            @click="onDeleteSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)">解散小组</el-button>
                                                    </el-col>
                                                </el-row>
                                                <el-divider />
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-button type="primary" size="large" style="margin: 10px;"
                                            @click="createActivityRecommend = true">
                                            <el-icon>
                                                <Plus />
                                            </el-icon>
                                            <span>
                                                发起推荐
                                            </span>
                                        </el-button>
                                        <el-button type="danger" size="large" style="margin: 10px;"
                                            @click="onDeleteSubgroup()" :disabled="!this.groupManager">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                            <span>
                                                删除组件
                                            </span>
                                        </el-button>
                                        <div
                                            v-for="subgroupFrame in this.subgroupList[this.selectMenuIndex.split('-')[0]].subgroupFrameList">
                                            <activityRecommendWithComment
                                                :subgroupId="this.subgroupList[this.selectMenuIndex.split('-')[0]].id"
                                                :moduleName="this.selectMenuIndex.split('-')[1]"
                                                :subgroupModuleId="this.selectMenuIndex.split('-')[2]"
                                                :subgroupFrameId="subgroupFrame.id" :subgroupFrame="subgroupFrame">
                                            </activityRecommendWithComment>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-3) == '-10'">
                                <el-row>
                                    <el-col>
                                        <el-collapse v-if="this.groupManager">
                                            <el-collapse-item title="小组改名">
                                                <el-row style="margin-top: 20px;">
                                                    <el-col :span="3" :offset="1">
                                                        小组改名：
                                                    </el-col>
                                                    <el-col :span="9">
                                                        <el-input v-model="this.newSubgroupName"></el-input>
                                                    </el-col>
                                                    <el-col :span="2" :offset="1">
                                                        <el-button
                                                            @click="onUpdateSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)"
                                                            type="primary">确认</el-button>
                                                    </el-col>
                                                    <el-col :span="2">
                                                        <el-button @click="onCancelUpdateSubgourpName">取消</el-button>
                                                    </el-col>
                                                    <el-col :span="4" :offset="2">
                                                        <el-button type="danger"
                                                            @click="onDeleteSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)">解散小组</el-button>
                                                    </el-col>
                                                </el-row>
                                                <el-divider />
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-button type="primary" size="large" style="margin: 10px;"
                                            @click="createActivityRecommendWithVote = true">
                                            <el-icon>
                                                <Plus />
                                            </el-icon>
                                            <span>
                                                发起推荐
                                            </span>
                                        </el-button>
                                        <el-button type="danger" size="large" style="margin: 10px;"
                                            @click="onDeleteSubgroup()" :disabled="!this.groupManager">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                            <span>
                                                删除组件
                                            </span>
                                        </el-button>
                                        <div
                                            v-for="subgroupFrame in this.subgroupList[this.selectMenuIndex.split('-')[0]].subgroupFrameList">
                                            <activityRecommendWithVote
                                                :subgroupId="this.subgroupList[this.selectMenuIndex.split('-')[0]].id"
                                                :moduleName="this.selectMenuIndex.split('-')[1]"
                                                :subgroupModuleId="this.selectMenuIndex.split('-')[2]"
                                                :subgroupFrameId="subgroupFrame.id" :subgroupFrame="subgroupFrame">
                                            </activityRecommendWithVote>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-else-if="this.selectMenuIndex.slice(-3) == '-11'">
                                <el-row>
                                    <el-col>
                                        <el-collapse v-if="this.groupManager">
                                            <el-collapse-item title="小组改名">
                                                <el-row style="margin-top: 20px;">
                                                    <el-col :span="3" :offset="1">
                                                        小组改名：
                                                    </el-col>
                                                    <el-col :span="9">
                                                        <el-input v-model="this.newSubgroupName"></el-input>
                                                    </el-col>
                                                    <el-col :span="2" :offset="1">
                                                        <el-button
                                                            @click="onUpdateSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)"
                                                            type="primary">确认</el-button>
                                                    </el-col>
                                                    <el-col :span="2">
                                                        <el-button @click="onCancelUpdateSubgourpName">取消</el-button>
                                                    </el-col>
                                                    <el-col :span="4" :offset="2">
                                                        <el-button type="danger"
                                                            @click="onDeleteSubgourpName(this.subgroupList[this.selectMenuIndex.split('-')[0]].id)">解散小组</el-button>
                                                    </el-col>
                                                </el-row>
                                                <el-divider />
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-button type="primary" size="large" style="margin: 10px;"
                                            @click="createActivityRecommendWithVote = true">
                                            <el-icon>
                                                <Plus />
                                            </el-icon>
                                            <span>
                                                发起推荐
                                            </span>
                                        </el-button>
                                        <el-button type="danger" size="large" style="margin: 10px;"
                                            @click="onDeleteSubgroup()" :disabled="!this.groupManager">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                            <span>
                                                删除组件
                                            </span>
                                        </el-button>
                                        <div
                                            v-for="subgroupFrame in this.subgroupList[this.selectMenuIndex.split('-')[0]].subgroupFrameList">
                                            <activityRecommendWithCommentVote
                                                :subgroupId="this.subgroupList[this.selectMenuIndex.split('-')[0]].id"
                                                :moduleName="this.selectMenuIndex.split('-')[1]"
                                                :subgroupModuleId="this.selectMenuIndex.split('-')[2]"
                                                :subgroupFrameId="subgroupFrame.id" :subgroupFrame="subgroupFrame">
                                            </activityRecommendWithCommentVote>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-else-if="this.selectMenuIndex == '-01'">
                                <el-row style="margin-top: 20px;">
                                    <el-col :span="3" :offset="1">
                                        <span>板块名称：</span>
                                    </el-col>
                                    <el-col :span="13">
                                        <el-input v-model="newSubgroup.name"></el-input>
                                    </el-col>
                                </el-row>
                                <el-divider />
                                <el-row style="margin-top: 20px; margin-bottom: 20px;">
                                    <el-col>
                                        <!-- <el-radio-group v-model="newSubgroup.frameId">
                                            <el-radio label="1" size="large">模板1</el-radio>
                                            <el-radio label="2" size="large">模板2</el-radio>
                                            <el-radio label="3" size="large">模板3</el-radio>
                                            <el-radio label="4" size="large">模板4</el-radio>
                                            <el-radio label="5" size="large">模板5</el-radio>
                                            <el-radio label="6" size="large">模板6</el-radio>
                                            <el-radio label="7" size="large">模板7</el-radio>
                                        </el-radio-group> -->
                                        <!-- <el-checkbox-group v-model="this.frames">
                                            <el-checkbox label="公告组件" border />
                                            <el-checkbox label="推荐组件" border />
                                            <el-checkbox label="投票组件" border />
                                        </el-checkbox-group> -->
                                        <!-- <el-radio-group v-model="newSubgroup.frameId">
                                            <el-row style="width: 100%;">
                                                <el-col :span="6">
                                                    <el-radio label="1" size="large" border>公告组件</el-radio>
                                                </el-col>
                                                <el-col :span="6">
                                                    <el-radio label="2" size="large" border>书籍推荐组件</el-radio>
                                                </el-col>
                                                <el-col :span="6">
                                                    <el-radio label="3" size="large" border>投票组件</el-radio>
                                                </el-col>
                                                <el-col :span="6">
                                                    <el-radio label="4" size="large" border>书籍讨论组件</el-radio>
                                                </el-col>
                                            </el-row>
                                            <el-row style="width: 100%; margin-top: 10px;">
                                                <el-col :span="6">
                                                    <el-radio label="5" size="large" border>活动投票组件</el-radio>
                                                </el-col>
                                                <el-col :span="6">
                                                    <el-radio label="6" size="large" border>书籍投票组件</el-radio>
                                                </el-col>
                                                <el-col :span="6">
                                                    <el-radio label="7" size="large" border>书籍讨论投票组件</el-radio>
                                                </el-col>
                                            </el-row>
                                        </el-radio-group> -->
                                        <el-row style="width: 100%;">
                                            <el-col :span="6">
                                                <el-radio-group v-model="this.frames">
                                                    <el-row>
                                                        <el-radio label="1" size="large" border>公告组件</el-radio>
                                                    </el-row>
                                                    <el-row style="margin-top: 10px;">
                                                        <el-radio label="2" size="large" border>推荐组件</el-radio>
                                                    </el-row>
                                                    <el-row style="margin-top: 10px;">
                                                        <el-radio label="3" size="large" border>投票组件</el-radio>
                                                    </el-row>
                                                </el-radio-group>
                                            </el-col>
                                            <el-col :span="18">
                                                <el-row v-if="this.frames == 1"></el-row>
                                                <el-row v-if="this.frames == 2">
                                                    <el-col>
                                                        <el-row>
                                                            <el-col :span="8">
                                                                类型：
                                                            </el-col>
                                                            <el-col :span="8">
                                                                讨论区：
                                                            </el-col>
                                                            <el-col :span="8">
                                                                投票区：
                                                            </el-col>
                                                        </el-row>
                                                        <el-row>
                                                            <el-col :span="8">
                                                                <el-switch v-model="newRe.type" size="large"
                                                                    active-text="自定义" inactive-text="书籍推荐"
                                                                    active-value="活动推荐" inactive-value="书籍推荐" />
                                                            </el-col>
                                                            <el-col :span="8">
                                                                <el-switch v-model="newRe.comment" size="large"
                                                                    active-text="需要" inactive-text="不需要" />
                                                            </el-col>
                                                            <el-col :span="8">
                                                                <el-switch v-model="newRe.vote" size="large"
                                                                    active-text="需要" inactive-text="不需要" />
                                                            </el-col>
                                                        </el-row>
                                                        <el-row v-if="newRe.type == '活动推荐'" style="margin-top: 20px;">
                                                            <el-col>
                                                                <el-row style="margin-top: 10px;">组件栏目：</el-row>
                                                                <el-row v-for="num in textNum" style="margin-top: 10px;">
                                                                    <el-col :span="10">
                                                                        <el-input
                                                                            v-model="this.textList[num - 1]"></el-input>
                                                                    </el-col>
                                                                </el-row>
                                                                <el-row style="margin-top: 10px;">
                                                                    <el-col>
                                                                        <el-button @click="this.textNum++" circle>
                                                                            <el-icon>
                                                                                <Plus />
                                                                            </el-icon>
                                                                        </el-button>
                                                                    </el-col>
                                                                </el-row>
                                                            </el-col>
                                                        </el-row>
                                                    </el-col>
                                                </el-row>
                                                <el-row v-if="this.frames == 3">
                                                    <el-col>
                                                        <el-row>讨论区：</el-row>
                                                        <el-row>
                                                            <el-switch v-model="newSubgroup.frameId" size="large"
                                                                active-text="需要" inactive-text="不需要" active-value=5
                                                                inactive-value=3 />
                                                        </el-row>
                                                    </el-col>
                                                </el-row>
                                            </el-col>
                                        </el-row>
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
            <el-upload class="avatar-uploader" ref="uploadRef"
                :action="this.$http.defaults.baseURL + '/group/uploadAvatar?groupId=' + String(this.groupId)"
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
    <el-dialog v-model="groupFavouriteDialogVisible" title="新增书籍推荐" width="40%"
        :before-close="beforeGroupFavouriteDialogClose">
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
                                <el-option v-for="book in bookList" :key="book.id" :label="book.name" :value="book.id"
                                    :disabled="isDisabled(book.id)" />
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
                                <el-descriptions-item label="ISBN：">{{ newBook.isbn }}</el-descriptions-item>
                            </el-descriptions>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 100%; margin-top: 20px;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onGroupFavourite">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelGroupFavourite">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
    <el-dialog v-model="createSubgroupNoticeDialogVisible" title="新公告" width="30%"
        :before-close="beforeCreateSubgroupNoticeDialogClose">
        <div class="dialog">
            <el-row justify="center" style="width: 70%; margin-bottom: 20px;">
                <el-col :span="4">
                    标题：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newTitle"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 70%; margin-bottom: 20px;">
                <el-col :span="4">
                    内容：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newText" type="textarea"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 100%;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onCreateSubgroupNotice">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelCreateSubgroupNotice">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
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
                                <el-descriptions-item label="ISBN：">{{ newBook.isbn }}</el-descriptions-item>
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
    <el-dialog v-model="createSubgroupVoteDialogVisible" title="发起投票" width="40%"
        :before-close="beforeCreateSubgroupVoteDialogClose">
        <div class="dialog">
            <el-row justify="center" style="width: 90%; margin-bottom: 20px;">
                <el-col :span="4">
                    标题：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newSubgroupVote.name"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 90%; margin-bottom: 20px;">
                <el-col :span="4">
                    描述：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newSubgroupVote.description" type="textarea"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 90%; margin-bottom: 20px;">
                <el-col :span="4">
                    赞成描述：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newSubgroupVote.yesWord"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 90%; margin-bottom: 20px;">
                <el-col :span="4">
                    反对描述：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newSubgroupVote.noWord"></el-input>
                </el-col>
            </el-row>
            <el-transfer v-model="this.newSubgroupVote.voter" :props="{
                key: 'id',
                label: 'username',
            }" :data="this.groupMember" :titles="['小组成员', '可投票成员']" />
            <el-row justify="center" style="width: 100%; margin-top: 20px;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onCreateSubgroupVote">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelCreateSubgroupVote">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
    <el-dialog v-model="createBookVoteDialogVisible" title="发起书籍投票" width="40%"
        :before-close="beforeCreateBookVoteDialogClose">
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
                                <el-descriptions-item label="ISBN：">{{ newBook.isbn }}</el-descriptions-item>
                            </el-descriptions>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 90%; margin-top: 20px; margin-bottom: 20px;">
                <el-col :span="4">
                    推荐理由：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newBookRecommendReason" type="textarea"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 90%; margin-bottom: 20px;">
                <el-col :span="4">
                    标题：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newSubgroupVote.name"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 90%; margin-bottom: 20px;">
                <el-col :span="4">
                    描述：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newSubgroupVote.description" type="textarea"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 90%; margin-bottom: 20px;">
                <el-col :span="4">
                    赞成描述：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newSubgroupVote.yesWord"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 90%; margin-bottom: 20px;">
                <el-col :span="4">
                    反对描述：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newSubgroupVote.noWord"></el-input>
                </el-col>
            </el-row>
            <el-transfer v-model="this.newSubgroupVote.voter" :props="{
                key: 'id',
                label: 'username',
            }" :data="this.groupMember" :titles="['小组成员', '可投票成员']" />
            <el-row justify="center" style="width: 100%; margin-top: 20px;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onCreateBookVote">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelCreateBookVote">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
    <el-dialog v-model="createActivityRecommend" title="发起活动推荐" width="40%" :before-close="beforeCreateActivityRecommend">
        <div class="dialog">
            <el-upload class="bookcover-uploader" ref="uploadRef"
                action="http://localhost:8080/subgroup/uploadActivityRecommendPic" :headers=headers :show-file-list="false"
                accept=".png, .jpeg, .jpg, .gif, .PNG, .JPEG, .JPG, .GIF" :on-success="handleSuccessActivityRecommend"
                :on-error="handleError" :on-exceed="handleExceed" :before-upload="beforeUpload" :limit=1>
                <img v-if="this.newActivityRecommendPic" :src="this.$http.defaults.baseURL + this.newActivityRecommendPic"
                    class="bookcover" />
                <el-icon v-else class="bookcover-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
            <el-row v-for="(title, index) in this.subgroupList[this.selectMenuIndex.split('-')[0]].text.split('@').slice(1)"
                style="width: 70%; margin: 10px;">
                <el-col :span="4">
                    {{ title }}:
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.contentList[index]"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 100%; margin-top: 10px;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onCreateActivityRecommend">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelCreateActivityRecommend">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
    <el-dialog v-model="createActivityRecommendWithVote" title="发起活动推荐" width="40%"
        :before-close="beforeCreateActivityRecommendWithVote">
        <div class="dialog">
            <el-upload class="bookcover-uploader" ref="uploadRef"
                action="http://localhost:8080/subgroup/uploadActivityRecommendPic" :headers=headers :show-file-list="false"
                accept=".png, .jpeg, .jpg, .gif, .PNG, .JPEG, .JPG, .GIF" :on-success="handleSuccessActivityRecommend"
                :on-error="handleError" :on-exceed="handleExceed" :before-upload="beforeUpload" :limit=1>
                <img v-if="this.newActivityRecommendPic" :src="this.$http.defaults.baseURL + this.newActivityRecommendPic"
                    class="bookcover" />
                <el-icon v-else class="bookcover-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
            <el-row v-for="(title, index) in this.subgroupList[this.selectMenuIndex.split('-')[0]].text.split('@').slice(1)"
                style="width: 90%; margin: 10px;">
                <el-col :span="4">
                    {{ title }}:
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.contentList[index]"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 90%; margin-bottom: 20px;">
                <el-col :span="4">
                    标题：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newSubgroupVote.name"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 90%; margin-bottom: 20px;">
                <el-col :span="4">
                    描述：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newSubgroupVote.description" type="textarea"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 90%; margin-bottom: 20px;">
                <el-col :span="4">
                    赞成描述：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newSubgroupVote.yesWord"></el-input>
                </el-col>
            </el-row>
            <el-row justify="center" style="width: 90%; margin-bottom: 20px;">
                <el-col :span="4">
                    反对描述：
                </el-col>
                <el-col :span="20">
                    <el-input v-model="this.newSubgroupVote.noWord"></el-input>
                </el-col>
            </el-row>
            <el-transfer v-model="this.newSubgroupVote.voter" :props="{
                key: 'id',
                label: 'username',
            }" :data="this.groupMember" :titles="['小组成员', '可投票成员']" />
            <el-row justify="center" style="width: 100%; margin-top: 10px;">
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button type="primary" @click="onCreateActivityRecommendWithVote">确认</el-button>
                </el-col>
                <el-col :span="7" style="display: flex; justify-content: center;">
                    <el-button @click="onCancelCreateActivityRecommendWithVote">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
</template>
<script>
import myHead from '../components/myHead.vue'
import subgroupNotice from '../components/subgroupNotice.vue'
import bookRecommend from '../components/bookRecommend.vue'
import subgroupVote from '../components/subgroupVote.vue'
import bookComment from '../components/bookComment.vue'
import activityVote from '../components/activityVote.vue'
import bookVote from '../components/bookVote.vue'
import bookVoteComment from '../components/bookVoteComment.vue'
import activityRecommend from '../components/activityRecommend.vue'
import activityRecommendWithComment from '../components/activityRecommendWithComment.vue'
import activityRecommendWithVote from '../components/activityRecommendWithVote.vue'
import activityRecommendWithCommentVote from '../components/activityRecommendWithCommentVote.vue'
import { ElMessage } from 'element-plus'
export default {
    components: { myHead, subgroupNotice, bookRecommend, subgroupVote, bookComment, activityVote, bookVote, bookVoteComment, activityRecommend, activityRecommendWithComment, activityRecommendWithVote, activityRecommendWithCommentVote },
    data() {
        return {
            userId: JSON.parse(sessionStorage.getItem('id')),
            groupId: null,
            isGroupMember: false,
            groupManager: false,
            groupState: false,
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
            groupApplicant: [],
            baseLocation: null,
            selectMenuIndex: '-1-0',
            selectMenuName: null,
            groupFavouriteList: [],
            totalGroupFavourite: null,
            newSubgroup: {
                name: null,
                member: [],
                frameId: "1"
            },
            newSubgroupName: null,
            topTenBook: [],
            deleteModuleName: null,
            newModuleId: null,
            newModuleName: null,
            moduleList: [],
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
            }],
            groupFavouriteDialogVisible: false,
            newBookId: null,
            newBook: {},
            bookList: [],
            createSubgroupNoticeDialogVisible: false,
            newTitle: null,
            newText: null,
            createBookRecommendDialogVisible: false,
            newBookRecommendReason: null,
            createSubgroupVoteDialogVisible: false,
            newSubgroupVote: {
                name: null,
                description: null,
                voter: [],
                yesWord: null,
                noWord: null
            },
            createBookVoteDialogVisible: false,
            frames: [],
            newRe: {
                type: "书籍推荐",
                comment: false,
                vote: false
            },
            newText: '',
            textNum: 1,
            textList: [],
            createActivityRecommend: false,
            newActivityRecommendPic: null,
            contentList: [],
            createActivityRecommendWithVote: false
        }
    },
    async mounted() {
        this.headers.token = JSON.parse(sessionStorage.getItem('token'))
        this.groupId = this.$route.query.groupId
        const { data: groupMemberInfoRes } = await this.$http.get('/group/groupMemberInfo?groupId=' + String(this.groupId))
        if (groupMemberInfoRes.code === 1) {
            this.isGroupMember = true
            this.groupManager = groupMemberInfoRes.data.groupMemberInfo.manager
            this.groupState = groupMemberInfoRes.data.groupMemberInfo.state
        }
        const { data: groupInfoRes } = await this.$http.get('/group/selectById?groupId=' + String(this.groupId))
        this.groupInfo = groupInfoRes.data.groupInfo
        this.userId = JSON.parse(sessionStorage.getItem('id'))
        this.newIntroduction = this.groupInfo.introduction
        this.newNotice = this.groupInfo.notice
        const { data: groupMemberRes } = await this.$http.get('/user/groupMember?groupId=' + String(this.groupId))
        this.groupMember = groupMemberRes.data.userList
        const { data: groupApplicantRes } = await this.$http.get('/user/groupApplicant?groupId=' + String(this.groupId))
        this.groupApplicant = groupApplicantRes.data.userList
        this.baseLocation = String(window.location.href).split('/')[0]
        const { data: groupFavouriteRes } = await this.$http.get('/group/groupFavouriteByIdPage?groupId=' + this.groupId + '&page=1')
        this.groupFavouriteList = groupFavouriteRes.data.bookList
        this.totalGroupFavourite = groupFavouriteRes.data.num
        const { data: subgroupListRes } = await this.$http.get('/subgroup/getSubgroup?groupId=' + String(this.groupId))
        this.subgroupList = subgroupListRes.data.subgroupList
        const { data: topTenBookRes } = await this.$http.get('/group/topTenFavourite?groupId=' + String(this.groupId))
        this.topTenBook = topTenBookRes.data.bookList
        const { data: moduleRes } = await this.$http.get('/subgroup/getAllModule')
        this.moduleList = moduleRes.data.moduleList
        const { data: bookListRes } = await this.$http.get('/book/allBook')
        this.bookList = bookListRes.data.bookList
    },
    methods: {
        async joinGroup() {
            const { data: res } = await this.$http.put('/user/joinGroup?groupId=' + String(this.groupId))
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.$router.go(0)
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
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
        handleSuccessActivityRecommend(responce, uploadFile, uploadFiles) {
            if (responce.code === 1) {
                ElMessage({
                    message: '上传成功！',
                    type: 'success'
                })
                this.newActivityRecommendPic = responce.data.path
                console.log(this.newActivityRecommendPic)
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
            const { data: res } = await this.$http.put('/user/quitGroup?groupId=' + String(this.groupId))
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.$router.go(0)
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
            this.$router.push('/')
        },
        async dissolve() {
            const { data: res } = await this.$http.delete('/group/dissolveGroup?groupId=' + String(this.groupId))
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.$router.push('/groupList')
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
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
            const { data: res } = await this.$http.put('/user/setGroupManager?userId=' + String(id) + '&groupId=' + String(this.groupId))
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
            const { data: res } = await this.$http.put('/user/dismissGroupManager?userId=' + String(id) + '&groupId=' + String(this.groupId))
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
        async joinGroupPermit(id) {
            const { data: res } = await this.$http.put('/user/joinGroupPermit?userId=' + String(id) + '&groupId=' + String(this.groupId))
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: groupMemberRes } = await this.$http.get('/user/groupMember?groupId=' + String(this.groupId))
                this.groupMember = groupMemberRes.data.userList
                const { data: groupApplicantRes } = await this.$http.get('/user/groupApplicant?groupId=' + String(this.groupId))
                this.groupApplicant = groupApplicantRes.data.userList
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async joinGroupReject(id) {
            const { data: res } = await this.$http.put('/user/joinGroupReject?userId=' + String(id) + '&groupId=' + String(this.groupId))
            ElMessage({
                message: res.message,
                type: 'error'
            })
            const { data: groupApplicantRes } = await this.$http.get('/user/groupApplicant?groupId=' + String(this.groupId))
            this.groupApplicant = groupApplicantRes.data.userList
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
        // test() {
        //     for (var i in this.textList) {
        //         this.newText = this.newText + '@' + this.textList[i]
        //     }
        //     console.log(this.textList)
        //     console.log(this.newText)
        // },
        async onCreateSubgroup() {
            // if (this.frames.length == 1) {
            //     if (this.frames[0] == '公告组件') {
            //         this.newSubgroup.frameId = 1
            //     } else if (this.frames[0] == '推荐组件') {
            //         this.newSubgroup.frameId = 2
            //     } else if (this.frames[0] == '投票组件') {
            //         this.newSubgroup.frameId = 3
            //     }
            // } else if (this.frames.length == 2) {
            //     if (this.frames.includes('公告组件') && this.frames.includes('推荐组件')) {
            //         this.newSubgroup.frameId = 4
            //     } else if (this.frames.includes('公告组件') && this.frames.includes('投票组件')) {
            //         this.newSubgroup.frameId = 5
            //     } else if (this.frames.includes('推荐组件') && this.frames.includes('投票组件')) {
            //         this.newSubgroup.frameId = 6
            //     }
            // } else if (this.frames.length == 3) {
            //     this.newSubgroup.frameId = 7
            // } else {
            //     return
            // }
            if (this.frames == 1) {
                this.newSubgroup.frameId = 1
            } else if (this.frames == 2) {
                if (this.newRe.type == "书籍推荐") {
                    if (this.newRe.comment && this.newRe.vote) {
                        this.newSubgroup.frameId = 7
                    } else if (this.newRe.comment && !this.newRe.vote) {
                        this.newSubgroup.frameId = 4
                    } else if (!this.newRe.comment && this.newRe.vote) {
                        this.newSubgroup.frameId = 6
                    } else if (!this.newRe.comment && !this.newRe.vote) {
                        this.newSubgroup.frameId = 2
                    }
                } else if (this.newRe.type == "活动推荐") {
                    if (this.newRe.comment && this.newRe.vote) {
                        this.newSubgroup.frameId = 11
                    } else if (this.newRe.comment && !this.newRe.vote) {
                        this.newSubgroup.frameId = 9
                    } else if (!this.newRe.comment && this.newRe.vote) {
                        this.newSubgroup.frameId = 10
                    } else if (!this.newRe.comment && !this.newRe.vote) {
                        this.newSubgroup.frameId = 8
                    }
                    for (var i in this.textList) {
                        this.newText = this.newText + '@' + this.textList[i]
                    }
                    // if (this.newRe.comment && this.newRe.vote) {
                    //     this.newSubgroup.frameId = 7
                    // } else if (this.newRe.comment && !this.newRe.vote) {
                    //     this.newSubgroup.frameId = 4
                    // } else if (!this.newRe.comment && this.newRe.vote) {
                    //     this.newSubgroup.frameId = 6
                    // } else if (!this.newRe.comment && !this.newRe.vote) {
                    //     this.newSubgroup.frameId = 2
                    // }
                }
            }
            for (let index in this.groupMember) {
                this.newSubgroup.member.push(this.groupMember[index].id)
            }
            if (this.newSubgroup.frameId >= 8) {
                const { data: res } = await this.$http.post('/subgroup/createSubgroupWithText?name=' + this.newSubgroup.name + '&groupId=' + this.groupId + '&frameId=' + this.newSubgroup.frameId + '&text=' + this.newText, this.newSubgroup.member)
                if (res.code === 1) {
                    ElMessage({
                        message: res.message,
                        type: 'success'
                    })
                    this.newText = ''
                    this.textList = []
                    this.textNum = 1
                    this.onCancelCreateSubgroup()
                    const { data: subgroupListRes } = await this.$http.get('/subgroup/getSubgroup?groupId=' + String(this.groupId))
                    this.subgroupList = subgroupListRes.data.subgroupList
                } else {
                    ElMessage({
                        message: res.message,
                        type: 'error'
                    })
                }
            } else {
                const { data: res } = await this.$http.post('/subgroup/createSubgroup?name=' + this.newSubgroup.name + '&groupId=' + this.groupId + '&frameId=' + this.newSubgroup.frameId, this.newSubgroup.member)
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
        },
        async onDeleteSubgroupModule(subgroupId) {
            const { data: res } = await this.$http.delete('/subgroup/deleteSubgroupModule?moduleName=' + this.deleteModuleName)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.deleteModuleName = null
                const { data: subgroupListRes } = await this.$http.get('/subgroup/getSubgroup?groupId=' + String(this.groupId))
                this.subgroupList = subgroupListRes.data.subgroupList
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async onAddSubgroupModule(subgroupId) {
            const { data: res } = await this.$http.post('/subgroup/addSubgroupModule?subgroupId=' + subgroupId + '&moduleId=' + this.newModuleId + '&name=' + this.newModuleName)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.newModuleId = null
                const { data: subgroupListRes } = await this.$http.get('/subgroup/getSubgroup?groupId=' + String(this.groupId))
                this.subgroupList = subgroupListRes.data.subgroupList
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        isModuleExisted(id) {
            const mdl = this.subgroupList[this.selectMenuIndex.split('-')[0]].moduleList
            for (const index in mdl) {
                if (mdl[index].id == id) {
                    return true
                }
            }
            return false
        },
        onGroupFavouriteDialogVisible() {
            this.newBookId = null
            this.newBook = {}
            this.groupFavouriteDialogVisible = true
        },
        beforeGroupFavouriteDialogClose() {
            this.onCancelGroupFavourite()
            this.groupFavouriteDialogVisible = false
        },
        onBookChange(value) {
            for (const index in this.bookList) {
                if (this.bookList[index].id == value) {
                    this.newBook = this.bookList[index]
                    break
                }
            }
        },
        async onGroupFavourite() {
            const { data: res } = await this.$http.post('/group/groupFavourite?groupId=' + String(this.groupId) + '&bookId=' + String(this.newBookId))
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                const { data: groupFavouriteRes } = await this.$http.get('/group/groupFavouriteByIdPage?groupId=' + this.groupId + '&page=1')
                this.groupFavouriteList = groupFavouriteRes.data.bookList
                this.totalGroupFavourite = groupFavouriteRes.data.num
                this.groupFavouriteDialogVisible = false
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCancelGroupFavourite() {
            this.newBookId = null
            this.newBook = {}
        },
        isDisabled(bookId) {
            for (const index in this.groupFavouriteList) {
                if (this.groupFavouriteList[index].id == bookId) {
                    return true
                }
            }
            return false
        },
        onCreateSubgroupNoticeDialogVisible() {
            this.newTitle = null
            this.newText = null
            this.createSubgroupNoticeDialogVisible = true
        },
        beforeCreateSubgroupNoticeDialogClose() {
            this.onCancelCreateSubgroupNotice()
            this.createSubgroupNoticeDialogVisible = false
        },
        async onCreateSubgroupNotice() {
            const { data: res } = await this.$http.post('/subgroup/createSubgroupNotice?subgroupId=' + this.subgroupList[this.selectMenuIndex.split('-')[0]].id, { 'subgroupModelId': 0, 'title': this.newTitle, 'text': this.newText, 'userId': this.userId })
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                // const { data: res1 } = await this.$http.get('/subgroup/getSubgroupNotice?id=' + this.subgroupFrameId)
                // this.subgroupNoticeList = res1.data.subgroupNoticeList
                this.$router.go(0)
                this.beforeCreateSubgroupNoticeDialogClose()
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCancelCreateSubgroupNotice() {
            this.newTitle = null
            this.newText = null
        },
        onCreateBookRecommendDialogVisible() {
            this.newBookId = null
            this.newBook = {}
            this.newBookRecommendReason = null
            this.createBookRecommendDialogVisible = true
        },
        beforeCreateBookRecommendDialogClose() {
            this.onCancelCreateBookRecommend()
            this.createBookRecommendDialogVisible = false
        },
        async onCreateBookRecommend() {
            const { data: res } = await this.$http.post('/subgroup/addBookRecommend?subgroupId=' + this.subgroupList[this.selectMenuIndex.split('-')[0]].id + '&subgroupName=' + this.subgroupList[this.selectMenuIndex.split('-')[0]].name, { 'bookId': this.newBookId, 'recommendReason': this.newBookRecommendReason, 'userId': this.userId, 'subgroupModuleId': 0 })
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                // const { data: res1 } = await this.$http.get('/subgroup/getBookRecommend?id=' + this.subgroupFrameId)
                // this.bookRecommendList = res1.data.bookRecommendList
                this.$router.go(0)
                this.beforeCreateBookRecommendDialogClose()
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
        onBookChange(value) {
            for (const index in this.bookList) {
                if (this.bookList[index].id == value) {
                    this.newBook = this.bookList[index]
                    break
                }
            }
        },
        beforeCreateSubgroupVoteDialogClose() {
            this.onCancelCreateSubgroupVote()
            this.createSubgroupVoteDialogVisible = false
        },
        async onCreateSubgroupVote() {
            const { data: res } = await this.$http.post('/subgroup/createSubgroupVote?name=' + String(this.newSubgroupVote.name) + '&description=' + String(this.newSubgroupVote.description) + '&subgroupId=' + this.subgroupList[this.selectMenuIndex.split('-')[0]].id + '&subgroupName=' + this.subgroupList[this.selectMenuIndex.split('-')[0]].name + '&yesWord=' + String(this.newSubgroupVote.yesWord) + '&noWord=' + String(this.newSubgroupVote.noWord), this.newSubgroupVote.voter)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                // const { data: subgroupVoteListRes } = await this.$http.get('/subgroup/getSubgroupVote?subgroupModuleId=' + String(this.subgroupFrameId))
                // this.subgroupVoteList = subgroupVoteListRes.data.subgroupVoteList
                this.$router.go(0)
                this.beforeCreateSubgroupVoteDialogClose()
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCancelCreateSubgroupVote() {
            this.newSubgroupVote = {
                name: null,
                description: null,
                voter: [],
                yesWord: null,
                noWord: null
            }
        },
        beforeCreateBookVoteDialogClose() {
            this.onCancelCreateBookVote()
            this.createBookVoteDialogVisible = false
        },
        async onCreateBookVote() {
            // const { data: res } = await this.$http.post('/subgroup/addBookRecommend?subgroupId=' + this.subgroupList[this.selectMenuIndex.split('-')[0]].id + '&subgroupName=' + this.subgroupList[this.selectMenuIndex.split('-')[0]].name, { 'bookId': this.newBookId, 'recommendReason': this.newBookRecommendReason, 'userId': this.userId, 'subgroupModuleId': 0 })
            const { data: res } = await this.$http.post('/subgroup/createBookVote?name=' + String(this.newSubgroupVote.name) +
                '&description=' + String(this.newSubgroupVote.description) +
                '&subgroupId=' + this.subgroupList[this.selectMenuIndex.split('-')[0]].id +
                '&subgroupName=' + this.subgroupList[this.selectMenuIndex.split('-')[0]].name +
                '&yesWord=' + String(this.newSubgroupVote.yesWord) +
                '&noWord=' + String(this.newSubgroupVote.noWord) +
                '&bookId=' + this.newBookId +
                '&recommendReason=' + this.newBookRecommendReason +
                '&userId=' + this.userId +
                '&subgroupModuleId=0',
                this.newSubgroupVote.voter)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                // const { data: subgroupVoteListRes } = await this.$http.get('/subgroup/getSubgroupVote?subgroupModuleId=' + String(this.subgroupFrameId))
                // this.subgroupVoteList = subgroupVoteListRes.data.subgroupVoteList
                this.$router.go(0)
                // this.beforeCreateBookVoteDialogClose()
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCancelCreateBookVote() {
            this.newSubgroupVote = {
                name: null,
                description: null,
                voter: [],
                yesWord: null,
                noWord: null
            }
            this.newBookId = null
            this.newBook = {}
            this.newBookRecommendReason = null
        },
        async onDeleteSubgroup() {
            const { data: res } = await this.$http.delete('/subgroup/deleteSubgroup?id=' + this.subgroupList[this.selectMenuIndex.split('-')[0]].id)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.$router.go(0)
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        beforeCreateActivityRecommend() {
            this.onCancelCreateActivityRecommend()
            this.createActivityRecommend = false
        },
        async onCreateActivityRecommend() {
            var text = ''
            for (var index in this.subgroupList[this.selectMenuIndex.split('-')[0]].text.split('@').slice(1)) {
                text = text + '@' + this.subgroupList[this.selectMenuIndex.split('-')[0]].text.split('@').slice(1)[index] + '$' + this.contentList[index]
            }
            text = this.newActivityRecommendPic + text
            const { data: res } = await this.$http.post('/subgroup/createSubgroupFrameWithText?subgroupId=' + this.subgroupList[this.selectMenuIndex.split('-')[0]].id + '&text=' + text + '&frameId=' + this.subgroupList[this.selectMenuIndex.split('-')[0]].frameId)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.$router.go(0)
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCancelCreateActivityRecommend() {
            this.newActivityRecommendPic = null
            this.contentList = []
        },
        beforeCreateActivityRecommendWithVote() {
            this.onCancelCreateActivityRecommendWithVote()
            this.createActivityRecommendWithVote = false
        },
        async onCreateActivityRecommendWithVote() {
            var text = ''
            for (var index in this.subgroupList[this.selectMenuIndex.split('-')[0]].text.split('@').slice(1)) {
                text = text + '@' + this.subgroupList[this.selectMenuIndex.split('-')[0]].text.split('@').slice(1)[index] + '$' + this.contentList[index]
            }
            text = this.newActivityRecommendPic + text
            const { data: res } = await this.$http.post('/subgroup/createActivityRecommendWithVote?subgroupId=' + this.subgroupList[this.selectMenuIndex.split('-')[0]].id + '&text=' + text + '&frameId=' + this.subgroupList[this.selectMenuIndex.split('-')[0]].frameId + '&name=' + String(this.newSubgroupVote.name) + '&description=' + String(this.newSubgroupVote.description) + '&yesWord=' + String(this.newSubgroupVote.yesWord) + '&noWord=' + String(this.newSubgroupVote.noWord), this.newSubgroupVote.voter)
            if (res.code === 1) {
                ElMessage({
                    message: res.message,
                    type: 'success'
                })
                this.$router.go(0)
            } else {
                ElMessage({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        onCancelCreateActivityRecommendWithVote() {
            this.newSubgroupVote = {
                name: null,
                description: null,
                voter: [],
                yesWord: null,
                noWord: null
            }
            this.newActivityRecommendPic = null
            this.contentList = []
        }
    }
}
</script>

<style scoped>
.notice {
    padding: 10px;
    font-size: larger;
    background-color: rgba(255, 255, 255);

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