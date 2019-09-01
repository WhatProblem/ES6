<template>
    <div id="app">
        <span>{{content}}</span>
        <img src="./assets/logo.jpg" alt="">
        <router-view/>
    </div>
</template>
<script>
export default {
    name: 'App',
    data () {
        return {
            content: 'Welcome to Vue'
        }
    }
}
</script>
<style lang="less">
    #app {
        font-size: 40px;
        width: 100%;
        line-height: 60px;
        span {
            color: blue;
            &:hover {
                color: red;
                font-size: 60px;
                transition: all 0.25s;
            }
        }
        img {
            width: 100px;
            height: 100px;
        }
    }
</style>
