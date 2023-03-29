<template>
    <el-button @click="onclick">test</el-button>
</template>

<script>
export default {
    data() {
        return {
            data: {
                oldPassword: null,
                newPassword: null
            }
        }
    },
    methods: {
        async onclick() {
            const { data: res } = await this.$http.put('/user/updatePassword', this.data)
            console.log(res)
        }
    }
}
</script>

<style scoped></style>