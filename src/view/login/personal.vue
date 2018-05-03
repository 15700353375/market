<!--
 * @Author:      cyzeng
 * @DateTime:    2017年7月31日13:49:25
 * @Description: 员工管理-员工列表
 -->

<template>
    <div class="content clearfix">
        <!-- <NavVue ></NavVue> -->
            <div class="sider left bigScreen" v-show="$route.path.indexOf('personal') != -1">
                <dl>
                    <dt>
                        <i class="i1 cur"></i>用户中心
                    </dt>
                    <dd>
                        <!-- <p><a router-link :to="'/personal/basic'">基本信息</a></p> -->
                        <p><router-link  to="/personal/basic" active-class="active">基本信息</router-link></p>
                        
                    </dd>
                    <dd>
                        <!-- <p><a router-link :to="'/personal/member'">开通会员</a></p> -->
                        <p><router-link  to="/personal/member" active-class="active">开通会员</router-link></p>
                    </dd>
                    <dd>
                        <p><router-link  to="/personal/modifyPassword" active-class="active">修改密码</router-link></p>
                        <!-- <p><a href="pwd.html">修改密码</a></p> -->
                    </dd>
                    <dt>
                        <i class="i3 cur"></i>邀请有礼
                    </dt>
                    <dd>
                        <!-- <p><a href="invite.html">立即邀请</a></p> -->
                        <p><router-link  to="/personal/invitation" active-class="active">立即邀请</router-link></p>
                    </dd>
                    <dd>
                        <!-- <p><a href="friend.html">邀请好友数:</a></p> -->
                        <p><router-link  to="/personal/number" active-class="active">邀请好友数</router-link></p>
                    </dd>        
                    <dt>
                        <i class="i3 cur"></i>关注列表
                    </dt>
                    <dd>
                        <!-- <p><a href="follow.html">关注列表</a> </p> -->
                        <p><router-link  to="/personal/follow" active-class="active">关注列表</router-link></p>
                    </dd>
                </dl>
            </div>
        <div class="right_box">
            <div class="cenrt clearfix right">
                <router-view></router-view>
            </div>  
        </div>
    </div>
</template>

<script>
  import {urls} from '@Util/axiosConfig';
  import { mapState } from 'vuex';
  import NavVue from '@Components/NavVue';
  export default {
    data(){
      return {
        

        isShow: false,


      }
    },
    mounted(){

        if(this.$route.path.indexOf('personal') != -1){
            this.$store.commit('common/setIsNavShow', true);
        }else{
            this.$store.commit('common/setIsNavShow', false);
        }
        
        // if(this.$route.path.indexOf('personal') != -1){
        //     this.isShow = true;
        // }
        // console.log(this.$route.path.indexOf('personal'))
        // debugger
        // 默认当前头部为第一个
        // this.$router.push({name:'basic'})
    },
    computed:{
      
    },
    methods: {





    },
    components:{
        NavVue,
    }
  }
</script>
<style scoped>
body{
    background: #e2e2e2;
}


/*主体*/
.content{
    width: 1230px;
    margin:20px auto;
    background: #e2e2e2;
    /* background: url(../images/cbg.png) #fff left top repeat-y; */
}


/* // 大屏幕 */
@media only screen and (min-width: 768px) {
    .content{
        width: 1230px;
    }
    .cenrt{
        width:966px;
        margin:20px;
    }
    .right_box{
        float: left;
    }
}

/*移动端*/
@media only screen and (max-width: 767px){
    .content{
        width: 100%;
        margin-top:0px;
    }
    .right_box{
        width:100%;
        box-sizing: border-box;
        /* padding:20px; */
    }
    .cenrt{
        width:100%;
    }
}

/*右侧*/
.cenrt{
    /* width: 966px; */
    
    min-height: 500px;  
    background:#fff;  
}
.right{
    float:left;
    padding:20px;
    box-sizing: border-box;
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


/*左侧*/
.sider{
    width: 180px;
    margin:20px;
    background:#fff;
    margin-right: 0px;
}
.left{
    float:left
}
.clear0{
    clear:both;
    font-size: 0px;
    height: 0px;
    overflow: hidden;
}
.sider dl dt:first-child{
    border-top:none;
}
.sider dl dt{
    font-size:16px;
    line-height: 22px;
    padding:21px 0 12px 48px;
    position: relative;
    border-top:1px solid #e6e6e6;
}
.sider dl dt i.i1{
    background-position: -132px -88px;
}
.sider dl dt i.i2{
    background-position:-220px -88px ;
}
.sider dl dt i.i3{
    background-position:-220px -88px ;
}

.sider dl dt i{
    position: absolute;
    display: inline-block;
    left: 15px;
    top:21px;
    width:22px;
    height:22px;
    display: inline-block;
    background: url("/agentStatic/imgSvg/icon.png") no-repeat;
}
.sider dl dd{
    padding-bottom: 12px;
}
.sider dl dd p{
    min-height: 35px;
    line-height: 35px;
    margin-bottom:3px;
    border-bottom: 1px solid transparent;
    border-top:1px solid transparent;
}
.sider dl dd p a{
    display: block;
    padding-left:48px;
    color: #777;
    font-size: 14px;
    text-decoration: none;
}

.sider dl dd p a.active{
    color: #ff9250;
}


@media only screen and (min-width: 768px) {
    .navbar-static-top{
        display: none;
    }

    .navbar .container>.navbar-collapse{
        top:100px;
    }
}

@media only screen and (max-width: 767px) {
    .bigScreen{
        display: none;
    }

    .top_nav{
        position: absolute;
        top:10px;
    }

    .sider{
        margin:0px;
        width:153px;
        background:#495263;
    }

    .sider dl dt{
        color:#fff;
    }

    .sider dl dd p a{
        color:#e5e5e5;
    }

    .navbar .container>.navbar-collapse{
        background:#495263;
    }
}


</style>
