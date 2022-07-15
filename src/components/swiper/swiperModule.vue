<template>
  <div>
    <div class="swiper-container" ref="swiperContainer">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in list" :key="index">
          <img :src="item.imgUrl" alt="!" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
export default {
  props: ["list"],
  methods: {
    // "轮播图初始化"
    swiper () {
      var mySwiper = new Swiper(".swiper-container", {
        //设置轮播图防线
        direction: "horizontal",
        loop: true, // 循环模式选项
        // 自动播放
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
          stopOnLastSlide: true,
        },

        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          //分页器类型
          type: "bullets",
          //点击分页器，切换轮播
          clickable: true,
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })


      // mySwiper.el.onmouseover = function () {
      //   mySwiper.autoplay.stop();
      // }
      // mySwiper.el.onmouseout = function () {
      //   mySwiper.autoplay.start();
      // }

      this.$refs.swiperContainer.onmouseover = function () {
        console.log("我被触发了")
        mySwiper.autoplay.stop();
      }
      this.$refs.swiperContainer.onmouseout = function () {
        mySwiper.autoplay.start();
      }

    }

  },
  beforeUpdate () {
    console.log("4")
  },
  updated () {
    console.log("5")
  },
  watch: {
    list: {
      // immediate: true,
      handler () {
        console.log("3")
        this.swiper()
      }

    }
  }
}


</script>

<style  scoped>
</style>