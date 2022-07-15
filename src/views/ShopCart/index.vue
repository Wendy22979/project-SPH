<template>
  <!-- 购物车 -->
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(item, index) in shopCartList"
          :key="item.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @click="cutIsChecked(item.skuId, item.isChecked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="amendNum('reduce', item, index)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="skuNum[index]"
              minnum="1"
              class="itxt"
              @blur="amendNum('input', item, index)"
              ref="input"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="amendNum('add', item, index)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="delCommodity(item.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="allSelector" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="delAllCheckedShop">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ selectorNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ total }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { Message } from 'element-ui';
// 节流函数
import throttle from "lodash/throttle";
export default {
  name: 'ShopCart',
  data () {
    return {
      skuNum: [],//存储数量
    }
  },
  mounted () {
    this.shopCartInfo()
    this.$nextTick(() => {
      this.skuNum = this.shopCartList.map((item) => {
        return item.skuNum
      })

    })
  },
  methods: {
    ...mapActions("shopcart", ["getShopCart", "delShopChar", "cutChecked", "allCutChecked", "delAllChecked"]),
    ...mapActions("details", ["addShopChar"]),
    // 初始化请求
    shopCartInfo () {
      this.getShopCart()
    },
    // 数量处理函数
    amendNum: throttle(async function (type, item, index) {
      let nowNum
      let value  //input的value值

      switch (type) {
        case 'reduce':
          // 点击- 的情况
          nowNum = item.skuNum < 1 ? 0 : item.skuNum - 1
          break;
        case 'add':
          nowNum = item.skuNum + 1
          break;
        case 'input':
          value = this.$refs.input[index].value - 0//input输入的量
          // value的情况处理
          if (isNaN(value) || value < 0) {
            // 判断输入是不是NaN或者小于0，是的话就为上一次的数量
            nowNum = item.skuNum
          }
          // 数字取整处理
          nowNum = parseInt(value)
          break;
      }

      // 修改数量，发起请求
      let num = nowNum - item.skuNum
      // 修改input框的值
      this.skuNum.splice(index, 1, nowNum)
      // 修改数量请求，做数据同步，使下一次的进入数据不会有不同
      await this.addShopChar({ skuId: item.skuId, skuNum: num })
      // // 更新数据
      await this.getShopCart()
    }, 500),

    //  删除商品
    async delCommodity (skuId) {
      let res = await this.delShopChar(skuId)
      if (res == "ok") {
        // 更新页面
        this.shopCartInfo()
        Message.success("删除成功")

      }
    },

    // 切换选中状态
    async cutIsChecked (skuID, isChecked) {
      try {
        isChecked = isChecked == 1 ? "0" : "1"
        await this.cutChecked({ skuID, isChecked })

        //  更新数据
        this.shopCartInfo()
      } catch (error) {
        console.log(error)
      }

    },
    // 删除全部选中
    async delAllCheckedShop () {
      try {
        await this.delAllChecked()
        // 更新状态
        this.shopCartInfo()
        // 提示信息
        Message.success("删除成功")
      } catch (error) {
        console.log(error)
      }
    }
  },

  computed: {
    ...mapState("shopcart", ["shopCartList"]),
    // 全选反选
    allSelector: {
      get () {
        return this.shopCartList.every((item) => {
          return item.isChecked == 1
        })
      },
      async set (checked) {
        checked = checked ? "1" : "0"
        try {
          await this.allCutChecked(checked)
          // 更新数据
          await this.shopCartInfo()
        } catch (error) {
          console.log(error)
        }

      }
    },
    // 已选择商品数量
    selectorNum () {
      return this.shopCartList.reduce((sum, item) => {
        if (item.isChecked == 1) {
          return sum + item.skuNum
        }
        return sum
      }, 0)
    },

    // 总价
    total () {
      return this.shopCartList.reduce((sum, item) => {
        if (item.isChecked == 1) {
          return sum + (item.skuNum * item.cartPrice)
        }
        return sum
      }, 0)
    }
  },
  watch: {
    shopCartList () {
      // 购物侧数量的初始值
      this.skuNum = this.shopCartList.map((item) => {
        return item.skuNum
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;
          display: flex;
          align-items: center;

          img {
            width: 82px;
            height: 82px;
          }

          .item-msg {
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>