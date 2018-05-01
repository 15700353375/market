<!--
 * @Author:      cyzeng
 * @DateTime:    2017年7月31日13:49:25
 * @Description: 员工管理-员工列表
 -->

<template>
    <div class="content clearfix">
        <NavVue></NavVue>
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
        

        


      }
    },
    mounted(){
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
    
    min-height: 600px;  
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






</style>
