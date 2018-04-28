<!--
 * @Author:      cyzeng
 * @DateTime:    2017-07-24 13:53:30
 * @Description: topbar以及内容区域
 -->

<template>

<div class="clearfix">
    <div class="ctit">
        <em>立即邀请</em>
    </div>
    <div class="quota clear">
        <div class="tit">您的邀请码</div>
        <div class="inivate" v-if="invite_code">{{invite_code}}</div>
        <div class="inivate" v-else>暂无邀请码</div>
        <div class="btnBox">
            <button class="btn btn-default ch_btn_blue">
                <img src="/agentStatic/img/wei.png" alt="">
                复制
            </button>
            <button class="btn btn-default ch_btn_blue">
                 <img src="/agentStatic/img/wei.png" alt="">
                微信
            </button>
            <button class="btn btn-default ch_btn_blue">
                 <img src="/agentStatic/img/QQ.png" alt="">
                QQ
            </button>
            <button class="btn btn-default ch_btn_blue">
                 <img src="/agentStatic/img/weibo.png" alt="">
                微博
            </button>
        </div>
        <div class="code_qs clearfix">
            <div class="codess">
                <img :src="codeUrl" alt="">
            </div>
            <div class="rules">
                <div>规则说明</div>
                <p>{{rule}}</p>
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

        //   邀请码
        invite_code: '',

        // 二维码
        codeUrl: '',

        rule: '',

      }
    },
    mounted(){

        this.invites();

    },
    computed: mapState({
        user: state => state.login.userInfo,

    }),
    methods: {

         // 邀请
        invites(){
            let params = {
                token: this.user.token
            };
            this.$ajaxGet('http://bitcoin.xxw360.com/invite', params)
                .then((res)=>{
                  if( res && res.code == 200){
                          this.codeUrl = res.data.qrcode;
                          this.rule = res.data.rule;
                          this.invite_code = res.data.invite_code;
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


<style scoped lang='less'>
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
    .tit{
        text-align: center;
    }
    .inivate{
        font-size: 30px;
        color: #3bb3e4;
        text-align: center;
        margin-top:20px;
    }

    .btnBox{
        text-align: center;
        margin-top:30px;
        
    }
    .btn{
        margin:0 15px;
        margin-bottom: 15px;
        width:78px;
        img{
            width:20px;
            height: 20px;
        }
    }

    .code_qs{
        padding-top:40px;
        width:408px;
        margin:0 auto;
        .codess{
            float: left;
            display: inline-block;
            width:150px;
            height: 150px;
            margin-right: 20px;
            border:1px solid #ddd;
            border-radius: 4px;
            padding:5px;
            img{
                width:100%;
                height: 100%;
            }
        }
        .rules{
            width: 230px;
            float: left;
            display: inline-block;
            div{
                text-align: center;
            }
        }
    }
}





// 大屏幕
@media only screen and (min-width: 1040px) {

}


/*移动端*/
@media only screen and (max-width: 1039px){
    .quota{
        .code_qs{
            width:100%;
            text-align: center;
            .codess{
                float: inherit;
                margin: auto;
            }
            .rules{
                width:100%;
                margin-top:20px;
                margin-bottom: 10px;
                p{
                    text-align: left;
                }
            }
        }
    }
    


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

.mintxt{
    width: 944px;
    padding: 10px;
    font-size: 14px;
    line-height: 24px;
    border:1px solid #eee;
}
.message{
    position: relative;
    margin-top:20px;
}
.minbut{
    background: #1aad19;
    font-size:16px;
    color:#fff;
    border-radius:5px;
    line-height: 46px;
    display: inline-block;
    padding: 0 50px;
    text-decoration: none;
    position: fixed;
    left: 50%;
}
</style>

