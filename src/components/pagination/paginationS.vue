<template>
  <!-- 分页器 -->
  <div>
    <div class="fr page">
      <div class="sui-pagination clearfix">
        <ul>
          <!-- 上半部分 -->
          <li
            class="prev disabled"
            @click="updatePage(pageNo - 1)"
            :class="{ active: pageNo == 1 }"
          >
            <a>«上一页</a>
          </li>
          <li v-if="start > 1" @click="updatePage(1)">
            <a class="bor-right">1</a>
          </li>
          <li class="dotted" v-if="start > 2" @click="more(start - 1)">
            <span>...</span>
          </li>
          <!-- 中间 -->
          <li
            v-for="(page, index) in end"
            :key="index"
            @click="updatePage(page)"
            :class="{ active: pageNo == page }"
          >
            <a v-if="page < start ? false : true">{{ page }}</a>
          </li>

          <!-- 下面部分 -->
          <li class="dotted" v-if="end < totalPage - 2" @click="more(end + 1)">
            <span>...</span>
          </li>
          <li
            v-if="end < totalPage - 1"
            @click="updatePage(totalPage)"
            :class="{ active: pageNo == totalPage }"
          >
            <a class="bor-right">{{ totalPage }}</a>
          </li>
          <li class="next" @click="updatePage(pageNo + 1)">
            <a>下一页»</a>
          </li>
        </ul>
        <!-- 总页数 -->
        <div class="totalPages">
          <span>共{{ totalPage }}页&nbsp;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "paginationS",
  props: ["pageNo", "pagesize", "total", "continuer"],
  computed: {
    // 总页数
    totalPage () {
      return Math.ceil(this.total / this.pagesize)
    },
    // 连续页码数
    start () {
      let { start } = this.continuePageNum()
      return start
    },
    end () {
      let { end } = this.continuePageNum()
      return end
    }

  },
  methods: {
    // 分页器起始页计算
    continuePageNum () {
      // 启始于结尾数
      let start = this.pageNo - Math.floor(this.continuer / 2)
      let end = this.pageNo + Math.floor(this.continuer / 2)
      // 连续页码大于总页数时
      if (this.continuer > this.totalPage) {
        start = 1
        end = this.totalPage
      } else if (start <= 0) {
        // 当前页码数为1时
        start = 1
        end = this.continuer
      } else if (end > this.totalPage) {
        start = this.totalPage - 5,
          end = this.totalPage
      }
      return { start, end }
    },
    updatePage (page) {
      if (page > 0 && page < this.totalPage + 1) {
        this.$emit("setPageNum", page)
      }
    },
    // ...处理
    more (num) {
      this.$emit("setPageNum", num)
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  // width: 1000px;
  width: 100%;
  height: 66px;
  overflow: hidden;
  float: right;

  .sui-pagination {
    margin: 18px 0;

    ul {
      margin-left: 0;
      margin-bottom: 0;
      vertical-align: middle;
      // width: 490px;
      float: left;

      li {
        line-height: 18px;
        display: inline-block;

        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
        }

        &.active {
          a {
            background-color: skyblue;
            color: #fff;
            border-color: #fff;
            cursor: default;
          }
        }

        &.prev {
          a {
            background-color: #fafafa;
          }
        }

        &.disabled {
          a {
            color: #999;
            cursor: default;
          }
        }

        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px 18px;
            color: #333;
          }
        }

        &.next {
          a {
            background-color: #fafafa;
          }
        }

        &.bor-right {
          border-right: 1px solid #e0e9ee;
        }
      }
    }

    div {
      color: #333;
      font-size: 14px;
      float: right;
      width: 241px;
      line-height: 38px;
    }
  }
}
</style>