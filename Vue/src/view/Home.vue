<template>
  <div class="home">
    home
    <button @click="navProfile">跳转到Profile</button>
    <div>{{test}}</div>
  </div>
</template>
<script>
export default {
  name: "Home",
  computed: {
      test() {
          return '测试计算属性'
      }
  },
  methods: {
    navProfile() {
      // let str = "abc";
      // console.log(str.includes("a"));
      this.$router.push({ path: "/profile" });
    }
  }
};
</script>
<style lang="less">
</style>
