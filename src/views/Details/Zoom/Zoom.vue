<template>
  <!-- 本体图片 -->
  <div class="spec-preview">
    <img :src="skuDefaultImg" ref="normal" />
    <div class="event" @mousemove="moveMagnify($event)"></div>
    <!-- 放大镜 -->
    <div class="big">
      <img :src="skuDefaultImg" ref="bigger" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "DetailsZoom",
  props: ["skuInfo"],
  computed: {
    skuDefaultImg () {
      return this.skuInfo.skuDefaultImg
    }
  },
  methods: {
    // 动态展示图片
    setImg (value) {
      this.$refs.normal.src = value
      this.$refs.bigger.src = value
    },
    // 鼠标移动事件处理放大镜效果
    moveMagnify (e) {
      let mask = this.$refs.mask  //mask的dom
      let bigger = this.$refs.bigger //bigger的dom
      //mask偏移的距离,点到的距离为mask中心
      let top = e.offsetY - mask.offsetWidth / 2
      let left = e.offsetX - mask.offsetWidth / 2
      // 设置上下边界
      if (top <= 0) {
        top = 0
      } else if (top >= mask.offsetWidth) {
        top = mask.offsetWidth
      }

      // 设置左右边界
      if (left <= 0) {
        left = 0
      } else if (left >= mask.offsetWidth) {
        left = mask.offsetWidth
      }

      // 修改mask的位置
      mask.style.top = top + "px"
      mask.style.left = left + "px"
      // 修改放大图的位置
      bigger.style.top = -top * 2 + "px"
      bigger.style.left = -left * 2 + "px"



    }
  },
  mounted () {
    this.$bus.$on("setImg", this.setImg)
  },
  beforeDestroy () {
    this.$bus.$off("setImg")
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;
  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>