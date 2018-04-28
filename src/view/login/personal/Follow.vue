<!--
 * @Author:      cyzeng
 * @DateTime:    2017-07-24 13:53:30
 * @Description: topbar以及内容区域
 -->

<template>

<div class="clearfix">
    <div class="ctit">
        <em>关注列表</em>
    </div>
    <div class="quota clear">

    </div>
    <div class="ctxtl ctxtm clear" v-if="list && list.length">
        <!-- <ul>
            <li v-for="item in list">
                {{item.name}}
                <span class="cur-p" @click='cancel(item.id)'>取消关注</span>
            </li>
        </ul> -->

        <table class="table mg-b0 tab_border_bottom">
            <thead>
            <tr>
                <th class='cur-p text-left'>名称</th>
                <th class='cur-p text-right'>操作</th>
            </tr>
            </thead>
            <tbody>
            <template v-if="list && list.length">
                <tr v-for="item in list">
                    <td class="text-left" >
                        {{item.name}}
                    </td>
                    <td class="text-right cur-p" @click='cancel(item.id)'>取消关注</td>           
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


      }
    },
    mounted(){

        this.getList()

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
            this.$ajaxGet('http://bitcoin.xxw360.com/follow', params)
                .then((res)=>{
                  if( res && res.code == 200){
                      if(res.data && res.data.length){
                          this.list = res.data
                      }                      
                  }else{
                    this.$message.error(res.message);
                  }
                })
        },

        // 取消关注
        cancel(id){
            let params = {
                id: id,
                token: this.user.token
            }
            this.$ajaxQsPost('http://bitcoin.xxw360.com/unFollow', params)
                .then((res)=>{
                  if( res && res.code == 200){
                      this.$message.success(res.code);                  
                  }else{
                    this.$message.error(res.message);
                  }
                })

            this.getList();

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
</style>

