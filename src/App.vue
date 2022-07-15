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
import { mapActions} from "vuex";
export default {
  name: 'App',
  components: {
    HeaderPage,
    FooterPage
  },
  created() { 
    this.getTypeNavList();
  },
  methods:{
    ...mapActions("home", ["typeList"]),
    // 三级分类列表初始化请求
    async getTypeNavList() {
      try {
        await this.typeList();
      } catch (error) {
        console.log(error);
      }
    },
  }
  // mounted(){
  //   console.log("app被执行了")
  // }
}
</script>

<style>

</style>
