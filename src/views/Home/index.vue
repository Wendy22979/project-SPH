<template>
  <div>
    <!-- 三级联动 -->
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <TodyRank />
    <GuessYouLike />
    <Floor />
    <Floor />
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
  
};
</script>

<style lang="less" scoped>
</style>