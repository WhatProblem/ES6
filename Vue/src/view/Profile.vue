<template>
    <div class="profile">profile <button @click="backHome">返回home</button></div>
</template>
<script>
export default {
    name: 'Profile',
    methods: {
        backHome() {
            this.$router.go(-1)
            console.log('返回上一页')
            // this.$router.push('/home')
        }
    }
}
</script>
<style lang="less">

</style>
