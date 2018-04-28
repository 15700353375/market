<!--
 * @Author:      cyzeng
 * @DateTime:    2017-07-24 13:53:30
 * @Description: topbar以及内容区域
 -->

<template>

<div class="clearfix">
    <div class="ctit">
        <em>基本信息</em>
    </div>
    <div class="quota clear">
     
        <p><span>手机号码：</span>
            {{userInfo.mobile}}
            <span v-if="userInfo.is_vip == '0'" style="margin-left:20px;color: orange">您还不是会员</span>
        </p>

        <div>{{userInfo.rule}}</div>
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


          userInfo: {},
      }
    },
    mounted(){
        this.getInfo();
    },
    computed: mapState({
      // 名字
      user: state => state.login.userInfo,


    }),
    methods: {
        // 邀请
        getInfo(){
            let params = {
                token: this.user.token
            };
            this.$ajaxGet('http://bitcoin.xxw360.com/member', params)
                .then((res)=>{
                  if( res && res.code == 200){
                        this.userInfo = res.data;
                     
                  }else{
                    this.$message.error(res.message);
                  }
            })
        },

    },
    components: {
      
    }
  }

</script>


<style scoped>

/* // 大屏幕 */
@media only screen and (min-width: 1040px) {
    
}

/*移动端*/
@media only screen and (max-width: 1039px){

}
.ctit{
    border-bottom: 2px solid #ccc;
    height: 40px;
    line-height: 40px;
    width: 100%;
}
.ctit em{
    border-bottom: 2px solid #ff6000;
    color: #ff6000;
    font-size: 16px;
    font-weight: bold;
    display: inline-block;
    font-style: normal;
    line-height: 38px;
}
.quota{
    padding: 15px 0;
}
.quota dl dt{
    float: left;
    color: #999;
    text-align: justify;
    text-align-last: justify;
    font-size: 14px;
    width: 58px;
}
.quota dl dd{
    float: right;
    width: 890px;
}
.quota dl dd p{
    font-size: 14px;
    color: #000000;
}
</style>

