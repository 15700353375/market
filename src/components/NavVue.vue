<!--
 * @Author:      cyzeng
 * @DateTime:    2017-07-24 13:53:30
 * @Description: topbar以及内容区域
 -->

<template>

<div class="top_nav">
    <nav class="navbar navbar-inverse navbar-static-top" style=" background:transparent;width:50px;">
    <div class="container">
        <div class="navbar-header" style="background:transparent;">
        <button type="button" class="navbar-toggle collapsed pull-left" data-toggle="offcanvas">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <!-- <a class="navbar-brand" href="#"></a> -->
        </div>
        <div id="navbar" style="top:0px;" class="collapse navbar-collapse sidebar-offcanvas">
        <div class="sider left" style="margin-top:50px;">
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
        </div><!--/.nav-collapse -->
    </div>
    </nav>

    <div class="sider left bigScreen">
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
</div>

</template>

<script>
  //加载相关依赖
  
  import * as offcanvas from '@Src/assets/js/offcanvas.min.js';
  import { mapState } from 'vuex';
  import LoginVue from '@Components/LoginVue';
  export default {
    props: ['navData'],
    data() {
      return {



      }
    },
    mounted(){

    },
    computed: mapState({


    }),
    methods: {


    },
    components: {
      
    }
  }

</script>


<style scoped>
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
/* #navbar .container>.navbar-collapse{
    top:100pximportant;
} */
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
    }
}

</style>

