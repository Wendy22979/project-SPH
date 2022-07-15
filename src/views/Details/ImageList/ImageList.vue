<template>
  <!-- 轮播图 -->
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item, index) in skuImageList"
        :key="item.id"
        @click="setActive(item.id, index)"
      >
        <img :src="item.imgUrl" :class="{ active: isActive == item.id }" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
export default {
  name: "ImageList",
  props: ["skuInfo"],
  data () {
    return {
      isActive: "", //当前选中状态的id
    }
  },
  computed: {
    skuImageList () {
      return this.skuInfo.skuImageList || []
    },
  },
  methods: {
    setActive (id, index) {
      console.log(id, index)
      // 更改对应存储id
      this.isActive = id
      // 通知大图更改图片
      this.$bus.$emit("setImg", this.skuImageList[index].imgUrl)
    }
  },
  watch: {
    // 轮播图实例化
    skuInfo () {
      this.$nextTick(() => {
        // 实例化轮播图
        new Swiper(this.$refs.swiper, {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          // 一次页面展示三张图片
          slidesPerView: 3,
          // 三张图片一组，一次切换三个
          slidesPerGroup: 3,
        })
        // 初始化图片的选中状态
        this.isActive = this.skuImageList[0].id
      })
    }
  }

}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>