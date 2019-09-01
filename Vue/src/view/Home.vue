<template>
    <div class="home">
        home
        <button @click="navProfile">跳转到Profile</button>
    </div>
</template>
<script>
export default {
    name: 'Home',
    methods: {
        navProfile() {
            this.$router.push({path: '/profile'})
        }
    }
}
</script>
<style lang="less">

</style>
