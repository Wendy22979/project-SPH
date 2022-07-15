<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="outBgc" @mouseenter="isShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级分类 -->
        <div class="sort" v-show="sortShow">
          <div class="all-sort-list2" @click="sortToSearch">
            <!-- 一级分类 -->
            <div
              class="item"
              v-for="(item1, index) in TypeList"
              :key="item1.categoryId"
            >
              <h3
                @mouseenter="setBgc(index)"
                :class="{ bgc: index == indexBgc }"
              >
                <a
                  :data-categoryName="item1.categoryName"
                  :data-category1Id="item1.categoryId"
                  >{{ item1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix" v-show="index == indexBgc">
                <div class="subitem">
                  <!-- 二级分类 -->
                  <dl
                    class="fore"
                    v-for="item2 in item1.categoryChild"
                    :key="item2.categoryId"
                  >
                    <dt>
                      <a
                        :data-categoryName="item2.categoryName"
                        :data-category2Id="item2.categoryId"
                        >{{ item2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <!-- 三级分类 -->
                      <em
                        v-for="item3 in item2.categoryChild"
                        :key="item3.categoryId"
                      >
                        <a
                          :data-categoryName="item3.categoryName"
                          :data-category3Id="item3.categoryId"
                          >{{ item3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data () {
    return {
      indexBgc: -1,
      sortShow: true,
    };
  },
  mounted () {
    // 非home页面，一进去三级列表不展示
    if (this.$route.path !== "/home") {
      this.sortShow = false;
    }
  },
  computed: {
    ...mapState("home", ["TypeList"]),
  },
  methods: {

    // 动态给1级分类添加标签,移入事件
    setBgc: throttle(function (index) {
      this.indexBgc = index;
    }, 100),
    // 跳转到search页面
    sortToSearch (event) {
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      // 如果存在categoryname自定义属性就为a标签
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };

        if (category1id) {
          //利用id分类穿过来的是二级还是三级
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        location.query = query;
        // 合并query与params参数
        let params = JSON.stringify(this.$route.params)
        if (params !== "{}") {
          location.params = this.$route.params
        }
        this.$router.push(location);
      }
    },
    // 三级分类进入显示
    isShow () {
      this.sortShow = true;
    },
    // 移出事件，移出归位,隐藏
    outBgc () {
      this.indexBgc = -1;
      if (this.$route.path !== "/home") {
        this.sortShow = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .bgc {
            background-color: skyblue;
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
  }
}

// 三级分类过渡动画
@keyframes stor {
  from {
    height: 0px;
  }
  to {
    height: 410px;
  }
}
.sort-enter-active {
  animation: stor 0.2s linear;
}
</style>