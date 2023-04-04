<template>
    <el-container>
        <el-header>

        </el-header>
        <el-main>
            <el-row class="block">
                <el-col>
                    <el-row justify="space-around" style="margin-bottom: 40px;">
                        <el-col :span="8">
                            <el-image :src="this.$http.defaults.baseURL + this.bookInfo.bookCover" fit="cover"
                                style="width: 250px; height: 300px;"></el-image>
                        </el-col>
                        <el-col :span="6" style="padding-top: 40px;">
                            <el-descriptions title="书籍信息" :column="1">
                                <el-descriptions-item label="书名：">{{ bookInfo.name }}</el-descriptions-item>
                                <el-descriptions-item label="作者：">{{ bookInfo.author }}</el-descriptions-item>
                                <el-descriptions-item label="出版社：">{{ bookInfo.publisher }}</el-descriptions-item>
                                <el-descriptions-item label="出版时间：">{{ bookInfo.publishTime }}</el-descriptions-item>
                                <el-descriptions-item label="译者：">{{ bookInfo.translator }}</el-descriptions-item>
                                <el-descriptions-item label="ISBN：">{{ bookInfo.ISBN }}</el-descriptions-item>
                            </el-descriptions>
                        </el-col>
                        <el-col :span="10" style="padding-top: 40px;">
                            书籍评分：
                            <el-row style="margin-bottom: 20px;">
                                <el-col :span="6" style="display: flex; align-items: center;">
                                    <span style="font-size: xx-large;">
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
                            <el-button type="private" @click="updateMyRate">确认</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>

                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            bookId: null,
            bookInfo: {},
            bookRate: {
                myRate: 0,
                average: 0,
                num: 0,
                five: 0,
                four: 0,
                three: 0,
                two: 0,
                one: 0
            }
        }
    },
    async mounted() {
        this.bookId = this.$route.query.bookId
        const { data: res } = await this.$http.get('/book/bookInfoById?id=' + this.bookId)
        this.bookInfo = res.data.bookInfo
        const { data: rateRes } = await this.$http.get('/book/bookRate?bookId=' + this.bookId)
        if (rateRes.data !== null) {
            this.bookRate = rateRes.data
        }
    },
    methods: {
        async updateMyRate() {
            const { data: res } = await this.$http.post('/book/updateRate', { "bookId": this.bookId, "rate": this.bookRate.myRate })
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
        }
    }
}
</script>

<style scoped>
.el-container {
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