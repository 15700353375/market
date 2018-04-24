<!--
 * @Author:      cyzeng
 * @DateTime:    2017-07-24 13:53:30
 * @Description: topbar以及内容区域
 -->

<template>
<div class="header">
  <div class="displayNone">{{keywordChange}}</div>
  <div class="headerBox">
    <div class="headerTop clearFloat">
      <img src="/agentStatic/img/logopc.png" alt="" class="logo fl">
      <div class="sousuoBox clearFloat">
        <span class="shangpin fl sousuodisplay">商品代码</span>
        <input type="text" placeholder="搜索" class="sousuo fr sousuodisplay" v-model="keywords" @change="change">
        <img src="/agentStatic/img/sousuo.png" alt="" class="sousuoIcon sousuodisplay">
      </div>
      <div class="dengluBox">
        <div class="weidenglu" >
          <span class="sign">登录</span>
          <span class="register">免费注册</span>
        </div>
        <div class="yidenglu">
          <!-- <router-link :to="{name:'HelloWorld'}" tag="span">欢迎瓜子可可</router-link> -->
          <span></span>
          <span>退出！</span>
        </div>
      </div>


      <div class="sousuoBox clearFloat sousuodisplays">
        <span class="shangpin fl">商品代码</span>
        <input type="text" placeholder="搜索" class="sousuo fr">
        <img src="/agentStatic/img/sousuo.png" alt="" class="sousuoIcon">
      </div>
    </div>
    <div class="nav clearFloat">
      <div class="left fl">
        <span :class="[idx == 1 ? 'border':'']" @click="nav" :data-hi ="1">概览</span>
        <span :class="[idx == 2 ? 'border':'']" @click="nav" :data-hi ="2">表现</span>
        <span :class="[idx == 3 ? 'border':'']" @click="nav" :data-hi ="3">震荡指标</span>
        <span :class="[idx == 4 ? 'border':'']" @click="nav" :data-hi ="4">跟随趋势</span>
      </div>
      <div class="right fr">
          <div class="item">USD</div>
          <div class="item yuanBox" @click='yuandian'>
              <div class="yuan" @click='yuandian' :class="[yuan == true ? 'left' : 'right']"></div>
          </div>
          <div class="item">BTC</div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
  //加载相关依赖
  import { mapState } from 'vuex';

  export default {
    props: ['navData'],
    data() {
      return {


        //相关模态框开关
        dialogs: {
          SelfInfoDialog: false,
          editPassWordDialog: false,
        },
        keywords: '',
        idx: 1,
        yuan: true,
      }
    },
    mounted(){
      this.$store.commit('common/setKeywords', '');
      this.$store.commit('common/setlistStatus', 1);
      this.$store.commit('common/setRight', 'USD$');
    },
    computed: mapState({
      // 名字
      username: state => state.login.userInfo.username,

      // 代理商ID
      agentCode: state => state.login.userInfo.agent_code,

      // 面包屑
      bread: state => state.common.bread,

      keywordChange(){
        // let keywords = this.keywords;
        // console.log(this.keywords)
      }

    }),
    methods: {
      nav(e){
        console.log(e.target.dataset.hi)
        this.idx = e.target.dataset.hi

        this.$store.commit('common/setlistStatus', this.idx);
      },

      change(e){
        console.log(e.target.value)
        let keywords = e.target.value;
        
        this.$store.commit('common/setKeywords', this.keywords);
      },

      //圆点左右滑动
      yuandian(){
          this.yuan = !this.yuan
          if(this.yuan == true){
              this.right = 'USD$'
          }else if(this.yuan == false){
              this.right = 'BTC$'
          }
          console.log(this.yuan)
          this.$store.commit('common/setRight', this.right);
      },

    },
    components: {
    }
  }

</script>



