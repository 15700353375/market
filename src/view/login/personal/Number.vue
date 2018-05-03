<!--
 * @Author:      cyzeng
 * @DateTime:    2017-07-24 13:53:30
 * @Description: topbar以及内容区域
 -->

<template>

<div class="clearfix">
    <div class="ctit">
        <em>邀请好友数</em>
    </div>
    <div class="quota clear" style="line-height:25px;">
        您成功邀请到了<span>{{point}}</span>位币友<br>
        再邀请<span>{{differ}}</span>位币友即可免费使用{{invite_day}}天哦~ <br>
        已用积分数： <span>{{used_point}}</span> <br>
        可用积分数： <span>{{available_point}}</span>  
        <button v-if="differ <= 0" class="btn btn-default ch_btn_green mg_l20" @click='updata' style="padding:4px 12px;height:30px;">兑换</button>
    </div>
    <div class="ctxtl ctxtm clear">

        <table class="table mg-b0 tab_border_bottom">
            <thead>
            <tr>
                <th class='cur-p text-left'>手机号</th>
                <th class='cur-p text-right'>加入时间</th>
            </tr>
            </thead>
            <tbody>
            <template v-if="list && list.length">
                <tr v-for="item in list">
                    <td class="text-left" >
                        {{item.mobile}}
                    </td>
                    <td class="text-right">{{item.create_time}}</td>           
                </tr>
            </template>
            <tr v-else>
                <td colspan="13">暂无数据</td>
            </tr>
            </tbody>
        </table>
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

          list: [],
        //   可用积分
          available_point: 0,
          	// 差多少积分
          differ: 1,
        //   兑换VIP需要划分的积分
          invite_point: 0,
        //   可兑换VIP天数
            invite_day: 0,
            point: 0,
            used_point: 0,
      }
    },
    mounted(){
        this.getList();
    },
    computed: mapState({
        user: state => state.login.userInfo,

    }),
    methods: {

         // 关注列表
        getList(){
            let params = {
                token: this.user.token
            };
            this.$ajaxGet('http://bitcoin.xxw360.com/inviteList', params)
                .then((res)=>{
                  if( res && res.code == 200){
                    this.list = res.data.list;
                    this.available_point = res.data.available_point;
                    this.differ = res.data.differ;
                    this.invite_point = res.data.invite_point;
                    this.invite_day = res.data.invite_day;
                    this.used_point = res.data.used_point;
                    this.point = res.data.point;

                  }else{
                    this.$message.error(res.msg);
                  }
            })
        },

        updata(){            
            let parmas = {
                token: this.user.token
            };
            this.$ajaxQsPost('http://bitcoin.xxw360.com/exchange', parmas)
                .then((res)=>{                  
                  if( res && res.code == 200){
                    this.$message.success(res.msg);
                  }else{
                    this.$message.error(res.msg);
                  }
            })
        }


    },
    components: {
      
    }
  }

</script>


<style scoped>
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

.ctxtl .ctxtm{
    margin-top: 15px;
    border-top: none;
}
.ctxtl{
    border:1px solid #ececec;
    border-bottom: none;
}
.ctxtl ul{
    border-top: 1px solid #ececec;
    list-style-type:none ;
}
.ctxtl ul li{
    border-bottom: 1px solid #ececec;
    line-height: 43px;
    font-size:14px;
    padding:0 15px;
}
.ctxtl ul li span{
    float: right;
    font-size:14px;
    color: #999;;
}



@media only screen and (min-width: 768px) {
   .ctxtl ul li{
        font-size:12px;
    }
}
</style>

