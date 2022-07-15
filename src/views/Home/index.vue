<template>
  <div>
    <!-- 三级联动 -->
    <TypeNav />
    <!-- 轮播图模块 -->
    <ListContainer />
    <!-- 今日推荐 -->
    <TodayRecommend />
    <TodyRank />
    <GuessYouLike />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import TodayRecommend from "./TodayRecommend";
import TodyRank from "./TodyRank";
import GuessYouLike from "./GuessYouLike";
import Floor from "./Floor";
import Brand from "./Brand";
import { mapActions, mapState } from 'vuex';


export default {
  name: "HomePage",
  components: {
    ListContainer,
    TodayRecommend,
    TodyRank,
    GuessYouLike,
    Floor,
    Brand,
  },
  methods: {
    ...mapActions("home", ["getFloorList"]),
    //  floor列表初始化请求
    getFloor () {
      try {
        this.getFloorList()
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapState("home", ["floorList"])
  },

  created () {
    this.getFloor()
  }


};
</script>

<style lang="less" scoped>
</style>