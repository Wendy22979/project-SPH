<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑 -->
          <ul class="fl sui-tag">
            <!-- 三级导航 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="delCategoryName">×</i>
            </li>
            <!---搜索关键字 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="delKeyword">×</i>
            </li>
            <!-- 品牌信息 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="delTrademark">×</i>
            </li>
            <!-- 商品属性 -->
            <template v-if="searchParams.props.length !== 0">
              <li
                class="with-x"
                v-for="(attr, index) in searchParams.props"
                :key="attr"
              >
                {{ attr.split(":")[1] }}
                <i @click="delProps(index)">×</i>
              </li>
            </template>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          :trademarkList="trademarkList"
          :attrsList="attrsList"
          @addTrademark="addTrademark"
          @addProps="addProps"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{ active: searchParams.order.split(':')[0] == 1 }"
                  @click="orderSort(1)"
                >
                  <a>
                    综合
                    <span
                      :class="{
                        iconfont: true,
                        'icon-arrowup': isAsc,
                        'icon-arrowdown': isDesc,
                      }"
                      v-if="searchParams.order.split(':')[0] == 1"
                    ></span>
                  </a>
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <li
                  :class="{ active: searchParams.order.split(':')[0] == 2 }"
                  @click="orderSort(2)"
                >
                  <a>
                    价格
                    <span
                      :class="{
                        iconfont: true,
                        'icon-arrowup': isAsc,
                        'icon-arrowdown': isDesc,
                      }"
                      v-if="searchParams.order.split(':')[0] == 2"
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="item in goodsList"
                :key="item.id"
                @click="skipDetail(item.id)"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a target="_blank"><img :src="item.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="item.title">{{
                      item.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command"
                      >已有<span>{{ item.id }}</span
                      >人评价</i
                    >
                  </div>
                  <div class="operate">
                    <router-link
                      :to="`/details/${item.id}`"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</router-link
                    >

                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pagesize="searchParams.pageSize"
            :total="total"
            :continuer="5"
            @setPageNum="setPageNum"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TypeNav from "@/components/TypeNav"
import SearchSelector from './SearchSelector/SearchSelector'
import Pagination from "@/components/pagination/paginationS.vue"
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "SearchPage",
  components: {
    TypeNav,
    SearchSelector,
    Pagination
  },
  data () {
    return {
      searchParams: { //传递参数
        "category3Id": "",
        "category2Id": "",
        "category1Id": "",
        "categoryName": "",
        "keyword": "",
        "props": [], //商品属性
        "order": "1:desc",
        "pageNo": 1,
        "pageSize": 10,
        "trademark": ""
      }

    }
  },
  methods: {
    ...mapActions("search", ["getSearch"]),

    // 初始化请求
    searchList () {
      this.getSearch(this.searchParams)
    },

    // 面包屑categoryName信息删除
    delCategoryName () {
      //  删除searchParams对应信息
      this.searchParams.categoryName = undefined
      this.searchParams.category3Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category1Id = undefined
      // 删除后发送请求
      this.searchList()
      // 处理地址问题
      this.$router.push({
        name: "search",
        params: this.$route.params || undefined
      })

    },
    // 面包屑keyword信息删除
    delKeyword () {
      // 清除相关信息
      this.searchParams.keyword = undefined
      // 重新请求
      this.searchList()
      // 处理地址
      this.$router.push({
        name: "search",
        query: this.$router.query || undefined
      })
    },
    // add品牌信息
    addTrademark (trademark) {
      // 添加品牌信息
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // 发送请求
      this.searchList()
    },
    // 删除品牌信息
    delTrademark () {
      // 删除相关信息
      this.searchParams.trademark = undefined
      // 请求
      this.searchList()

    },
    // 添加商品属性
    addProps (attr, attrValue) {
      // 数组不重复时添加
      if (this.searchParams.props.indexOf(`${attr.attrId}:${attrValue}:${attr.attrName}`) === -1) {
        this.searchParams.props.push(`${attr.attrId}:${attrValue}:${attr.attrName}`)
      }
      //请求
      this.searchList()
    },
    // 删除商品属性
    delProps (index) {
      // 删除相关信息
      this.searchParams.props.splice(index, 1)

      //请求
      this.searchList()
    },
    // 排序点击事件
    orderSort (sort) {
      let order = this.searchParams.order;   //获取上一次点击的信息
      let oldCategory = order.split(":")[0]; //上一次的类别
      let oldSort = order.split(":")[1];   //上一次的排序方式
      let newOrder = "";                          //记录新的order的值
      // 如果上一次的类别与这一次的类别相等，那么此次点击只切换排序方式
      if (sort == oldCategory) {
        newOrder = `${sort}:${oldSort === "desc" ? "asc" : "desc"}`
      } else {
        // 如果切换类别，则默认新类别排序方式为desc
        newOrder = `${sort}:${"desc"}`

      }
      //  修改数据
      this.searchParams.order = newOrder
      // 发送请求
      this.searchList()
    },

    //  修改页面数据
    setPageNum (page) {
      //  修改数据
      this.searchParams.pageNo = page

      // 更新数据
      this.searchList()

    },

    // 点击跳转详情
    skipDetail (id) {
      this.$router.push({
        name: "details",
        params: {
          skuId: id
        }
      })
    }


  },
  watch: {
    $route: {
      immediate: true,
      handler () {
        // 每次请求完毕后将三极路由传参的id清空，因为三个id一次只需要发送一个
        this.searchParams.category3Id = ""
        this.searchParams.category2Id = ""
        this.searchParams.category1Id = ""
        this.searchParams = { ...this.searchParams, ...this.$route.params, ...this.$route.query }
        this.searchList()
      }
    }
  },
  computed: {
    ...mapGetters(["trademarkList", "goodsList", "attrsList", "total"]),
    // 判断是不是升序
    isAsc () {
      return this.searchParams.order.split(":")[1] === "asc"
    },
    // 判断是不是降序
    isDesc () {
      return this.searchParams.order.split(":")[1] === "desc"
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>