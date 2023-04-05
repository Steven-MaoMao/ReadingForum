<template>
    <el-container>
        <el-header>
            <myHead></myHead>
        </el-header>
        <el-container>
            <el-aside>

            </el-aside>
            <el-main>

            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import myHead from '../components/myHead.vue'
export default {
    components: { myHead },
    data() {
        return {
            topTenBook: [],
        }
    },
    async mounted() {
        const { data: topTenBookRes } = await this.$http.get('/book/topTen')
        this.topTenBook = topTenBookRes.data.bookList
        console.log(this.topTenBook)
    },
    methods: {

    }
}
</script>

<style scoped></style>