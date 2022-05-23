<template>
  <div id="app">
   <HeaderPage/>
   <!-- 路由出口 -->
   <router-view></router-view>
   <FooterPage v-show="this.$route.meta.isShow"/>
  </div>
</template>

<script>
import HeaderPage from "./components/header"
import FooterPage from "./components/footer"
export default {
  name: 'App',
  components: {
    HeaderPage,
    FooterPage
  }
}
</script>

<style>

</style>
