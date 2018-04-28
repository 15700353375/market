<!--
 * @Author:      cyzeng
 * @DateTime:    2017-07-24 13:53:30
 * @Description: topbar以及内容区域
 -->

<template>
  <div class="headerBox">
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
  import LoginVue from '@Components/LoginVue';
  export default {
    props: ['navData'],
    data() {
      return {


        //相关模态框开关
        dialogs: {
          gologin: false,
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
      logout(){
        this.$store.commit('login/setUserInfo', {});
      },
      nav(e){
        console.log(e.target.dataset.hi)
        this.idx = e.target.dataset.hi

        this.$store.commit('common/setlistStatus', this.idx);

        this.$router.push({name:'report'});
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

      // 登录
      login(){
        this.dialogs.login = true;
        this.$refs.login.$emit('gologin', 1);
      },

      // 登录
      register(){
        this.dialogs.login = true;
        this.$refs.login.$emit('gologin', 2);
      },

      // 个人中心
      personal(){
        this.$router.push({name:'basic'});
      }

    },
    components: {
      LoginVue
    }
  }

</script>



