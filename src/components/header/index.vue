<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userInfo.nickName">
            <span>请</span>
            <a @click="$router.push('/login')">登录</a>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{ userInfo.nickName }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart"> 我的购物车</router-link>
          <router-link to="/home">我的尚品汇</router-link>
          <a>尚品汇会员</a>
          <a>企业采购</a>
          <a>关注尚品汇</a>
          <a>合作招商</a>
          <a>商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt="" />
        </a>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="searchValue"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="toSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Message } from "element-ui"
export default {
  name: "HeaderPage",
  data () {
    return {
      searchValue: "", //搜索内容
    };
  },
  methods: {
    ...mapActions("register", ["reqUserLogout"]),
    // 跳转到搜索页面
    toSearch () {
      let query = JSON.stringify(this.$route.query);
      let location = {
        name: "search",
        params: {
          keyword: this.searchValue || undefined,
        },
      };
      if (query != "{}") {
        location.query = this.$route.query;
      }
      this.$router.push(location);
    },
    // 退出登录
    async logout () {
      // 退出登录
      let res = await this.reqUserLogout()
      if (res == "ok") {
        // 提示信息
        Message.success("已退出登录")
        // 路由跳转
        this.$router.replace("/home")
      }


    }
  },
  computed: {
    ...mapState("register", ["userInfo"]),

  }
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>