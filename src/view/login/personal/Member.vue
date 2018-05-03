<!--
 * @Author:      cyzeng
 * @DateTime:    2017-07-24 13:53:30
 * @Description: topbar以及内容区域
 -->

<template>

<div class="clearfix">
    <div class="ctit">
        <em>开通会员</em>
    </div>
    <div class="quota clear clearfix">
        <dl>
            <dt>购买周期</dt>
        </dl>
        <div class="clearfix">
            <div class="choose" v-for="item in list">
                <p class="choose-tit border-bottom-orange">{{item.title}}</p>
                <p class="choose-tit">￥{{item.price}}</p>
                <p class="notes">{{item.note}}</p>
            </div>
        </div>
        <div class="code_qs clearfix">
            <div class="codess">
                <img :src="userInfo.qrcode" alt="">
            </div>
            <div class="rules">
                {{userInfo.rule}}
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


          userInfo: {},

          list: [],
      }
    },
    mounted(){

        this.getInfo();

    },
    computed: mapState({
        user: state => state.login.userInfo,

    }),
    methods: {

        // 开通会员
        getInfo(){
            let params = {
                token: this.user.token
            };
            this.$ajaxGet('http://bitcoin.xxw360.com/joinMember', params)
                .then((res)=>{
                  if( res && res.code == 200){
                        this.list = res.data.goods;
                        this.userInfo = res.data;
                     
                  }else{
                    this.$message.error(res.msg);
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
.choose{
    
    height: 95px;
    border:1px solid #7B8A9D;
    border-radius: 4px;
    float: left;
    margin:10px;
    .choose-tit{
        height: 30px;
        line-height: 30px;
        margin: 0 10px;
        text-align: center;        
    }
    .choose-tit.border-bottom-orange{
        border-bottom:1px dotted #ffab77;
    }
    .notes{
        color:#ffab77;
        font-size: 16px;
        text-align: center;
    }
}

.code_qs{
        padding-top:40px;
        padding-left: 10px;
        width: 100%;
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
            overflow: hidden;
            display: inline-block;
        }
    }


/* // 大屏幕 */
@media only screen and (min-width: 1040px) {
    .choose{
        width:415px;
    }
}

/*移动端*/
@media only screen and (max-width: 1039px){
    .choose{
        width:100%;
    }
}
</style>

